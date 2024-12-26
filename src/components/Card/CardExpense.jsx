import React from "react";
import moneybag from "../../assets/images/moneybag.png"
const CardExpense = ({ icon, expense }) => {
  // console.log(expense)
  return (
    <>

      <div className="flex items-center space-x-4 w-[100%] h-[60px] bg-white rounded-[10px] border border-[#aeaeae] p-3.5">
        {/* <span className="text-gray-900 flex h-8 w-10 shrink-0 items-center justify-center rounded-full bg-white">

        </span> */}
        <div className="flex justify-between w-full text-start gap-2">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium flex"><span className="w-[20px] h-[20px]">{icon}</span>{expense?.name}</h3>
            <div className=" flex items-center">
              <span className="flex px-3 text-xs font-normal leading-none text-[#6E7073] ">
                7h00 23/12/2024
              </span>

            </div>
          </div>
          <span className="flex px-3 text-xs items-center  font-normal leading-none gap-1 text-[20px]">
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/office/40/money-bag.png"
              alt="scooter"
              className="w-[20px] h-[20px] "
            />
            <span className="text-[16px] font-bold"> {expense.amount}</span>
          </span>
        </div>

      </div>
    </>
  );
};

export default CardExpense;
