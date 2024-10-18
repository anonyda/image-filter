import { useState } from "react";
import { applyHeavyFilter } from "./ImageFilter";
// import purrfectCats from "./assets/purrfect-cats.svg";
import "./App.css";
import StarRating from "./components/StarRating";
import CatWalking from "./components/CatWalking";

function App() {
  const [originalImage, setOrginalImage] = useState(null);
  const [filteredImage, setFilteredImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setOrginalImage(event.target.result);
      setFilteredImage(null);
    };

    reader.readAsDataURL(file);
  };

  const applyFilter = () => {
    if (originalImage) {
      setFilteredImage(null);
      const image = new Image();
      image.src = originalImage;

      image.onload = () => {
        const filtered = applyHeavyFilter(image);
        setFilteredImage(filtered);
      };
    }
  };

  const registerWorker = () => {
    // create a web worker
    const imageWorker = new Worker(
      new URL("ImageFilterWorker.js", import.meta.url)
    );

    // attach the event handler
    imageWorker.onmessage = (event) => {
      // receive data from web worker
      const processedData = event.data;

      // draw the image
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = processedData.width;
      canvas.height = processedData.height;
      ctx.putImageData(processedData, 0, 0);

      setFilteredImage(canvas.toDataURL()); // Convert to Data URL for displaying

      imageWorker.terminate();
    };
    return imageWorker;
  };

  const applyFilterWithWW = () => {
    if (originalImage) {
      setFilteredImage(null);

      const imageWorker = registerWorker();

      const image = new Image();
      image.src = originalImage;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        imageWorker.postMessage(imageData);
      };
    }
  };


  return (
    <>
      <CatWalking />
      <div className="main-content">
        <div className="header">
          {/* <img src={purrfectCats} alt="Purrfect Cats" /> */}
          <h1>Purrfect Filters</h1>
          <h3>Apply Crazy Heavy Filters On Your Image</h3>
        </div>
        <div className="card">
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            className="input-file"
          />
          <div className="button-container">
            <button onClick={applyFilter}>Apply Heavy Filter</button>
            <button onClick={applyFilterWithWW}>
              Apply Heavy Filter With WW
            </button>
          </div>
          {/* <br /> */}
          <div className="img-container">
            {originalImage && (
              <img src={originalImage} alt="Original" style={{ width: 300 }} />
            )}

            {filteredImage && (
              <img src={filteredImage} alt="Filtered" style={{ width: 300 }} />
            )}
          </div>
        </div>
        <StarRating />
      </div>
    </>
  );
}

export default App;
