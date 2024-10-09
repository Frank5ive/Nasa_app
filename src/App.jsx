import { useEffect, useState } from "react";
import Footer from "./Components/Footer";
import Main from "./Components/Main";
import SideBar from "./Components/SideBar";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_API = import.meta.env.VITE_NASA_API_KEY
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API}`;

      const today = (new Date()).toDateString();
      const localKey = `NASA-${today}`;
      
      if(localStorage.getItem(localKey)){
        const api_data = JSON.parse(localStorage.getItem(localKey))

        setData(api_data);
        console.log("fetched from cache");

        return
      }

      localStorage.clear()
      try {
        const res = await fetch(url);
        const api_data = await res.json(); // Added await here
        localStorage.setItem(localKey, JSON.stringify(api_data));
        setData(api_data);
        console.log("fetched from req");
      } catch (e) {
        console.error("Error:", e.message); // Corrected error logging
      }
    }

    fetchAPIData();
  }, []);

  return (
    <>
      {data ? (<Main data = {data}/>): (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && <SideBar handleToggleModal={handleToggleModal} data =  {data}/>}
      {data && (<Footer showModal={showModal} handleToggleModal={handleToggleModal} data={data} />)}
    </>
  );
}

export default App;
