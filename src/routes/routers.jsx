import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import About from '../pages/FAQ/About';
import Devices from '../pages/Devices/Devices';

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
        path: '/devices',
        element: <Devices />,
        
    },
]);