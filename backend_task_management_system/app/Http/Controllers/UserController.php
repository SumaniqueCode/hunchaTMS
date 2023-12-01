<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    // Data validator
    public function profileDisplay()
    {
        try {
            // Retrieve the authenticated user
            $user = Auth::user();

            if (!$user) {
                return response()->json(['status' => 401, 'message' => 'User not authenticated'], 401);
            }

            return response()->json(['status' => 200, 'user' => $user], 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 500, 'message' => $e->getMessage()], 500);
        }
    }
    public function dataValidator(array $userData)
    {
        return Validator::make($userData, [
            'firstName' => 'required|string|max:15',
            'lastName' => 'required|string|max:15',
            'gender' => 'required|string|max:15',
            'address' => 'required|string|max:50',
            'phone' => 'required|string|min:10|max:15|unique:users',
            'email' => 'required|email|min:10|max:50|unique:users',
            'password' => 'required|string|min:8|max:25'
        ]);
    }
    //check the login data
    public function loginValidator(Request $request)
    {
        $loginEmail = $request->input('email');
        $loginPassword = $request->input('password');
    
        // Find the user by email
        $user = User::where('email', $loginEmail)->first();
    
        if (!$user) {
            // No user found
            return response()->json([
                "status" => 404,
                "message" => "Invalid Email."
            ], 404);
        }
    
        // Check password
        if (!Hash::check($loginPassword, $user->password)) {
            return response()->json([
                "status" => 422,
                "message" => "Invalid Password."
            ], 422);
        }
    
        // Attempt to authenticate the user
        if (!Auth::attempt(['email' => $loginEmail, 'password' => $loginPassword])) {
            return response()->json([
                "status" => 401,
                "message" => "Unauthorized."
            ], 401);
        }
    
        // Authentication successful
        return response()->json([
            "status" => 200,
            "message" => "Logged in successfully."
        ], 200);
    }
    

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userData = $request->all();
        $validator = $this->dataValidator($userData);

        if ($validator->fails()) {
            return response()->json([
                "status" => 422,
                "errors" => $validator->messages()
            ], 422);
        } else {
            $users = new User();
            $users->firstName = $request->firstName;
            $users->lastName = $request->lastName;
            $users->gender = $request->gender;
            $users->address = $request->address;
            $users->phone = $request->phone;
            $users->email = $request->email;
            $users->password = Hash::make($request->password);
            $users->save();

            if ($users) {
                return response()->json([
                    "status" => 200,
                    "message" => "Submitted successfully."
                ], 200);
            } else {
                return response()->json([
                    "status" => 404,
                    "message" => "Failed to submit."
                ], 404);
            }
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $userData = $request->all();
        $validator = $this->dataValidator($userData);

        if ($validator->fails()) {
            return response()->json([
                "status" => 422,
                "errors" => $validator->messages()
            ], 422);
        } else {
            $users = User::find($id);
            $users->firstName = $request->firstName;
            $users->lastName = $request->lastName;
            $users->gender = $request->gender;
            $users->address = $request->address;
            $users->save();

            if ($users) {
                return response()->json([
                    "status" => 200,
                    "message" => "Updated successfully."
                ], 200);
            } else {
                return response()->json([
                    "status" => 404,
                    "message" => "Failed to update the data."
                ], 404);
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $users = User::orderBy('id', 'asc')->get();
        if($users->count()>0){
        $data = [
            "status" => 200,
            "users" => $users
        ];
        return response()->json([
            "status" => 200,
            "users" => $users
        ], 200);
        }
        else{
            $data = [
                "status" => 404,
                "message" => "No users found."
            ];
            return response()->json($data, 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $deleteUser = User::find($id)->first();
        if(!empty($deleteUser)){
            $deleteUser->delete();
            return response()->json(['success'=>true], 200);
            }else {
                return response()->json(['error'=>false,'message'=>'No user found'], 404);
                }
    }
}

