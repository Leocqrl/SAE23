<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Feuille d'Appel</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <form method="POST">
        <table>
            <tr><td colspan='5'>
                <select name='module'>
                    <option value="choix">choisissez votre module</option>
                    <optgroup label="Modules">
                    <option value="R209">R209</option>
                    <option value="SAE23">SAE23</option>
                </select>
            </td></tr>
            <tr><th>Groupe</th><th>N°</th><th>Nom Prénom</th><th>Présent</th><th>ABJ</th><th>ABI</th></tr>
            <?php
                $bdd= new mysqli('localhost','root',"",'SAE23');
                $sql="SELECT groupe,idEtudiant,nom,prenom FROM Etudiant;";
                $resultat=$bdd->query($sql);
                $N=0;
                $liste_etudiant = [];
                if (!empty($resultat)) {
                    while ($row = $resultat->fetch_assoc()) {
                        $N++;
                        $nomprenom = $row['nom']. ' '. $row['prenom'];
                        echo '<tr>';
                        echo '<td>'. $row['groupe'] .'</td>';
                        echo '<td>'. $row['idEtudiant'] .'</td>';
                        echo '<td>'. $nomprenom .'</td>';
                        echo "<td> <input type='radio' name='absence_".$N."' value='0'></td>";
                        echo "<td> <input type='radio' name='absence_".$N."' value='1'></td>";
                        echo "<td> <input type='radio' name='absence_".$N."'  value='2'></td>";
                        echo '</tr>';
                    }
                }
            ?>
            <tr><td colspan='5'><input type='submit' value="Valider l'appel."></td></tr>
        </table>
    </form>
    <a href="consultation.html">Mode Consultation</a>
</body>
<?php 
$idEnseignant = $_GET['id']; 
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    $sql = [];
    $liste_horaire = ['08:30:00', '10:00:00', '11:30:00', '13:00:00', '14:30:00', '16:00:00', '17:30:00'];
    date_default_timezone_set('Europe/Brussels');
    $heure = date('H:i:s');
    
    function horaire_valide($heure, $liste_horaire) {
        $heure_actuelle = strtotime($heure);
        $heure_proche = null;
        $min_dif=PHP_INT_MAX; // Initialiser une grande différence
        foreach ($liste_horaire as $h) {
            $h = strtotime($h);
            $difference = $heure_actuelle - $h;

            if ($difference < $min_dif) {
                $min_dif = $difference;
                $heure_proche = $h;
            }
        }
    
        if ($heure_proche !== null) {
            return date('H:i', $heure_proche);
        }
        return $heure_proche;
    }
    $heure=horaire_valide($heure, $liste_horaire);
    echo "<p>Heure détectée : $heure</p>";

    $resultat = $bdd->query("SELECT idEtudiant FROM Etudiant;");
    $liste_etudiant = [];
    while ($row = $resultat->fetch_assoc()) {
        $liste_etudiant[] = $row['idEtudiant'];
    }
    $N = count($liste_etudiant);

    if (isset($_POST['module']) && $_POST['module']!='choix') {
        for ($i=1; $i <= $N; $i++) {
            if (isset($_POST['absence_'.$i])) { 
                $sql[]="INSERT INTO Absences (idEnseignant, Module, date_Cours, horaire, idEtudiant, Absence) VALUES ('$idEnseignant', '{$_POST['module']}', '".date('Y-m-d')."', '$heure', '{$liste_etudiant[$i-1]}', '{$_POST['absence_'.$i]}')";
            } else {
            echo "<p>Veuillez sélectionner un module et une absence pour chaque étudiant.</p>";
            }
        }
        foreach ($sql as $query) {
            if (!$bdd->query($query)) {
                echo "<p>Erreur lors de l'insertion des données : " . $bdd->error . "</p>";
            }
        }
        echo "<p>Appel enregistré avec succès.</p>";
    }
}
    
?>
</html>