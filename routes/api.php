<?php

use App\Http\Controllers\BookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::controller(BookController::class)->prefix('books')->group(function(){
    Route::get('/', 'getBooks');
    Route::post('/create', 'createBook');
    Route::post('/update/{bookId}', 'updateBook');
    Route::delete('/delete/{bookId}', 'deleteBook');
});
