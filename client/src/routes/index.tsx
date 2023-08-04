import { createBrowserRouter } from "react-router-dom";
import { NotFoundPage } from "../pages/notfound";
import { HomePage } from "../pages/home";
import { AuthPage } from "../pages/auth";


export const Routes = createBrowserRouter([
  {
    path: "/",
    Component: HomePage
  },

  {
    path: "/auth",
    Component: AuthPage
  },

  {
    path: "*",
    Component: NotFoundPage 
  },
])