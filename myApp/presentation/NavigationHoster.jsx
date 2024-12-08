import { RecoilRoot } from "recoil";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "../presentation/homeScreen/components/HomeScreen";
import ItemPage from "../presentation/itemScreen/components/ItemPage";

/*
    this component should controll our navigation between main features / screens while keep track on the 
    needed navigation arguments and mange the navigation itself
*/

function NavigationHoster() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeScreen />,
    },
    {
      path: "newsItem/:itemId",
      element: <ItemPage />,
    },
  ]);

  return (
      <RecoilRoot>
        <RouterProvider router={router}/>
      </RecoilRoot>
  );
}

export default NavigationHoster;
