<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    $bdd=new mysqli("localhost","root","","SAE23");
    $sql = [];
    for ($i=1; $i <= $_POST['N']; $i++) {
        $sql[] = ["UPDATE Absences SET Absence = '".$_POST["absence_".$i]."' WHERE idAbsences = '".$_POST['idAbsences_'.$i]."';"];
    }
    foreach($sql as $requete) {
        $bdd->query($requete[0]);
        }
    header('Location: consultation.html');
}

?>