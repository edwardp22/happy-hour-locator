import {
  About,
  Dashboard,
  Events,
  Faq,
  Home,
  Locations,
  Login,
  Profile,
  QRCodes,
  Signup,
} from "./components";

export const routes = [
  { route: "/about", element: <About /> },
  { route: "/faq", element: <Faq /> },
  { route: "/", element: <Home /> },
  { route: "/locations", element: <Locations /> },
  { route: "/profile", element: <Profile /> },
  { route: "/qrcodes", element: <QRCodes /> },
  { route: "/signup", element: <Signup /> },
  { route: "/admin/dashboard", element: <Dashboard /> },
  { route: "/admin/events", element: <Events /> },
  { route: "/admin/login", element: <Login /> },
  { route: "/administrator", element: <Login userType={2} /> },
];
