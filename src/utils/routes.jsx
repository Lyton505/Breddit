import App from "../App.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import CreatePost from "../pages/CreatePost.jsx";
import ViewPost from "../pages/ViewPost.jsx";
import SignUp from "../pages/SignUp.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";

export default function getRoutes() {
  return [
    {
      path: "/",
      element: <App></App>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: "/create",
          element: <CreatePost></CreatePost>
        },
        {
          path: "/post:id",
          element: <ViewPost></ViewPost>
        },
        {
          path: "/signup",
          element: <SignUp></SignUp>
        },
        {
          path: "/home",
          element: <Home></Home>
        },{
          path: "/",
          element: <Home></Home>
        },
        {
          path: "/login",
          element: <Login></Login>
        }
      ]
    }
  ];
}