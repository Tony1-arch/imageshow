import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pic, setPic] = useState();
  const [allPics, setAllPics] = useState([]);
  useEffect(() => {
    getAllPics();
  }, [allPics]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pic", pic);
    await axios
      .post("https://sendmail-api-olqc.onrender.com/addPicture", formData)
      .then(getAllPics())
      .catch((error) => console.log(error.message));
  };
  const handleChange = (e) => {
    setPic(e.target.files[0]);
  };

  const getAllPics = async () => {
    await axios
      .get("https://sendmail-api-olqc.onrender.com/pictures")
      .then((res) => setAllPics(res.data))
      .catch((error) => console.log(error.message));
  };

  const handleDelete = async (name) => {
    await axios
      .delete("https://sendmail-api-olqc.onrender.com/delete", {
        data: { name: name },
      })
      .then(getAllPics())
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="app">
      <form className="form" onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <button>upload</button>
      </form>
      <div className="imgsContainer">
        {allPics &&
          allPics.map((p) => (
            <div className="imgItem" key={p.name}>
              <img className="img" src={p.url} alt="" />
              <button
                className="imgButton"
                onClick={() => handleDelete(p.name)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;