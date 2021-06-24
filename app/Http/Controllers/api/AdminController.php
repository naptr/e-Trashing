<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\JenisSampah;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Symfony\Component\HttpFoundation\Response;

class AdminController extends Controller
{

##### Admin Permission #####

    public function update(Request $request, $id){
        $this->validate($request, [
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'email' => 'nullable|email|max:50',
            'nohape' => 'required|string|max:15',
            'avatar' => 'nullable|image|mimes:png,jpg,jpeg',
            'location' => 'nullable|string',
        ]);

        $response = cloudinary()->upload($request->file('avatar')->getRealPath())->getSecurePath();
            // dd($response);

        $user = User::find($id);
        $user->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'nohape' => $request->nohape,
            'avatar' => $response,
            'location' => $request->location
        ]);

        try {
            $user->save();
            return response()->json([
                'status'        => 'success',
                'message'       => 'User Updated Successfully',
                'data'          => $user
                ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'status'        => 'failed',
                'message'       => 'Something went wrong',
                'data'          => $th
                ], Response::HTTP_BAD_REQUEST);
        }
    }

##### Update profile by admin #####

##### Registrasi Staff Area #####

    public function registerStaff(Request $request){
        // dd($request);
        $validator = Validator::make($request->all(), [
        'first_name' => 'required|string|max:30',
        'last_name' => 'required|string|max:30',
        // 'username' => 'required|string|max:20|unique:users',
        'email' => 'required|string|email|max:50|unique:users',
        'password' => 'required|string|min:6|confirmed',
        'role' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $role = $request->get('role');
        // $random = Str::random(6);
        $username = $request->get('first_name');

        $user = User::create([
            'first_name' => $request->get('first_name'),
            'last_name' => $request->get('last_name'),
            'username' => $request->get('role').".".strtolower($username),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
        ]);

        $user->assignRole($role);

        return response()->json(compact('user'), 201);
    }

##### End of Registrasi Area #####

##### Delete Account by Admin #####

    public function destroy(User $id){
        $id->delete();
        return response()->json([
            'status'        => 'success',
            'message'       => 'Account Deleted Succesfully',
            'data'          => $id
        ], Response::HTTP_NO_CONTENT);
    }

##### End of Delete area #####

##### Logout Function #####

public function logout( Request $request ) {

    $token = $request->header( 'Authorization' );
    // dd($token);

    try {
        JWTAuth::parseToken()->invalidate( $token );

        return response()->json( [
            'error'   => false,
            'message' => trans( 'auth.logged_out' )
        ] );
    } catch ( TokenExpiredException $exception ) {
        return response()->json( [
            'error'   => true,
            'message' => trans( 'auth.token.expired' )

        ], 401 );
    } catch ( TokenInvalidException $exception ) {
        return response()->json( [
            'error'   => true,
            'message' => trans( 'auth.token.invalid' )
        ], 401 );

    } catch ( JWTException $exception ) {
        return response()->json( [
            'error'   => true,
            'message' => trans( 'auth.token.missing' )
        ], 500 );
    }

    // return response()->json(['Sukses' => 'Anda berhasil logout'], 200);
}

public function getAllUser(){
    $user = User::all();
    // dd($user);

    return response()->json(compact('user'), 200);
}

##### Admin CRUD Jenis Sampah @KG #####

    public function getAllSampah(){
        $jenisSampah = JenisSampah::all();
        // dd($user);

        return response()->json(compact('jenisSampah'), 200);
    }

    public function getDetailSampah($id){
        $detailJenisSampah = JenisSampah::find($id);
        // $padd = Address::find($id, ['address', 'user_id']); //Not Used
        // $padd = DB::table('addresses')->where('user_id', $id)->get(['address', 'user_id']);
        // $pavt = DB::table('avatars')->where('user_id', $id)->get(['avatar', 'user_id']);

        return response()->json(compact('detailJenisSampah'), 200);
    }

    public function storeJenisSampah(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            '@KG' => 'required|integer'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $jenisSampah = JenisSampah::create([
            'name' => $request->get('name'),
            '@KG' => $request->get('@KG')
        ]);

        return response()->json(compact('jenisSampah'), 201);
    }

    public function updateJenisSampah(Request $request, $id){
        $this->validate($request, [
            'name' => 'required|string',
            '@KG' => 'required|integer'
        ]);

        $jenisSampah = JenisSampah::find($id);
        $jenisSampah->update([
            'name' => $request->get('name'),
            '@KG' => $request->get('@KG')
        ]);

        try {
            $jenisSampah->save();
            return response()->json([
                'status'        => 'success',
                'message'       => 'jenisSampah Updated Successfully',
                'data'          => $jenisSampah
                ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'status'        => 'failed',
                'message'       => 'Something went wrong',
                'data'          => $th
                ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function destroyJenisSampah(JenisSampah $id){
        $id->delete();
        return response()->json([
            'status'        => 'success',
            'message'       => 'Sampah Deleted Succesfully',
            'data'          => $id
        ], Response::HTTP_NO_CONTENT);
    }


##### End of Admin Delete Feature #####

}
