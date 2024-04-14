import "/src/styles/app.css";
import Sidebar from "./components/SideBar.jsx";
import { Outlet} from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./utils/client.js";

function App() {

  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const getSupabasePosts = async () => {
      const supabasePosts = await supabase.from("posts").select();
      console.log(supabasePosts.data);
      setPostData(supabasePosts.data);
    };

    getSupabasePosts();
  }, []);

  return (
    <div className={"appCont"}>
      <Sidebar></Sidebar>
      <div>
        <Outlet context={[postData, setPostData]}></Outlet>
      </div>
    </div>
  );
}

export default App;
