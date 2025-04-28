import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const HandleContext = createContext();

const HandleState = ({ children }) => {
  const server = process.env.REACT_APP_API_URL;
  const [adminExist, setAdminExist] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [todayOrder, setTodayOrder] = useState([]);
  const [sellers, setSellers] = useState([]);

  const getAdminProfile = async () => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        `${server}/api/v1/admin/adminprofile`,
        config
      );
      if (response.data.success) {
        setAdminExist(true);
      }
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      setAdminExist(false);
    }
  };

  const adminLogout = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging out...");
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `${server}/api/v1/admin/adminlogout`,
        config
      );
      if (data.success) {
        toast.success("Logout successful", { id: toastId });
        setAdminExist(false);
      }
    } catch (error) {
      toast.error("Logout failed: " + error.message, { id: toastId });
      setAdminExist(false);
    }
  };

  const handleAllUsers = async () => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        `${server}/api/v1/admin/allusers`,
        config
      );
      if (response.data.success) {
        setAllUsers(response.data.allUsers.reverse());
      }
      console.log(response.data); // You can choose to keep this or remove it
    } catch (error) {
      toast.error("Error fetching users: " + error.message);
      console.error("Error fetching users:", error);
    }
  };

  const handleAllOrders = async () => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        `${server}/api/v1/admin/allorders`,
        config
      );
      console.log(response.data); // You can choose to keep this or remove it
      if (response.data.success) {
        setAllOrders(response.data.transformedOrders.reverse());
        const isToday = (dateString) => {
          const today = new Date();
          const orderDate = new Date(dateString);
          return (
            today.getFullYear() === orderDate.getFullYear() &&
            today.getMonth() === orderDate.getMonth() &&
            today.getDate() === orderDate.getDate()
          );
        };
        const todayOrders =
          response.data.transformedOrders?.filter((order) =>
            isToday(order.createdAt)
          ) || [];
        setTodayOrder(todayOrders);
      }
    } catch (error) {
      toast.error("Error fetching orders: " + error.message);
      console.error("Error fetching orders:", error);
    }
  };
  const handleAllSellers = async () => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        `${server}/api/v1/admin/allseller`,
        config
      );
      console.log(response.data); // You can choose to keep this or remove it
      setSellers(response.data.sellers.reverse());
    } catch (error) {
      toast.error("Error fetching orders: " + error.message);
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getAdminProfile();
  }, []); // Run only on mount

  return (
    <HandleContext.Provider
      value={{
        adminExist,
        handleAllOrders,
        handleAllUsers,
        setAdminExist,
        allOrders,
        allUsers,
        adminLogout,
        setSellers,
        sellers,
        handleAllSellers,
      }}
    >
      {children}
    </HandleContext.Provider>
  );
};

export default HandleState;
