<?php
//filmprojet/src/recommandations.php
header('Content-Type: application/json');
 
try {
    // Simulation d'un appel API externe en lisant un fichier JSON mocké
    if (file_exists("mock_api_response.json")) {
        $response = file_get_contents("mock_api_response.json");
    } else {
        throw new Exception("Erreur lors de la récupération des films");
    }
 
    echo $response;
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
 