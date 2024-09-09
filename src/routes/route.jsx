import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppWrapper from "../AppWrapper";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";
import Redirect from "../pages/Redirect";
import Login from "../pages/Login";
import PrivateRoutes from "./PrivateRoutes";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";

// import AppContainer from "../pages/AppContainer";

const routes = createBrowserRouter([
    {
      index: true,
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      // element:  <AppContainer>
      //            <PrivateRoutes />
      //           </AppContainer>,
      element:<PrivateRoutes />,
      children: [
          {
              path: "products",
              element: <AppWrapper />,
              children: [
                  {
                    index: true,
                    element:<Home />
                  },
                  {
                    path:":id",
                    element:<ProductDetails />,
                  },
                  {
                    path: "wishlist",
                    element: <Wishlist />,
                  },
                  {
                    path: "cart",
                    element: <Cart />,
                  },
              ],
          },
          {
            path: "*",
            element: <Redirect />
          }
      ]
    }
]);
export default function AppRouter() {
  return <RouterProvider router={routes} />;
}
