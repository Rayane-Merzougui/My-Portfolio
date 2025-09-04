<?php
try {
    $databaseConnexion = new PDO(dsn: "mysql:dbname=form-validation", username:'root', password:'');
}catch(PDOException $exception){
    die("Erreur: {$exception->getMessage()}");
}
$emails = $databaseConnexion->query("SELECT email FROM utilisateurs")->fetchAll(PDO :: FETCH_ASSOC);
var_dump($emails);
$allEmails= [];
foreach($emails as $email){
    $allEmails[]=$email["email"];
}
$_POST;
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$errors=[];
if ($name=== ""){
    echo"Vous avez oublier votre nom d'utilisateur";
}else if ($email=== ""){
    echo"Vous avez oublier votre email";
}else if ($password=== ""){
    echo"Mot de passe invalide";
}else{
    echo "Inscription validé";
}
if (mb_strlen($name)<4 || mb_strlen($name)>32 ) {
    $errors['name'] = "Le nom doit comporter entre 4 et 32 caractères";
}
if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
    $errors['email']="L'email n'est pas valide";
}
if(in_array($email, $allEmails)){
    $errors['email']="Cette email existe déjà";
}
if(empty($errors)){
    $q = $databaseConnexion->prepare("INSERT INTO utilisateurs (Nom, Email, Password) VALUE(:nom, :email, :password)");
    $q->execute([
        'name'=> $name,
        'email'=> $email,
        'password'=> password_hash($password, PASSWORD_BCRYPT)
    ]);
}
header("location:index.html?n=$name&e=$email&p=$password");
die;