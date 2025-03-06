<?php
//filmprojet/tests/RecommandationsTest.php
 
use PHPUnit\Framework\TestCase;
 
class RecommandationsTest extends TestCase
{
    public function testRecuperationFilmsRecommandes()
    {
        // Création d'un mock pour simuler une réponse API
        $mockApiResponse = [
            ["titre" => "Film 1", "image_url" => "image1.jpg"],
            ["titre" => "Film 2", "image_url" => "image2.jpg"]
        ];
 
        // Simule une requête HTTP avec json_encode comme si on recevait une réponse d'API
        $mockResponse = json_encode($mockApiResponse);
 
        // Simulation de l'appel API avec file_get_contents
        file_put_contents("mock_api_response.json", $mockResponse);
 
        // Appel du script à tester
        $_SERVER['REQUEST_URI'] = '/api/films/popular';
        ob_start();
        include __DIR__ . '/../src/recommandations.php';
        $output = ob_get_clean();
 
        // Vérification que la sortie contient les films attendus
        $this->assertJsonStringEqualsJsonString($mockResponse, $output);
 
        // Nettoyage du fichier mock
        unlink("mock_api_response.json");
    }
 
    public function testErreurLorsDeRecuperationFilms()
    {
        // On simule une requête incorrecte
        $_SERVER['REQUEST_URI'] = '/api/films/popular';
        ob_start();
        include __DIR__ . '/../src/recommandations.php';
        $output = ob_get_clean();
 
        // Vérification que la réponse contient une erreur
        $this->assertStringContainsString('Erreur lors de la récupération des films', $output);
    }
}
 