<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
class AuthController extends Controller
{
    public function registration(Request $request)
    {
    	$validator=Validator::make($request->all(),[
    			'name'=>'required',
    			'surname'=>'required',
    			'doc_number'=>'required|numeric|digits:11',
    			'phone'=>'required|unique:users',
    			'password'=>'required|min:6|max:11',
    	]);

    	if($validator->fails())
    	{
    		return response()->json([
    			'error'=>[
    				'code'=>422,
    				'message'=>'Validator error',
    				'errors'=>$validator->errors(),
    			]
    		]);
    	}
    	User::create($request->all())->save();
    	return response()->json()->setStatusCode(204);
    }
    public function login(Request $request)
    {
    	$validator=Validator::make($request->all(),[
    			'phone'=>'required',
    			'password'=>'required|min:6|max:11',
    	]);
    	if($validator->fails())
    	{
    		return response()->json([
    			'error'=>[
    				'code'=>422,
    				'message'=>'Validator error',
    				'errors'=>$validator->errors(),
    			]
    		]);
    	}
    	if($user=User::where('phone',$request->phone)->first())
		{
			if($request->password==$user->password)
			{
				$user->api_token=Str::random();
				$user->save();
				return response()->json([
					'data'=>[
						'api_token'=>$user->api_token,
					]
				]);
			}
		}
		return response()->json([
			'error'=>[
				'code'=>401,
				'message'=>'Unauthorizied',
				'errors'=>[
					'phone'=>[
						'phone or password are incorrect',
					]
				],
			]
		],401);
	}    
}
