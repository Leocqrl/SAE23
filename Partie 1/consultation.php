<?php
// Partie 1 : Consultation
$bdd=new mysqli("localhost","root","root","SAE23");
$resultat = null;

if (((!empty($_POST['nom']) && !empty($_POST['prenom'])) || !empty($_POST['id'])) && (!empty($_POST['debut']) && !empty($_POST['fin']))) {
    if (!empty($_POST['nom']) && !empty($_POST['prenom'])) {
        $nom = $_POST['nom'];
        $prenom = $_POST['prenom'];
    } else {
        $id = $_POST['id'];
    }
    $debut = $_POST['debut'];
    $fin = $_POST['fin'];

    $conditions = [];
    if (!empty($nom)) {
        $conditions[] = "E.nom LIKE '$nom'";
        echo "<p>Nom : $nom</p>";
    }
    if (!empty($prenom)) {
        $conditions[] = "E.prenom LIKE '$prenom'";
    }
    if (!empty($id)) {
        $conditions[] = "E.idEtudiant='$id'";
    }
    $conditions[] = "A.date_Cours >= '$debut' AND A.date_Cours <='$fin'";

    // Joindre les conditions avec 'AND'
    if (!empty($conditions)){
        $fin_requete = implode(' AND ', $conditions);
        $sql="SELECT * FROM Etudiant E INNER JOIN Absences A ON E.idEtudiant=A.idEtudiant WHERE $fin_requete";
    }
    if (!empty($fin_requete)){
        $resultat = $bdd->query($sql);
    }
} else {
    echo "<p>Veuillez remplir au moins un champ de recherche.</p>";
}

if (!empty($resultat)) {
    echo "<table>";
    echo "<tr><th>Nom</th><th>Prénom</th><th>ID</th><th>Date de Cours</th><th>Absence</th></tr>";
    while ($row = $resultat->fetch_assoc()) {
        if ($row['Absence']==1){
            $abs = "ABJ";
        } 
        elseif ($row['Absence']==2){
            $abs = "ABI";
        } 
        else {
            $abs = "/";
        }
        echo "<tr>";
        echo "<td>" . $row['nom'] . "</td>";
        echo "<td>" . $row['prenom'] . "</td>";
        echo "<td>" . $row['idEtudiant'] . "</td>";
        echo "<td>" . $row['date_Cours'] . "</td>";
        echo "<td>" . $abs . "</td>";
        echo "</tr>";
    }
}
?>

