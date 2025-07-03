<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReactController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// API routes for the React application
Route::prefix('api')->group(function () {
    Route::post('/capture-data', [ReactController::class, 'captureData']);
    Route::get('/admin/data', [ReactController::class, 'adminData']);
});

// Serve React app for all other routes (SPA routing)
Route::get('/{any}', [ReactController::class, 'catchAll'])->where('any', '.*');
