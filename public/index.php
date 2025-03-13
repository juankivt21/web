<?php
// Archivo index.php para compatibilidad con Hostinger
// Este archivo redirige todas las solicitudes al sistema de enrutamiento de Next.js

// Obtener la ruta solicitada
$request_uri = $_SERVER['REQUEST_URI'];

// Si la solicitud es para un archivo estático existente, servirlo directamente
if (preg_match('/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|mp4|webm|ogg|mp3|wav|pdf|webp)$/', $request_uri)) {
    return false; // Deja que el servidor maneje los archivos estáticos
}

// Si es una solicitud a la API, redirigir al archivo correspondiente
if (strpos($request_uri, '/api/') === 0) {
    $api_file = __DIR__ . $request_uri . '.json';
    if (file_exists($api_file)) {
        header('Content-Type: application/json');
        echo file_get_contents($api_file);
        exit;
    }
}

// Para todas las demás rutas, servir el HTML correspondiente o index.html
$html_file = __DIR__ . $request_uri;
if (substr($html_file, -1) === '/') {
    $html_file .= 'index.html';
} elseif (!preg_match('/\.html$/', $html_file)) {
    $html_file .= '.html';
}

if (file_exists($html_file)) {
    echo file_get_contents($html_file);
} else {
    // Si no existe el archivo, servir el index.html (para rutas dinámicas de Next.js)
    echo file_get_contents(__DIR__ . '/index.html');
}
?>

