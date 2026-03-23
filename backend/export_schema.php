<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$schema = [];
$tables = DB::select('SHOW TABLES');
foreach($tables as $table) {
    $tableName = current((array)$table);
    $columns = DB::select("SHOW COLUMNS FROM $tableName");
    $schema[$tableName] = $columns;
}
echo json_encode($schema, JSON_PRETTY_PRINT);
