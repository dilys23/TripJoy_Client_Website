import React from "react";

const ChatBox = () => {
  return (
    <div
      aria-label="card"
      className="flex h-full w-full flex-col space-y-4 rounded-[10px]  bg-white px-4"
    >
       {/* <div class="bg-white rounded-lg shadow-md p-4"> */}
       <div className="mt-4 mb-2 flex items-center justify-between">
      <p className="text-gray-900 text-base font-medium leading-tight tracking-tight">
              Trò chuyện 
            </p>
        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Chi tiết
        </a>
      </div>
    <div class="space-y-4 ">
      <div class="flex items-start">
      <img src="https://pbs.twimg.com/profile_images/1707101905111990272/Z66vixO-_normal.jpg" alt="Other User Avatar" class="w-8 h-8 rounded-full ml-3" />

        <div class="ml-3 bg-gray-100 p-3 rounded-lg">
          <p class="text-sm text-gray-800">Hello! How can I help you today?</p>
        </div>
      </div>

      <div class="flex items-end justify-end">
        <div class="bg-blue-500 p-3 rounded-lg">
          <p class="text-sm text-white">Sure, I have a question.</p>
        </div>
        <img src="https://pbs.twimg.com/profile_images/1707101905111990272/Z66vixO-_normal.jpg" alt="Other User Avatar" class="w-8 h-8 rounded-full ml-3" />
      </div>
    </div>
    <div class="mt-4 flex items-center">
      <input
        type="text"
        placeholder="Type your message..."
        class="flex-1 py-2 px-3 rounded-full bg-[#F5F5F5] focus:outline-none"
      />
      <button class="bg-blue-500 text-white px-4 py-2 rounded-full ml-3 hover:bg-blue-600">Send</button>
    </div>
  </div>
    // </div>

    // </div>
  );
};

export default ChatBox;
