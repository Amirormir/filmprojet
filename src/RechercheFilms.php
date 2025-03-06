<?php
//RechercheFilms.php
class RechercheFilms {
    private $pdo;
 
    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }
 
    public function rechercherFilms(string $query): array {
        if (strlen($query) < 3) {
            return []; // Trop court pour rechercher
        }
 
        $sql = "SELECT id, titre, synopsis, image_url FROM films WHERE titre LIKE :query";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['query' => "%$query%"]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}