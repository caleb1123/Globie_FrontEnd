import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import {
  FaFacebookF,
  FaRegBell,
  FaTelegramPlane,
  FaRegUser,
  FaRegEdit,
  FaShoppingCart,
} from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { TOKEN_STORAGE_KEY, USER_ROLE_STORAGE_KEY } from "../../constants";
import { useDispatch } from "react-redux";
import { removeCart } from "../../store/cartSlice";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Sử dụng useNavigate



// import productApi from "../../../api/productApi"; // Điều chỉnh lại nếu cần

const HeaderClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const [searchTerm, setSearchTerm] = useState(""); // State lưu trữ từ khóa tìm kiếm

  const isLogged = localStorage.getItem(TOKEN_STORAGE_KEY);
  const role = localStorage.getItem(USER_ROLE_STORAGE_KEY);

  const onSignOut = () => {
    dispatch(removeCart());

    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_ROLE_STORAGE_KEY);
    window.location.href = "/login";
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?keyWord=${searchTerm}`); // Điều hướng tới trang ProductSearch với từ khóa tìm kiếm
    }
  };
  return (
    <>
      <div className="container mx-auto flex items-center justify-between py-6 px-2 gap-6">
        <div className="flex items-center gap-x-6">
          <Link to="/" className="flex items-center">
            <img src="/images/logo.png" alt="Logo" />
            <p className="font-bold text-2xl">GLOBIE</p>
          </Link>

          <div className="border rounded-md flex items-center py-2">
            <input
              placeholder="Search products"
              className="px-3 placeholder:text-sm text-sm outline-none w-full"
              value={searchTerm} // Lưu giá trị từ ô input
              onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật từ khóa tìm kiếm khi người dùng nhập
            />

            <select name="" id="" className="text-sm outline-none">
              <option value="">All categories</option>
            </select>

            <div
              className="px-3 cursor-pointer border-l border-l-gray-300 ml-2"
              onClick={handleSearch} // Gọi hàm handleSearch khi nhấn vào biểu tượng tìm kiếm
            >
              <IoSearch />
            </div>
          </div>
          </div>

        <div className="flex items-center gap-x-6 gap-y-3 flex-wrap justify-end">
          <div className="flex items-center gap-x-6">
            <Link>About us</Link>
            <Link to={"/blog"}>Blog</Link>
            <Link to="/build-pc">Build Computer Configuration</Link>
            <Link>Contact us</Link>
            <Link>Help & support</Link>
          </div>

          <div className="flex items-center gap-x-2">
          <Link to="https://www.instagram.com/globietechgear?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">
          <AiFillInstagram className="text-2xl" />
        </Link>

          <Link to="https://www.facebook.com/profile.php?id=61565610658977" target="_blank">
            <FaFacebookF className="text-xl" />
          </Link>


          </div>
        </div>
      </div>

      <div className="bg-[#FFD861]">
        <div className="container mx-auto px-2 flex items-center py-4">
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-2">
              <CiBoxList className="text-xl" />
              <p className="font-semibold">Categories</p>
            </div>

            <select name="" id="" className="bg-transparent">
              <option value="">USA</option>
            </select>

            <select name="" id="" className="bg-transparent">
              <option value="English">English</option>
            </select>
          </div>

          <div className="ml-auto flex items-center gap-x-5">
            {/* <FaRegHeart className="text-xl" /> */}
            <FaRegBell className="text-xl" />

            {isLogged ? (
              <>
                <Link to="/cart">
                  <FaShoppingCart className="text-xl" />
                </Link>

                <Link to="/profile">
                  <FaRegUser className="text-xl" />
                </Link>

                <p onClick={onSignOut} className="cursor-pointer">
                  Đăng xuất
                </p>
              </>
            ) : (
              <Link to="/login">Đăng nhập</Link>
            )}

            {isLogged && ["USER", "STOREKEEPER"].includes(role) && (
              <Link
                to="/post-product"
                className="flex items-center bg-orange-500 rounded-md p-3 gap-x-2 text-white text-sm font-semibold"
              >
                <FaRegEdit className="text-lg" />
                <p>POST PRODUCT</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderClient;
