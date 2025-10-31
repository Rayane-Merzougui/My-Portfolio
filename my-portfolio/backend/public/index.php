<?php
// Point d'entrée unique - index.php
require_once __DIR__ . '/../config/config.php';

// Debug
error_log("=== NEW REQUEST ===");
error_log("Request Method: " . $_SERVER['REQUEST_METHOD']);
error_log("Request URI: " . $_SERVER['REQUEST_URI']);

// Récupération du chemin demandé
$request_uri = $_SERVER['REQUEST_URI'];
$script_name = $_SERVER['SCRIPT_NAME'];

// Extraction du chemin après le dossier public
$base_path = dirname($script_name);
if ($base_path === '/') {
    $base_path = '';
}

$request_path = substr($request_uri, strlen($base_path));
$path = parse_url($request_path, PHP_URL_PATH);
$path = trim($path, '/');

error_log("Base path: " . $base_path);
error_log("Request path: " . $request_path);
error_log("Clean path: " . $path);

// Router les requêtes API
if (strpos($path, 'api/') === 0) {
    $api_endpoint = substr($path, 4); // Enlève "api/"
    
    error_log("API Endpoint: " . $api_endpoint);
    
    // Mapping des routes vers les fichiers correspondants
    $routes = [
        'articles' => 'articles.php',
        'login' => 'login.php',
        'logout' => 'logout.php',
        'me' => 'me.php',
        'register' => 'register.php',
        'upload_avatar' => 'upload_avatar.php',
    ];
    
    // Vérifier si la route existe
    if (isset($routes[$api_endpoint])) {
        $api_file = __DIR__ . '/api/' . $routes[$api_endpoint];
        error_log("Including API file: " . $api_file);
        
        if (file_exists($api_file)) {
            require_once $api_file;
        } else {
            error_log("API file not found: " . $api_file);
            json(['error' => 'API file not found'], 500);
        }
    } else {
        // Route non trouvée
        error_log("Endpoint not found: " . $api_endpoint);
        json(['error' => 'Endpoint not found'], 404);
    }
} else {
    // Pour les autres requêtes
    if ($path === '' || $path === 'test.php') {
        // Servir le fichier test.php ou la racine
        if ($path === 'test.php') {
            require_once __DIR__ . '/test.php';
        } else {
            json([
                'message' => 'Backend API is running',
                'timestamp' => time(),
                'endpoints' => [
                    '/api/articles - GET/POST',
                    '/api/login - POST',
                    '/api/logout - POST', 
                    '/api/me - GET',
                    '/api/register - POST',
                    '/api/upload_avatar - POST'
                ]
            ]);
        }
    } else {
        // Fichier non trouvé
        json(['error' => 'Not found'], 404);
    }
}