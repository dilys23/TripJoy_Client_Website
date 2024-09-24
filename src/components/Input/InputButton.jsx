import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const InputButton = () => {
  return (
    <form className="flex items-center max-w-lg mx-auto gap-5">
  
        <input
          required
          placeholder="OTP"
           className="mb-4 h-[40px] w-full rounded-[5px] border border-[#ccd0d5] bg-[#f5f6f7] px-3 shadow focus:border-blue-400 focus:outline-none"
          id="voice-search"
          type="text"
        />
     
      <button
        className="mb-4 h-[40px] w-[40%] inline-flex items-center  px-5 text-sm font-medium text-white bg-blue-700 rounded-[5px] border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="submit"
      ><FontAwesomeIcon icon={faPaperPlane} size="1x" className = "px-2 ml-[-2px]" color="white" />

        Xac nhan
      </button>
    </form>
  );
};

export default InputButton;
