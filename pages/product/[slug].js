import React, { useState } from "react";
import Wrapper from "@/components/Wrapper";
import { IoMdHeartEmpty } from "react-icons/io";
import ProductdetailsCarous from "@/components/ProductdetailsCarous";
import RelatedProduct from "@/components/RelatedProduct";
import { fetchDataFromApi } from "@/utils/api";
import { getDiscountedPricePercentage } from "@/utils/helper";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ product, products }) => {
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

  const p = product?.data?.[0]?.attributes;

  const notify = () => {
    toast.success("success check your cart", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div className="w-full md:py-20">
      <ToastContainer />
      <Wrapper>
        <div
          className="flex flex-col lg:flex-row md:px-10 gap-[35px] 
        lg:gap-[100px]"
        >
          {/* Left section start */}
          <div
            className="w-full md:w-auto flex-[1.5] max-w-[1300px] lg:max-w-full
            mx-auto lg:mx-0"
          >
            <ProductdetailsCarous images={p.image.data} />
          </div>
          {/* Left section end */}

          {/* Right section start */}
          <div className="flex-[1] py-3 md:pr-44">
            <div className="text-[34px] font-semibold mb-2 leading-tight md:text-24px">
              {p.Name}
            </div>
            <div className="SubTitle text-lg font-semibold mb-5 ">
              {p.subtitle}
            </div>
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">
                MRP : &#8377;{p.price}
              </p>
              {p.orignal_price && (
                <>
                  <p className="text-base  font-medium line-through">
                    &#8377;{p.orignal_price}
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500 animate-bounce md:animate-ping">
                    {getDiscountedPricePercentage(p.orignal_price, p.price)}
                    %off
                  </p>
                </>
              )}
            </div>
            <div className="text-md font-medium text-black/[0.5]">
              incl.of taxes
            </div>
            <div className="text-md font-medium text-black/[0.5] mb-20">
              {`(Also include all applicable duties)`}
            </div>
            {/* product size range start */}
            <div className="mb-10 ">
              {/* heading */}
              <div className="flex justify-between mb-2">
                <div className="text-md font-semibold">Select-Size</div>
                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                  Select Guid
                </div>
              </div>
              {/* heading end */}
              {/* size boxes  start*/}
              <div className="grid grid-cols-3 gap-2" id="sizesGrid">
                {p.size.data.map((item, i) => (
                  <div
                    key={i}
                    className={`border rounded-md text-center py-3 font-medium
                       ${
                         item.enabled
                           ? "hover:border-black cursor-pointer"
                           : "cursor-not-allowed bg-black/[0.1] opacity-50"
                       }${selectedSize === item.size 
                        ? "border-black" 
                        : ""
                      }`}
                    onClick={() => {
                      setSelectedSize(item.size);
                      setShowError(false);
                    }}
                  >
                    {item.size}
                  </div>
                ))}
              </div>
              {/* size boxe end */}
              {showError && (
                <div className="text-red-600 mt-1">
                  Size selection is required
                </div>
              )}
            </div>
            {/* product size range end*/}

            <button
              className="w-full py-4 rounded-full bg-black text-white text-lg
                font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              onClick={() => {
                {
                  if (!selectedSize) {
                    setShowError(true);
                    document.getElementById("sizesGrid").scrollIntoView({
                      block: "center",
                      behavior: "smooth",
                    });
                  } else {
                    dispatch(
                      addToCart({
                        ...product?.data?.[0],
                        selectedSize,
                        oneQuantityPrice: p.price,
                      })
                    );
                    notify();
                  }
                }
              }}
            >
              Add to cart
            </button>

            <button
              className="w-full py-4 rounded-full border border-black
                text-lg font-medium transition-transform active:scale-95 flex items-center
                justify-center gap-2 hover:opacity-75 mb-10 hover:bg-red-600"
            >
              Whishlist <IoMdHeartEmpty className="w-1.5rem h-1.5rem ml-1" />
            </button>

            <div>
              <div className="text-lg font-bold mb-5">Product Details</div>

              <div className="text-md mb-5 markdown">
                <ReactMarkdown>{p.description}</ReactMarkdown>
              </div>
            </div>
          </div>
          {/* Right section end*/}
        </div>

        <RelatedProduct products={products} />
      </Wrapper>
    </div>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  const products = await fetchDataFromApi("/api/products?populate=*");

  const paths = products?.data?.map((p) => ({
    params: {
      slug: p.attributes.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

// getstaticpaths reqire getstaticprops
export async function getStaticProps({ params: { slug } }) {
  const product = await fetchDataFromApi(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );
  const products = await fetchDataFromApi(
    `/api/products?populate=*&[filters][slug][$ne]=${slug}`
  );

  return {
    props: {
      product,
      products,
    },
  };
}
