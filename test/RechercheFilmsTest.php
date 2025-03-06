<?php
//RechercheFilmsTest.php
use PHPUnit\Framework\TestCase;
 
require_once __DIR__ . '/../src/RechercheFilms.php';
 
class RechercheFilmsTest extends TestCase {
    private $pdo;
    private $rechercheFilms;
 
    protected function setUp(): void {
        // Création d'une base de données en mémoire pour les tests
        $this->pdo = new PDO('sqlite::memory:');
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 
        // Création d'une table fictive pour les tests
        $this->pdo->exec("CREATE TABLE films (id INTEGER PRIMARY KEY, titre TEXT, synopsis TEXT, image_url TEXT)");
        $this->pdo->exec("INSERT INTO films (titre, synopsis, image_url) VALUES ('Inception', 'Un film sur les rêves', 'inception.jpg')");
        $this->pdo->exec("INSERT INTO films (titre, synopsis, image_url) VALUES ('Interstellar', 'Voyage dans l\'espace', 'interstellar.jpg')");
 
        // Instanciation de la classe testée
        $this->rechercheFilms = new RechercheFilms($this->pdo);
    }
 
    public function testRechercheFilmTrouveResultat() {
        $resultats = $this->rechercheFilms->rechercherFilms('Inception');
        $this->assertCount(1, $resultats);
        $this->assertEquals('Inception', $resultats[0]['titre']);
    }
 
    public function testRechercheFilmAucunResultat() {
        $resultats = $this->rechercheFilms->rechercherFilms('Avatar');
        $this->assertCount(0, $resultats);
    }
 
    public function testRechercheFilmRequeteTropCourte() {
        $resultats = $this->rechercheFilms->rechercherFilms('In');
        $this->assertCount(0, $resultats);
    }
}