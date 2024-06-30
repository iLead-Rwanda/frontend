import React from "react";
import { Icon } from "@iconify/react";
import NavLogin from "../../Components/NavLogIn";
import { Link } from "react-router-dom";
import images from "../../utils/images";

const Login = () => {
  return (
    <div className="reg w-full flex flex-col justify-between items-center p-2 bg-gradient-to-r from-amber-000 to-amber-400">
      <NavLogin />
      <div className="w-full flex justify-between items-center p-10 ">
        <div className="flex flex-col border p-10">
          <div className="flex flex-col justify-center items-start gap-7">
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-[#B58A5F] font-poppins text-3xl font-normal leading-[54px]">
                Welcome to Ilead MIS
              </h3>
              {/* <div className="flex justify-center items-center gap-4 p-5">
                <button className="flex w-[180px] bg-[#D8C5AE] hover:bg-[#e6e2dd] rounded-md justify-center items-center p-2">
                  <Icon
                    icon="flat-color-icons:google"
                    style={{ color: "#fff", fontSize: "24px" }}
                  />
                  <p className="font-semibold text-sm">Sign in with Google</p>
                </button>
                <button className="flex w-[180px] bg-[#D8C5AE] hover:bg-[#e6e2dd] rounded-md justify-center items-center p-2">
                  <Icon
                    icon="ri:apple-fill"
                    style={{ color: "#fff", fontSize: "24px" }}
                  />
                  <p className="font-semibold text-sm">Sign in with Apple</p>
                </button>
              </div>
              <div className="continue flex justify-center items-center text-sm text-[#686B6E]">
                <p className="cursor-pointer hover:text-base">
                  or continue with e-mail
                </p>
              </div> */}
            </div>
            <div className="inputs flex flex-col gap-6">
              <div class="flex flex-col justify-start items-start">
                <label for="em" class="text-[#9B9C9E] text-sm">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  name="em"
                  class="border border-[#363A3D] p-2 rounded-md w-[420px] text-sm"
                />
              </div>
              <div class="flex flex-col justify-start items-start">
                <label for="pwd" class="text-[#9B9C9E] text-sm">
                  Password
                </label>
                <input
                  type="password"
                  name="pwd"
                  id="p"
                  class="border border-[#363A3D] p-2 rounded-md w-[420px]"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-2 p-3 text-sm">
              <input type="checkbox" name="terms" id="trm" className="" />
              <label htmlFor="terms">Remember me</label>
            </div>
            <div className="cursor-pointer text-sm font-semibold hover:text-blue-500">
              Forgot password?
            </div>
          </div>
          <Link
            to="/dash"
            className="cursor-pointer hover:p-3 bg-[#B58A5F] hover:bg-[#e6e2dd] text-black font-semibold text-base flex justify-center items-center p-2 rounded-md"
          >
            Login
          </Link>
        </div>
        <div className=" flex flex-col justify-start items-start gap-10">
          <div className="w-[92px]">
            <img src={images.Quote} alt="" />
          </div>
          <div className="font-spaceGrotesk text-2xl font-normal leading-loose tracking-tighter text-left w-[50%] px-8">
            We don't make mistakes, just happy little accidents.
          </div>
          <div className="flex justify-between items-center w-[80%]">
            <div className="flex flex-col items-start justify-start font-spaceGrotesk text-sm">
              <p className="font-semibold text-[#B58A5F]">John C.Maxwell</p>
              <p className="text-[#475467] font-medium">Ichoose- forgiveness</p>
            </div>
            <div className="flex justify-start items-start gap-9 w-48 text-[#fff] text-xl font-bold">
              <div className="h-10 w-10 hover:h-12 hover:w-12 cursor-pointer bg-[#B58A5F] hover:bg-[#d6b18b] rounded-full flex justify-center items-center">
                <Icon icon="bi:arrow-left" />
              </div>
              <div className="h-10 w-10 hover:h-12 hover:w-12 cursor-pointer bg-[#B58A5F] hover:bg-[#d6b18b] rounded-full flex justify-center items-center">
                <Icon icon="bi:arrow-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
