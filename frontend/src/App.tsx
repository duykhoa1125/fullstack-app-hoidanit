
import Header from "./components/layout/header";
import axios from "./util/axios.customize";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function App() {
  useEffect(() => {
    const fetchHelloWorld = async () => {
      const res = await axios.get("/v1/api");
      console.log("check res: ", res);
    };
    fetchHelloWorld();
  }, []);

  return (
    <div>
      <Header/>
      {/* vi tri render component con ben trong cha */}
      <Outlet/>
    </div>
  );
}

export default App;
