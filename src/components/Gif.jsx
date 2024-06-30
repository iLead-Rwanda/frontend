import React from "react";
import images from "../utils/images";

const Gif = () => {
  return (
    <div className="flex flex-col items-center justify-center p-24 bg-white">
      <img src={images.not_available} alt="" width={450} />
    </div>
  );
};

export default Gif;
