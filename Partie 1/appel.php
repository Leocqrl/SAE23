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
                <select>
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

        </table>
    </form>
    <a href="consultation.html">Mode Consultation</a>
</body>
<?php 
    $idEnseignant = $_GET['id']; 
?>
</html>