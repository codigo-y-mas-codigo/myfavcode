
import React, { useState, useEffect } from 'react';
import MainPage from './pages/MainPage';
import CommunityPage from './pages/CommunityPage';
import HomePage from './pages/HomePage';

const NotFoundPage = () => (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-950 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-xl mt-4 text-gray-700 dark:text-gray-300">Página no encontrada</p>
      <a href="/" className="mt-8 px-6 py-3 bg-primary text-white rounded-button font-medium hover:bg-blue-600 transition-colors">
        Volver al inicio
      </a>
    </div>
  );

const App: React.FC = () => {
    const [path, setPath] = useState(window.location.pathname);

    useEffect(() => {
        const onLocationChange = () => {
            setPath(window.location.pathname);
        };
        
        const handlePopState = () => {
            onLocationChange();
        };

        // Listen for the custom 'popstate' event triggered by Header links and browser actions
        window.addEventListener('popstate', handlePopState);
        
        // Also handle direct navigation through custom events if needed
        const handlePushState = () => {
            onLocationChange();
        };
        window.addEventListener('pushstate', handlePushState);


        return () => {
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('pushstate', handlePushState);
        };
    }, []);

    const renderPage = () => {
        switch (path) {
            case '/':
                return <HomePage />;
            case '/app':
                return <MainPage />;
            case '/community':
                return <CommunityPage />;
            default:
                // Handle cases where the path might be /app/ or similar in some environments
                if (path.startsWith('/app')) return <MainPage />;
                return <NotFoundPage />;
        }
    };

    return renderPage();
};

export default App;
