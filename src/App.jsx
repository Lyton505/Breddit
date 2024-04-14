import "/src/styles/app.css";
import { useEffect, useState } from "react";
import { supabase } from "./utils/client.js";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/SideBar.jsx";
import LoginPage from "./pages/Login.jsx";

function App() {
  const [user, setUser] = useState(null);

  console.log("User state at start: ", user);

  useEffect(() => {
    checkUser();
    window.addEventListener("hashchange", function() {
      checkUser();
    });
  }, []);

  async function checkUser() {
    console.log("Checking user");
    try {
      const user = await supabase.auth.getUser();
      setUser(user.data.user);
    } catch (e) {
      console.log("User not logged in");
    }
  }

  async function signInWithGithub() {
    const {
      data,
      error
    } = await supabase.auth.signInWithOAuth({ provider: "github" });
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }


  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const getSupabasePosts = async () => {
      const supabasePosts = await supabase.from("posts").select();
      // console.log(supabasePosts.data);
      setPostData(supabasePosts.data);
    };

    getSupabasePosts();
  }, []);

  return (
    user === null ?
      <LoginPage signInWithGithub={signInWithGithub}></LoginPage>
      :
      <div className={"appCont"}>
        <Sidebar userInfo={user} signOut={signOut}></Sidebar>
        <div>
          <Outlet context={[postData, setPostData]}></Outlet>
        </div>
      </div>
  );
}

export default App;
