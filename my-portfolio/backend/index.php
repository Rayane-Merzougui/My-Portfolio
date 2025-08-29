<?php
try {
    $databaseConnexion = new PDO(dsn: "mysql:dbname=form-validation", username:'root', password:'');
}catch(PDOException $exception){
    die("Erreur: {$exception->getMessage()}");
}
$emails = $databaseConnexion->query("SELECT email FROM user")->fetchAll(PD0 :: FETCH_ASSOC);
$allEmails= [];
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