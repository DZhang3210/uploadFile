import "./App.css";
import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    const fetchData = async() => {
      try{
        const response = await listAll(imagesListRef);
        const urlPromises = response.items.map((item) => getDownloadURL(item));
        const urls = await Promise.all(urlPromises);
        setImageUrls(urls);
      }
      catch(err){
        console.log("CATCH ERROR", err)
      }
    }
    fetchData()
  }, []);

  useEffect(() => {
    console.log(imageUrls)
  }, [imageUrls])
  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>
      {imageUrls.map((url, i) => {
        return <img src={url} key = {i}/>;
      })}
    </div>
  );
}

export default App;