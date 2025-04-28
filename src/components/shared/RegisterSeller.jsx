import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { HiMiniXMark } from "react-icons/hi2";
import { toast } from "react-hot-toast";

const server = process.env.REACT_APP_API_URL;

const RegisterSeller = () => {
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to store form input values
  const [sellerName, setSellerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle phone number input, allowing only digits and limiting to 10 characters
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhoneNumber(value); // Update state only if it's a valid number and within 10 digits
    }
  };

  // Handle form submission (you can replace this with your API call)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("registering seller");
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${server}/api/v1/admin/newseller`,
        {
          phoneNumber: phoneNumber,
          sellerName,
          sellerAddress,
        },
        config
      );
      if (data.success === true) {
        toast.success("seller register successfully", { id: toastId });
        setSellerName("");
        setPhoneNumber("");
        setSellerAddress("");
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }

    // Log the form data to the console or send it to an API

    // You can also clear the form fields after submission if needed

    // Close the modal after submission
    toggleModal();
  };

  return (
    <>
      {/* Floating Action Button for adding a new seller */}
      <button
        onClick={toggleModal}
        className="fixed bottom-10 right-10 bg-[#FE6903] p-4 rounded-full shadow-lg hover:bg-[#e05800] transition-all duration-300"
      >
        <FaPlus className="text-[32px] text-white" />
      </button>

      {/* Modal for Register Seller */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
          <div className="w-[350px] bg-white rounded-lg shadow-lg flex flex-col items-center justify-start p-6 gap-6 z-50 relative">
            {/* Modal Header */}
            <div className="flex flex-row w-full items-center justify-between border-b pb-2">
              <p className="text-lg font-semibold text-gray-800">
                Register a New Seller
              </p>
              <HiMiniXMark
                className="text-xl cursor-pointer hover:text-gray-600 transition-colors"
                onClick={toggleModal}
              />
            </div>

            {/* Form for adding a new seller */}
            <form
              className="w-full flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              {/* Seller Name Input */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="sellername"
                  className="text-sm font-medium text-gray-600"
                >
                  Seller Name
                </label>
                <input
                  type="text"
                  id="sellername"
                  className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-[#FE6903] focus:outline-none transition-all duration-300"
                  placeholder="Enter seller name"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                />
              </div>

              {/* Seller Phone Input */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="phonenumber"
                  className="text-sm font-medium text-gray-600"
                >
                  Seller Phone
                </label>
                <input
                  type="text"
                  id="phonenumber"
                  className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-[#FE6903] focus:outline-none transition-all duration-300"
                  placeholder="Enter seller phone"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  maxLength="10"
                />
                {/* Validation message for phone number length */}
                {phoneNumber.length === 10 && (
                  <p className="text-sm text-green-600">
                    Phone number is valid.
                  </p>
                )}
              </div>

              {/* Seller Address Input */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-600"
                >
                  Seller Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-[#FE6903] focus:outline-none transition-all duration-300"
                  placeholder="Enter seller address"
                  value={sellerAddress}
                  onChange={(e) => setSellerAddress(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 w-full py-2 bg-[#FE6903] text-white rounded-md shadow-md hover:bg-[#e05800] transition-all duration-300"
              >
                Register Seller
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterSeller;
