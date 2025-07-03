<?php

return [
    'default' => env('SESSION_DRIVER', 'file'),
    
    'drivers' => [
        'file' => [
            'driver' => 'file',
            'path' => storage_path('framework/sessions'),
        ],
        'cookie' => [
            'driver' => 'cookie',
            'lifetime' => env('SESSION_LIFETIME', 120),
        ],
        'database' => [
            'driver' => 'database',
            'table' => 'sessions',
            'connection' => null,
        ],
        'memcached' => [
            'driver' => 'memcached',
            'persistent_id' => env('MEMCACHED_PERSISTENT_ID'),
            'sasl' => [
                env('MEMCACHED_USERNAME'),
                env('MEMCACHED_PASSWORD'),
            ],
            'options' => [
                // Memcached::OPT_CONNECT_TIMEOUT => 2000,
            ],
            'servers' => [
                [
                    'host' => env('MEMCACHED_HOST', '127.0.0.1'),
                    'port' => env('MEMCACHED_PORT', 11211),
                    'weight' => 100,
                ],
            ],
        ],
        'redis' => [
            'driver' => 'redis',
            'connection' => 'default',
        ],
        'array' => [
            'driver' => 'array',
        ],
    ],
    
    'lifetime' => env('SESSION_LIFETIME', 120),
    'expire_on_close' => false,
    'encrypt' => false,
    'files' => storage_path('framework/sessions'),
    'connection' => null,
    'table' => 'sessions',
    'store' => null,
    'lottery' => [2, 100],
    'cookie' => env('SESSION_COOKIE', Illuminate\Support\Str::slug(env('APP_NAME', 'laravel'), '_').'_session'),
    'path' => '/',
    'domain' => env('SESSION_DOMAIN'),
    'secure' => env('SESSION_SECURE_COOKIE'),
    'http_only' => true,
    'same_site' => 'lax',
];
