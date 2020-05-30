<?php

namespace App\Http\Controllers;

use App\Demand;
use Illuminate\Http\Request;

class DemandsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Demand::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name'    => 'required|min:3',
            'last_name'     => 'required|min:3',
            'email'         => 'required|email',
            'city'          => 'required|min:3'
        ]);

        $demand = Demand::create($validated);

        return response($demand, 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'first_name'    => 'required|min:3',
            'last_name'     => 'required|min:3',
            'email'         => 'required|email',
            'city'          => 'required|min:3'
        ]);

        $demand = Demand::findOrFail($id);

        $demand->update($validated);

        return response($demand, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $demand = Demand::findOrFail($id);

        $demand->delete();

        return response('Delete completed.', 201);
    }
}
