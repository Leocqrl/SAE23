<?php
// Partie 1 : Consultation
echo "<link rel='stylesheet' href='style.css'>";
$bdd=new mysqli("localhost","root","","SAE23");
$resultat = null;

if  (!empty($_POST['debut']) && !empty($_POST['fin'])) {
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
        $sql="SELECT * FROM Etudiant E INNER JOIN Absences A ON E.idEtudiant=A.idEtudiant WHERE $fin_requete ORDER BY E.idEtudiant, A.date_Cours, A.horaire;";
    }
    if (!empty($fin_requete)){
        $resultat = $bdd->query($sql);
    }
} else {
    echo "<script>alert('Veuillez remplir au moins un champ de recherche.')</script>";
    echo "<button> <a href='consultation.html'>Retour</a></button>";
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
    echo "<table>";
    echo "<tr><th>Date de Cours</th><th>Horaire</th><th>Absence</th></tr>";
    $N=0;
    $nom = '';
    $prenom = '';
    $id = '';
    foreach ($liste_etudiant as $row) {
        $N++;
        if ($row['Absence']==1){
            $abs = "<select class='table-select' name='absence_".$N."'><option value='1'>ABJ</option><option value='0'>Présent</option><option value='2'>ABI</option></select>";
        } 
        elseif ($row['Absence']==2){
            $abs = "<select class='table-select' name='absence_".$N."'><option value='2'>ABI</option><option value='0'>Présent</option><option value='1'>ABJ</option></select>";
        } 
        else {
            $abs = "<select class='table-select' name='absence_".$N."'><option value='0'>Présent</option><option value='1'>ABJ</option><option value='2'>ABI</option></select>";
        }
        if ($row['nom']!=$nom || $row['prenom']!=$prenom || $row['idEtudiant']!=$id) {
            echo "<tr><td colspan='3'><b>".$row['nom'].' '.$row['prenom'].' N°'.$row['idEtudiant']."</b></td></tr>";
            $nom = $row['nom'];
            $prenom = $row['prenom'];
            $id = $row['idEtudiant'];
        }
        echo "<tr>";
        echo "<input type='hidden' name='idAbsences_".$N."' value='".$row['idAbsences']."'>";
        echo "<td>" . $row['date_Cours'] . "</td>";
        echo "<td>" . $row['horaire'] . "</td>";
        echo "<td class='select-cell'>" . $abs . "</td>";
        echo "</tr>";   
    }
    echo "<table>";
    echo "<input type='hidden' name='N' value='".$N."'>";
    echo "<input type='submit' value='Modifier'>";
    echo "</form>";
}

?>

