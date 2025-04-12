import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/FAQ/About";
import Devices from "../pages/Devices/Devices";
import Reports from "../pages/Reports/Reports";
import Schedule from "../pages/Schedule/Schedule";
import User from "../pages/Authentication/User";
import Admin from "../pages/Authentication/Admin";
import ConfigDevice from "../pages/Configdevice/ConfigDevice";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/devices",
    element: <Devices />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
  {
    path: "/schedule",
    element: <Schedule />,
  },
  {
    path: "/account",
    element: <User />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/configdevice",
    element: <ConfigDevice />,
  },
]);
