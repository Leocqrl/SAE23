<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Défi de Yoda</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="tri.css">
</head>
<body>

<h1>Le Défi de Maître Yoda</h1>

<?php
$mots = [
    "Sassai", "eaux-de-vie", "cessaient", "acerbite", "eaux", "sceau",
    "tiendra", "hasard", "acephale", "auxiliairement", "vesce",
    "eurafricaine", "hatai", "saignant", "entachassent", "alentie",
    "cesar", "vieillerie", "messeant", "taillable", "ives", "testace",
    "dracena", "ardentes", "ensablant", "blessas", "entachasses", "ioniens",
    "antarctique", "sessiles", "ineffacables", "quercitrine", "besace",
    "lessivasses", "acerbes", "descellaient", "entachas", "lessive", "gestation",
    "lessivates", "antecedentes", "enamourames", "antecedent", "entachat", "inefficace", "testacelles",
    "sarabandes", "entachant", "rieur", "iterames", "antecedences", "messages",
    "sesquioxydes", "testaces"
];

foreach ($mots as $mot) $graphe[$mot] = [];
foreach ($mots as $mot)
    foreach ($mots as $suivant)
        if ($mot !== $suivant && substr($mot, -3) === substr($suivant, 0, 3))
            $graphe[$mot][] = $suivant;

$meilleure = [];
foreach ($mots as $depart) {
    $chemin = [$depart];
    $visites = [$depart => true];
    $courant = $depart;
    while (true) {
        $prochain = null;
        foreach ($graphe[$courant] as $voisin)
            if (!isset($visites[$voisin])) {
                $prochain = $voisin;
                break;
            }
        if (!$prochain) break;
        $chemin[] = $prochain;
        $visites[$prochain] = true;
        $courant = $prochain;
    }
    if (count($chemin) > count($meilleure)) $meilleure = $chemin;
}
echo "<h2>Suite de mots:</h2>";
echo "<p>" . implode(" ➔ ", $meilleure) . "</p>";
echo "<p><strong>Maître Yoda</strong>, j’ai réussi à créer la plus longue suite de mots où chaque mot commence par les trois dernières lettres du précédent.</p>";
?>
</body>
</html>