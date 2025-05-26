<?php
// Partie 1 : Consultation
$bdd=new mysqli("localhost","root","","SAE23");
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
    echo "<form method='POST' action='update.php'>";
    $liste_etudiant=[];
    while ($row = $resultat->fetch_assoc()) {
        $liste_etudiant[]=[
            'nom' => $row['nom'],
            'prenom' => $row['prenom'],
            'idEtudiant' => $row['idEtudiant'],
            'date_Cours' => $row['date_Cours'],
            'horaire' => $row['horaire'],
            'Absence' => $row['Absence'],
            'idAbsences' => $row['idAbsences']
        ];
    }
    echo "<h3>".$liste_etudiant[0]['nom'].' '.$liste_etudiant[0]['prenom'].' N°'.$liste_etudiant[0]['idEtudiant']."</h3>";
    echo "<table>";
    echo "<tr><th>Date de Cours</th><th>Horaire</th><th>Absence</th></tr>";
    $N=0;
    foreach ($liste_etudiant as $row) {
        $N++;
        if ($row['Absence']==1){
            $abs = "<select name='absence_".$N."'><option value='1'>ABJ</option><option value='0'>Présent</option><option value='2'>ABI</option></select>";
        } 
        elseif ($row['Absence']==2){
            $abs = "<select name='absence_".$N."'><option value='2'>ABI</option><option value='0'>Présent</option><option value='1'>ABJ</option></select>";
        } 
        else {
            $abs = "<select name='absence_".$N."'><option value='0'>Présent</option><option value='1'>ABJ</option><option value='2'>ABI</option></select>";
        }
        echo "<tr>";
        echo "<input type='hidden' name='idAbsences_".$N."' value='".$row['idAbsences']."'>";
        echo "<td>" . $row['date_Cours'] . "</td>";
        echo "<td>" . $row['horaire'] . "</td>";
        echo "<td>" . $abs . "</td>";
        echo "</tr>";   
    }
    echo "<table>";
    echo "<input type='hidden' name='N' value='".$N."'>";
    echo "<input type='submit' value='Modifier'>";
    echo "</form>";

    
}

?>

