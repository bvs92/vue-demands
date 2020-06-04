<?php

namespace App\Http\Controllers;

use App\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    


    public function login(Request $request)
    {
        // return response('stop');
        // 
        
        
        // return response()->json('aiciii');

        // $res = Http::get('https://www.google.ro');
        // return $res->status();

        // $response = Http::withHeaders(['Content-Type' => 'multipart/form-data'])->withOptions(['debug' => true])
        // ->timeout(20)->post("http://127.0.0.1:8000/oauth/token", [
        //          'form_params' => [
        //                 'grant_type'    => 'password',
        //                 'client_id'     => '2',
        //                 'client_secret' => 'VbdxjL53LFqiZoBvKHWizXfAPZSu5q7qcvH4ay1x',
        //                 'username'      => 'second@test.ro',
        //                 'password'      => 'password'
        //          ]
        //         ]);

                // return $response->status();
                // $response = Http::withOptions(['verify' => false, 'debug' => true])->post('http://demands-app.test:8000/oauth/token',[
                //     'grant_type'    => 'password',
                //     'client_id'     => '2',
                //     'client_secret' => 'VbdxjL53LFqiZoBvKHWizXfAPZSu5q7qcvH4ay1x',
                //     'username'      => 'second@test.ro',
                //         'password'      => 'password'
                // ]);

        //                 dd($response);

        // $response->throw();

        

        // return $response->getBody()->getContents();
        
        $http = new \GuzzleHttp\Client();
        
        try {
            $response = $http->post('http://demands-app.test:8000/oauth/token', [
                'grant_type'    => 'password',
                'client_id'     => '2',
                'client_secret' => 'VbdxjL53LFqiZoBvKHWizXfAPZSu5q7qcvH4ay1x',
                'username'      => 'second@test.ro',
                'password'      => 'password'
            ]);

            return $response->getBody();

        }
        catch(\GuzzleHttp\Exception\BadResponseException $e){
            if($e->getCode() === 400){
                return response()->json("Invalid request. Enter a username and a password", $e->getCode());
            }
            else if($e->getCode() === 401){
                return response()->json("Your credentials are incorrect.", $e->getCode());
            } else if($e->getCode() === 500){
                return response()->json("Something is wrong.", $e->getCode());
            }

            return response()->json("Something went wrong. Sorry.", $e->getCode());
        }
    }






    public function register(Request $request)
    {
        $request->validate([
            'name'  => 'required|min:3',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:5|max:190'
        ]);

        return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
    }


    public function logout(Request $request)
    {   
        auth()->user()->tokens()->delete();

        return response()->json('Logout successfully.', 200);
    }
}
