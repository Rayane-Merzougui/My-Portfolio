<?php
header("Access-Control-Allow-Origin: http://localhost:5174");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

// Si c’est une requête préflight (OPTIONS), on stoppe ici
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// === CONFIG ===
require_once __DIR__ . '/../config/config.php';

// === ROUTER ===
$requestUri = $_SERVER['REQUEST_URI'];
$scriptName = dirname($_SERVER['SCRIPT_NAME']);
$path = str_replace($scriptName, '', $requestUri);
$path = parse_url($path, PHP_URL_PATH);
$path = trim($path, '/');

switch ($path) {
    case '':
        echo json_encode(['message' => 'Bienvenue sur mon API']);
        break;
    case 'api/login':
        require __DIR__ . '/api/login.php';
        break;
    case 'api/logout':
        require __DIR__ . '/api/logout.php';
        break;
    case 'api/register':
        require __DIR__ . '/api/register.php';
        break;
    case 'api/articles':
        require __DIR__ . '/api/articles.php';
        break;
    case 'api/me':
        require __DIR__ . '/api/me.php';
        break;
    case 'api/upload_avatar':
        require __DIR__ . '/api/upload_avatar.php';
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Route non trouvée']);
        break;
}
