import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaAngleRight, FaHeart, FaPlusCircle, FaStar } from "react-icons/fa";
import {
  FaPlus,
  FaMinus,
  FaArrowRightArrowLeft,
  FaArrowsRotate,
  FaRegMessage,
} from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { IoShieldCheckmark } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import productApi from "../../api/productApi";
import { formatPrice } from "../../utils/formatPrice";
import { message, Spin } from "antd";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../store/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const { data, isFetching } = useQuery({
    queryKey: ["PRODUCT_DETAIL", id],
    queryFn: async () => {
      const res = await productApi.getProductDetail(id);
      const productData = res.data.data;

      const productImage = await productApi.getImageByProductId(
        productData.productId
      );

      return {
        ...productData,
        images: productImage.data?.data || [],
      };
    },
  });

  const onIncreaseQnt = () => {
    const qnt = quantity + 1;
    if (qnt <= data.quantity) {
      setQuantity(qnt);
    }
  };

  const onDecreaseQnt = () => {
    const qnt = quantity - 1;
    qnt > 0 && setQuantity(qnt);
  };

  const onAddCart = () => {
    dispatch(
      addProductToCart({
        amount: quantity,
        productId: data.productId,
        image: data.images[0].imagePath,
        name: data.productName,
        price: data.price,
      })
    );

    setQuantity(1);
    message.success("Add product to cart success");
  };

  if (isFetching) {
    return <Spin />;
  }

  return (
    <div className="container px-3 mx-auto">
      <div className="flex gap-x-2 text-[#555555] items-center mt-12">
        <Link>Homepage</Link>
        <FaAngleRight />
        <Link>{data?.productCategory?.categoryName}</Link>
        <FaAngleRight />
        <Link>{data?.productName}</Link>
      </div>

      <div className="mt-10 grid grid-cols-12 gap-6 mb-6 items-center">
        <div className="col-span-6 flex">
          {data.images.length > 1 && (
            <div className="w-36 flex flex-col gap-y-2">
              {data.images.slice(1).map((it, index) => (
                <img
                  key={index}
                  src={it.imagePath}
                  alt="Product img"
                  className="block w-full"
                />
              ))}
            </div>
          )}

          <div className="flex-1 flex">
            <img
              src={data?.images?.[0]?.imagePath}
              alt="Product img"
              className="block object-contain my-auto"
            />
          </div>
        </div>

        <div className="col-span-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-xl"> {data?.productName}</h2>
              <p>{formatPrice(data?.price)}đ</p>
            </div>

            <div className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer">
              <FaHeart className="text-gray-400 text-xl" />
            </div>
          </div>

          <div className="mt-8 gap-5 flex items-center">
            <p>Shipping</p>

            <div>
              <select name="" id="" className="font-medium">
                <option value="">Free Shipping to Victoria teritory</option>
              </select>

              <p className="text-[#9D9D9D] text-sm">
                Delivery Time: 14–17 days
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-5">
            <p>Quantity</p>

            <div className="border rounded flex">
              <FaMinus className="m-3 cursor-pointer" onClick={onDecreaseQnt} />
              <input
                type="text"
                className="w-12 text-center outline-none"
                value={quantity}
                readOnly
              />
              <FaPlus className="m-3 cursor-pointer" onClick={onIncreaseQnt} />
            </div>

            <p className="font-semibold text-[#555555] text-sm">
              {data.quantity} available
            </p>
          </div>

          <div className="mt-5 bg-[#E9E9E9] rounded p-8">
            <p className="text-lg text-[#262626] font-semibold pb-3 border-b border-b-[#C4C4C4]">
              $79.98
            </p>

            <div className="mt-4 flex items-center gap-3">
              <FaPlusCircle className="text-xl" />

              <p className="flex-1 text-sm">
                <strong>Add shipping insurance for $9 </strong>
                <span>
                  (declared value only if the package gets lost, stolen or
                  damaged.)
                </span>
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button className="w-1/2 h-14 rounded bg-[#4172DC] uppercase text-white">
              Shop now
            </button>
            <button
              onClick={onAddCart}
              className="w-1/2 h-14 rounded uppercase flex gap-x-2 items-center justify-center border border-[#434343] text-[#434343]"
            >
              <LuShoppingCart className="text-xl" />
              <p>Add to basket</p>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center pb-2 border-b gap-10 mt-12">
        <p className="uppercase font-medium text-[#9D9D9D] cursor-pointer">
          Product details
        </p>
        <p className="uppercase font-medium text-[#9D9D9D] cursor-pointer">
          Reviews (5)
        </p>
        <p className="uppercase font-medium text-[#9D9D9D] cursor-pointer">
          Shipping & Payment
        </p>
      </div>

      <div className="py-12 grid grid-cols-12 gap-6 items-center">
        <div className="col-span-7">
          <div className="flex items-center gap-5">
            <img
              src="/images/store.png"
              alt="Store avatar"
              className="w-[200px] h-[200px] rounded-full object-cover border"
            />

            <div>
              <p className="font-semibold text-2xl">PC BIEN HOA</p>
              <div className="flex items-center gap-x-1 my-3">
                <FaStar className="text-yellow-500 text-xl" />
                <FaStar className="text-yellow-500 text-xl" />
                <FaStar className="text-yellow-500 text-xl" />
                <FaStar className="text-yellow-500 text-xl" />
                <FaStar className="text-yellow-500 text-xl" />
              </div>

              <div className="flex items-center gap-x-2">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p className="text-sm text-gray-500">Online 1 hour ago</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <p className="px-4 min-w-56 h-12 cursor-pointer bg-[#FF7A00] text-white text-lg font-medium rounded-md flex items-center justify-center">
              Follow
            </p>
            <p className="px-4 min-w-56 h-12 cursor-pointer bg-[#FF7A00] text-white text-lg font-medium rounded-md flex items-center justify-center">
              View store
            </p>
          </div>
        </div>

        <div className="col-span-5">
          <p className="font-semibold text-lg">Store policy</p>

          <ul className="mt-4">
            <li className="flex items-center gap-x-2 mb-3">
              <IoShieldCheckmark />

              <p>Warranty 01 - 03 - 06 - 12 months hardware</p>
            </li>
            <li className="flex items-center gap-x-2 mb-3">
              <FaArrowsRotate />

              <p>Returns 1 for 1 within 15 days</p>
            </li>
            <li className="flex items-center gap-x-2 mb-3">
              <MdOutlinePayment />

              <p>Online Installment And HD Bank</p>
            </li>
            <li className="flex items-center gap-x-2 mb-3">
              <FaArrowRightArrowLeft />

              <p>Subsidize the price of old revenue to upgrade the machine</p>
            </li>
          </ul>

          <hr />

          <div className="h-11 p-3 bg-green-500 rounded-md my-4 flex items-center gap-3 text-white font-medium w-[70%] cursor-pointer">
            <IoIosCall className="text-xl" />
            <p className="font-semibold">0983******</p>
            <p className="font-semibold uppercase ml-auto">
              Click to show number
            </p>
          </div>

          <hr />

          <div className="flex items-center justify-between mt-4">
            <FaRegMessage className="text-xl" />

            <p className="font-semibold uppercase text-green-500">
              Chat with seller
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2 pt-6 border-t">
        <p className="uppercase text-[#262626] font-medium">
          You might also like
        </p>

        <div className="mt-4 grid grid-cols-12 gap-2 mb-10">
          <div className="col-span-3 flex gap-2 items-center">
            <img
              src="/images/mouse.png"
              alt="Product"
              className="block w-32 object-cover"
            />

            <div className="flex-1">
              <p className="font-semibold text-[#262626] mb-3">
                Razer Viper V3
              </p>

              <div className="flex items-center mb-4 gap-x-4 gap-y-1 flex-wrap">
                <p className="font-semibold text-[#FF2E00]">$69.99</p>
                <p className="text-[#555555]">$129.99</p>
                <p className="px-2 text-sm py-1 font-medium rounded-md bg-[#FF2E00] text-white">
                  - 40%
                </p>
              </div>

              <button className="h-9 rounded border border-[#7B7B7B] flex items-center justify-center gap-x-3 px-4 cursor-pointer">
                <p className="text-sm font-semibold text-[#555555]">$39</p>

                <p className="text-sm text-[#262626] font-medium">
                  Add to cart
                </p>
              </button>
            </div>
          </div>

          <div className="col-span-3 flex gap-2 items-center">
            <img
              src="/images/mouse.png"
              alt="Product"
              className="block w-32 object-cover"
            />

            <div className="flex-1">
              <p className="font-semibold text-[#262626] mb-3">
                Razer Viper V3
              </p>

              <div className="flex items-center mb-4 gap-x-4 gap-y-1 flex-wrap">
                <p className="font-semibold text-[#FF2E00]">$69.99</p>
                <p className="text-[#555555]">$129.99</p>
                <p className="px-2 text-sm py-1 font-medium rounded-md bg-[#FF2E00] text-white">
                  - 40%
                </p>
              </div>

              <button className="h-9 rounded border border-[#7B7B7B] flex items-center justify-center gap-x-3 px-4 cursor-pointer">
                <p className="text-sm font-semibold text-[#555555]">$39</p>

                <p className="text-sm text-[#262626] font-medium">
                  Add to cart
                </p>
              </button>
            </div>
          </div>

          <div className="col-span-3 flex gap-2 items-center">
            <img
              src="/images/mouse.png"
              alt="Product"
              className="block w-32 object-cover"
            />

            <div className="flex-1">
              <p className="font-semibold text-[#262626] mb-3">
                Razer Viper V3
              </p>

              <div className="flex items-center mb-4 gap-x-4 gap-y-1 flex-wrap">
                <p className="font-semibold text-[#FF2E00]">$69.99</p>
                <p className="text-[#555555]">$129.99</p>
                <p className="px-2 text-sm py-1 font-medium rounded-md bg-[#FF2E00] text-white">
                  - 40%
                </p>
              </div>

              <button className="h-9 rounded border border-[#7B7B7B] flex items-center justify-center gap-x-3 px-4 cursor-pointer">
                <p className="text-sm font-semibold text-[#555555]">$39</p>

                <p className="text-sm text-[#262626] font-medium">
                  Add to cart
                </p>
              </button>
            </div>
          </div>

          <div className="col-span-3 flex gap-2 items-center">
            <img
              src="/images/mouse.png"
              alt="Product"
              className="block w-32 object-cover"
            />

            <div className="flex-1">
              <p className="font-semibold text-[#262626] mb-3">
                Razer Viper V3
              </p>

              <div className="flex items-center mb-4 gap-x-4 gap-y-1 flex-wrap">
                <p className="font-semibold text-[#FF2E00]">$69.99</p>
                <p className="text-[#555555]">$129.99</p>
                <p className="px-2 text-sm py-1 font-medium rounded-md bg-[#FF2E00] text-white">
                  - 40%
                </p>
              </div>

              <button className="h-9 rounded border border-[#7B7B7B] flex items-center justify-center gap-x-3 px-4 cursor-pointer">
                <p className="text-sm font-semibold text-[#555555]">$39</p>

                <p className="text-sm text-[#262626] font-medium">
                  Add to cart
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
