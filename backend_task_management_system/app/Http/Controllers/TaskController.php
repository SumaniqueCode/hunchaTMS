<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    // Data Validator
    public function dataValidator(array $projectData)
    {
        return Validator::make($projectData, [
            'projectName' => 'required|string|min:5|max:20',
            'projectDesc' => 'required|string|min:10|max:300',
            'members' => 'required|string|min:5|max:300',

        ]);
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
        $projectData = $request->all();
        $validator = $this->dataValidator($projectData);

        if ($validator->fails()) {
            return response()->json([
                "status" => 422,
                "errors" => $validator->messages()
            ], 422);
        } else {
            $tasks = new Task();
            $tasks->projectName = $request->projectName;
            $tasks->projectDesc = $request->projectDesc;
            $tasks->projectStatus = $request->projectStatus;
            $tasks->projectDeadline = $request->projectDeadline;
            $tasks->members = $request->members;

            $tasks->save();

            if ($tasks) {
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
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $tasks = Task::latest()->get();
    
        if ($tasks->count() > 0) {
            return response()->json([
                "status" => 200,
                "tasks" => $tasks
            ], 200);
        } else {
            return response()->json([
                "status" => 204,
                "message" => "No tasks found."
            ], 204);
        }
    }

    public function projectDetails(Task $task, $id)
    {
        $tasks = Task::find($id);
    
        if ($tasks->count() > 0) {
            return response()->json([
                "status" => 200,
                "tasks" => $tasks
            ], 200);
        } else {
            return response()->json([
                "status" => 204,
                "message" => "No tasks found."
            ], 204);
        }
    }
    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $projectData = $request->all();
        $validator = $this->dataValidator($projectData);

        if ($validator->fails()) {
            return response()->json([
                "status" => 422,
                "errors" => $validator->messages()
            ], 422);
        } else {
            $tasks = Task::find($id);
            $tasks->projectName = $request->projectName;
            $tasks->projectDesc = $request->projectDesc;
            $tasks->members = $request->members;
            $tasks->projectStatus = $request->projectStatus;
            $tasks->save();

            if ($tasks) {
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
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $deleteProject = Task::find($id);
        if(!empty($deleteProject)){
            $deleteProject->delete();
            return response()->json(['success'=>true], 200);
            }else {
                return response()->json(['error'=>false,'message'=>'No Project found'], 404);
                }
    }
}
