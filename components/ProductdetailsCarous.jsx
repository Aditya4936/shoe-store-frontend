import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ProductdetailsCarous = ({ images }) => {
  return (
    <div
      className="text-white text-[20px] w-full h-full mx-auto sticky top-[50px]
                     max-h-[1000px] max-w-[650px] pl-10"
    >
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {images?.map((img) => (
          <img key={img.id} src={img.attributes.url} alt={img.attributes.name}/>
        ))}
       
      </Carousel>
    </div>
  );
};

export default ProductdetailsCarous;
