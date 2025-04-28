import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { HandleContext } from "../hooks/HandleState";

const server = process.env.REACT_APP_API_URL;
const Admin = () => {
  const [secretKey, setSecretKey] = useState("");
  const { setAdminExist } = useContext(HandleContext);

  const navigate = useNavigate()
  const adminLogin = async (e) => {

    e.preventDefault();
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const toastId = toast.loading("loging...");
    try {
      const { data } = await axios.post(
        `${server}/api/v1/admin/adminlogin`,
        {
          secretKey,
        },
        config
      );

      toast.success(data.message,{id:toastId});
      if (data.success) {
        setAdminExist(true);
      }
      
      console.log(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something wend wrong",{id:toastId});
    }
  };

  return (<>
    <div className="flex flex-col items-center justify-center w-[100vw] h-[100vh]">
      <div
        className="flex-col flex items-center justify-center py-6 px-6 w-[325px] rounded-xl  bg-white bg-opacity-15 gap-10"
        style={{ boxShadow: "0px 0px 17px 6px rgba(0, 0, 0, 0.25) " }}
      >
        <p className="text-[24px] font-semibold">Admin Login</p>
        <form
          onSubmit={adminLogin}
          action="Submit"
          className=" flex flex-col items-center justify-center w-full gap-10"
        >
          <input
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            type="text "
            placeholder="Enter the secret key"
            className="w-full text-[20px] py-3 px-3 bg-[#FE6903] outline-[#FE6903] bg-opacity-15 rounded-lg "
          />
          <button
            className="py-3 px-6 bg-[#FE6903] text-white text-[20px] rounded-xl font-semibold  capitalize"
            type="submit"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  </>
   
  );
};

export default Admin;
