import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import About from '../pages/FAQ/About';
import Houses from '../pages/Houses/Houses';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        
    },
    {
        path: '/about',
        element: <About />,
        
    },
    {
        path: '/houses',
        element: <Houses />,
        
    },
]);