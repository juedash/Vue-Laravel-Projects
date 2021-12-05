<?php

namespace App\Http\Controllers;

use http\Message;
use Illuminate\Http\Request;
use App\Models\Activity;
use Illuminate\Support\Facades\Auth;


class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Activity::orderBy('created_at', 'DESC')
            ->where('user_id', Auth::id())->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     *
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => [ 'required',  'string']
        ]);

        $newActivity = Activity::create([
            'name' => $request['name'],
            'description' => $request['description'],
            'user_id' => Auth::id(),
        ]);
        $newActivity->save();
        return $newActivity;
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, $id)
    {
        $existingActivity = Activity::find($id);
        if ($existingActivity->user_id != Auth::id()) {
            return response()->json([
                'message' => "You don't have permission",
            ], 401);
        }

        if ($existingActivity) {
            $existingActivity->completed = $request['completed'] ? true : false;
            $existingActivity->save();
            return $existingActivity;
        }

        return "Activity not found";
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $existingActivity = Activity::find($id);
        if ($existingActivity->user_id != Auth::id()) {
            return response()->json([
                'message' => "You don't have permission",
            ], 401);
        }

        if ($existingActivity) {
            $existingActivity->delete();
            return response()->json([
                'message' => "Activity successfully deleted."
            ]);
        }
        return response()->json([
            'message' => "Activity not found"
        ], 404);
    }
}
