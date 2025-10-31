<?php
require_once __DIR__ . '/../config/config.php';

// Détruire l'ancienne session
session_destroy();

// Démarrer une nouvelle session
session_start();

// Simuler une connexion utilisateur pour tester
$_SESSION['user'] = [
    'id' => 1,
    'email' => 'test@test.com',
    'name' => 'Test User',
    'avatar_url' => null
];

echo json_encode([
    'message' => 'Session régénérée',
    'session_id' => session_id(),
    'user' => $_SESSION['user']
]);