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
        </fieldset>
    </form>
</body>
<?php
if (!empty($_POST["user"]) && !empty($_POST["mdp"])) {
    $username=(string)$_POST["user"];
    $mdp=$_POST["mdp"];
    
    $bdd= new mysqli('localhost','root','','SAE23');
    $sql = "SELECT idEnseignant,mot_de_passe FROM enseignant WHERE username = '$username'; ";
    $resultat=$bdd->query($sql);
    $row=$resultat->fetch_assoc(); 
    if (($row !== false && $row !== null) && $mdp==$row['mot_de_passe']) {
        header('Location: appel.php?id='.$row['idEnseignant']);
        exit();
    }
    echo "<script>alert('Nom d\'utilisateur ou mot de passe incorrect.');</script>";
}
?> 

</html>