<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/addUsers', [UserController::class, 'store']);
Route::post('/loginuser', [UserController::class, 'loginValidator']);
Route::post('/updateUserData', [UserController::class, 'update']);
Route::post('/addProjects', [TaskController::class, 'store']);
Route::post('/updateProjects/{id}', [TaskController::class, 'update']);

Route::get('/getProfileData', [UserController::class, 'profileDisplay']);
Route::get('/getUserData', [UserController::class, 'show']);
Route::get('/getProjectData', [TaskController::class, 'show']);
Route::get('/getProjectDetails/{id}', [TaskController::class, 'projectDetails']);
Route::get('/deleteUser/{id}', [UserController::class, 'destroy']);
Route::get('/deleteProject/{id}', [TaskController::class, 'destroy']);