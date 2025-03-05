<?php
$apiKey = 'abab33fe124bed5ea997bfb0f452e3d2';
$baseUrl = 'https://api.themoviedb.org/3/';
$host = 'localhost'; // Le nom de l'hôte (localhost)
$dbname = 'nom_de_ta_base_de_données'; // Le nom de ta base de données
$username = 'root'; // Ton nom d'utilisateur MySQL
$password = 'root'; // Ton mot de passe MySQL

// Connexion à la base de données MySQL
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection échouée : " . $e->getMessage());
}

function getMovieData($movieId) {
    global $apiKey, $baseUrl;

    $url = $baseUrl . "movie/$movieId?api_key=$apiKey&language=fr-FR";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}

$movieId = 550;
$movieData = getMovieData($movieId);

if ($movieData) {
    // Préparer la requête SQL pour insérer les données dans la base
    $sql = "INSERT INTO films (id, title, overview, vote_average) 
            VALUES (:id, :title, :overview, :vote_average)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $movieData['id']);
    $stmt->bindParam(':title', $movieData['title']);
    $stmt->bindParam(':overview', $movieData['overview']);
    $stmt->bindParam(':vote_average', $movieData['vote_average']);
    
    $stmt->execute();
    
    echo "Données du film insérées dans la base de données.";
} else {
    echo "Erreur lors de la récupération des données.";
}
?>