<?php
/**$_POST;
if ($_POST['name']=== ""){
    echo"Vous avez oublier votre nom d'utilisateur";
}else if ($_POST['email']=== ""){
    echo"Vous avez oublier votre email";
}else if ($_POST['password']=== ""){
    echo"Mot de passe invalide";
}else{
    echo "Inscription validé";
}**/
try {
    $databaseConnexion = new PDO(dsn: "mysql:dbname=form-validation", username:'root', password:'');
}catch(PDOException $exception){
    die("Erreur: {$exception->getMessage()}");
}