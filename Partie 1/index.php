<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Login</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
</head>
<body>
     <form method="POST">
        <fieldset>
            <legend>Login</legend>
            <label>Nom d'utilisateur</label>
            <input type='text' name='user'>
            <br>
            <label>Mot de passe</label>
            <input type='password' name='mdp'>
            <br>
            <input type='reset' value='Effacer'>
            <input type='submit' value='Connexion'>
</form>
</body>
</html>
<?php
if (isset($_POST["user"]) && isset($_POST["mdp"])) {
    $username=(string)$_POST["user"];
    $mdp=$_POST["mdp"];
    
    $bdd= new mysqli('localhost','root','','SAE23');
    $sql = "SELECT mot_de_passe FROM enseignant WHERE username = '$username'; ";
    $resultat=$bdd->query($sql);
    $resultat=$resultat->fetch_assoc();
    $mdp_sql=$resultat['mot_de_passe'];

    if ($mdp==$mdp_sql) {
        header('Location: appel.php');
        exit();
        
    }   
}
?> 