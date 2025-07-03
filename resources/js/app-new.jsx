import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

// Import your main App component
import App from '../../src/App.jsx';

// Import your CSS
import '../../src/index.css';

// Create root and render
const root = createRoot(document.getElementById('root'));
root.render(
    <Router>
        <App />
    </Router>
);
