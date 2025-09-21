<?php
declare(strict_types=1);

session_start();

$allowedOrigin = 'http://localhost:5173'; 
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . $allowedOrigin);
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	http_response_code(204);
	exit;
}

function db(): PDO {
	static $pdo = null;
	if ($pdo) return $pdo;

	$host = '127.0.0.1';
	$db   = 'portfolio_db';
	$user = 'portfolio_user';
	$pass = 'portfolio_pass';
	$dsn  = "mysql:host=$host;dbname=$db;charset=utf8mb4";
	$pdo = new PDO($dsn, $user, $pass, [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
	]);
	return $pdo;
}

function json($data, int $code = 200): void {
	http_response_code($code);
	echo json_encode($data, JSON_UNESCAPED_UNICODE);
	exit;
}

function require_json_post(): array {
	$input = file_get_contents('php://input');
	$data = json_decode($input, true);
	if (!is_array($data)) json(['error' => 'Invalid JSON'], 400);
	return $data;
}

function current_user(): ?array {
	return $_SESSION['user'] ?? null;
}

function require_auth(): array {
	$user = current_user();
	if (!$user) json(['error' => 'Unauthorized'], 401);
	return $user;
}