<?php
// Autoriser l'accès depuis ton frontend React
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

// Connexion à MySQL avec PDO
try {
    $databaseConnexion = new PDO("mysql:host=localhost;dbname=form-validation;charset=utf8", "root", "");
    $databaseConnexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Connexion échouée: " . $e->getMessage()]);
    exit;
}

// Récupérer les données envoyées par React
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Tableau pour stocker les erreurs
$errors = [];

// Vérification si les champs existent
if (!$data || empty($data['name']) || empty($data['email']) || empty($data['password'])) {
    $errors[] = "Veuillez remplir tous les champs";
} else {
    $name = htmlspecialchars($data['name']);
    $email = htmlspecialchars($data['email']);
    $password = $data['password'];

    // Vérifier si l'email existe déjà
    $stmt = $databaseConnexion->prepare("SELECT COUNT(*) FROM utilisateurs WHERE Email = ?");
    $stmt->execute([$email]);
    $emailExists = $stmt->fetchColumn();

    if ($emailExists > 0) {
        $errors[] = "Cet email existe déjà";
    }
}

// Si pas d'erreurs, insérer le nouvel utilisateur
if (empty($errors)) {
    $q = $databaseConnexion->prepare("INSERT INTO utilisateurs (Nom, Email, Password) VALUES (:nom, :email, :password)");
    $q->execute([
        'nom'      => $name,
        'email'    => $email,
        'password' => password_hash($password, PASSWORD_BCRYPT) // hash sécurisé
    ]);

    echo json_encode([
        "status"  => "success",
        "message" => "Utilisateur inscrit avec succès",
        "user"    => $name
    ]);
} else {
    echo json_encode([
        "status"  => "error",
        "message" => $errors
    ]);
}
