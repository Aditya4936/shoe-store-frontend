import { updateCart ,removeFromCart} from "@/store/cartSlice";
import Image from "next/image";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";

const CartItem = ({ data }) => {
  const p = data.attributes;

  const dispatch = useDispatch();

  const updateCartItem = (e, key) => {
    let payload = {
      key,
      val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
      id: data.id,
    };
    dispatch(updateCart(payload))
  };
  return (
    <div className="flex py-6 gap-3 md:gap-5 border-b">
      {/* image's */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <Image
          src={p.thumnail?.data?.attributes?.url}
          alt={p.Name}
          height={120}
          width={120}
        />
      </div>
      {/*  */}
      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {p.Name}
          </div>
          <div className="text-sm md:text-md font-medium block md:hidden text-black/[0.5]">
            {p.subtitle}
          </div>
          <div className="text-sm md:text-md font-bold text-black/[0.8] mt-2">
            MRP: &#8377;{p.price}
          </div>
        </div>

        {/* Product-subtitle */}
        <div className="text-md  font-medium hidden md:block text-black/[0.5]">
          Men&apos; Golf Shoes
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex item-center gap-1">
              <div className="font-semibold">Size:</div>
              <select
                className="hover:text-black"
                onChange={(e) => updateCartItem(e, "selectedSize")}
              >
                {p.size.data.map((item, i) => {
                  return (
                    <option
                      value={item.size}
                      key={i}
                      disabled={!item.enabled ? true : false}
                      selected={data.selectedSize === item.size}
                    >
                      {item.size}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex item-center gap-1">
              <div className="font-semibold">Quantity:</div>
              <select
                className="hover:text-black"
                onChange={(e) => updateCartItem(e, "quantity")}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((q, i) => {
                  return (
                    <option key={i} value={q} selected={data.quantity === q}>
                      {q}
                    </option>
                  );
                })}
             
              </select>
            </div>
          </div>
          <RiDeleteBin6Line onClick={()=> dispatch(removeFromCart({id:data.id}))}
           className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]" />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
