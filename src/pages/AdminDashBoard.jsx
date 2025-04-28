import React, { useContext, useEffect, useState } from "react";
import {  HandleContext } from "../hooks/HandleState";
import Sidemenu from "../components/shared/Sidemenu";
import { BarChart } from "../components/ui/Chart";

const AdminDashBoard = () => {

  const { handleAllOrders, allOrders, handleAllUsers, allUsers, todayOrder } = useContext(HandleContext)

  useEffect(() => {
    handleAllOrders()
    handleAllUsers()
  },[])
  return (
    <main className="w-[100vw]   flex flex-row items-start justify-start ">
      <Sidemenu />
      <div className="w-full   ">
        <div className=" h-full    px-12 py-6 flex flex-col items-center justify-center gap-20 ">
          <div className="grid grid-cols-12 gap-10 ">
            <NumberCard targetCount={allUsers?.length} cardDetails={"users"} />
            <NumberCard targetCount={allOrders?.length} cardDetails={"orders till today"} />
            <NumberCard targetCount={todayOrder?.length} cardDetails={"order of today"} />
          </div>
          <div className="flex w-full  flex-col items-center justify-center px-12 gap-10 ">
            <p className="text-[36px] font-semibold">Orders in last <span className="text-[#FE6903] text-[48px] font-bold"> 7 months</span></p>
            <BarChart
              data_1={[200, 444, 343, 556, 778, 455, 990]}
              title_1="Orders"
              bgColor_1="rgb(0,115,255)"
              // bgColor_2="rgba(53,162,235,0.8)"
            />
          </div>
        </div>
      </div>
    </main>
  );
};


const NumberCard = ({targetCount,cardDetails}) => {

  function OrderCounter() {
    const [count, setCount] = useState(0);
    const incrementSpeed = 10; // Time in milliseconds to increment the counter
    const incrementValue = 1;  // Increment step for each interval

    useEffect(() => {
      // Create a function to increment the counter
      const incrementCounter = () => {
        if (count < targetCount) {
          setCount((prevCount) => Math.min(prevCount + incrementValue, targetCount));
        }
      };

      // Set a timer to increment the counter every `incrementSpeed` milliseconds
      const timer = setTimeout(incrementCounter, incrementSpeed);

      // Clear the timer when the component unmounts or the count reaches the target
      return () => clearTimeout(timer);
    }, [count, targetCount]);  // Remove unnecessary dependency

    return (
      <p className="text-[64px]  leading-[70px] font-bold tracking-widest text-[#FE6903]">
        {count}
      </p>
    );
  }

  return (
    <div
      className="col-span-4 w-full px-6 py-6 rounded-xl flex flex-col gap-1 items-center justify-center"
      style={{ boxShadow: "0px 0px 17px 1px rgba(0, 0, 0, 0.25)" }}
    >
      <OrderCounter />
      <p className="text-[32px] font-semibold text-[#4471D4]  capitalize">{cardDetails}</p>
    </div>
  );
};


export default AdminDashBoard;
