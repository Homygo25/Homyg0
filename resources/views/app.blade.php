<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>X Phishing Awareness Tool</title>
    <meta name="description" content="Educational phishing awareness demonstration">
    <link rel="icon" type="image/svg+xml" href="/x-logo.svg" />
    
    <!-- Laravel CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <!-- Environment variables for React -->
    <script>
        window.APP_ENV = {
            VITE_ADMIN_USERNAME: '{{ env('VITE_ADMIN_USERNAME') }}',
            VITE_SUPABASE_URL: '{{ env('VITE_SUPABASE_URL') }}',
            VITE_SUPABASE_ANON_KEY: '{{ env('VITE_SUPABASE_ANON_KEY') }}',
            API_BASE_URL: '{{ url('/') }}/api'
        };
    </script>
    
    @vite(['resources/js/app-new.jsx'])
</head>
<body>
    <div id="root"></div>
</body>
</html>
