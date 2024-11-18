import React from "react";

const FriendList = () => {
  return (
    <div
      aria-label="card"
      className="flex h-full w-full flex-col space-y-4 rounded-[10px]  bg-white px-4"
    >
      {/* <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700"> */}
      <div className="mt-4 mb-2 flex items-center justify-between">
        <p className="text-gray-900 text-base font-medium leading-tight tracking-tight">
          Danh sách địa điểm
        </p>
        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          View all
        </a>
      </div>
      <div className="overflow-y flex max-h-[70%]  pr-2">
        <ul
          role="list"
          className="divide-[#E5E5E5] flex max-h-[50%] mt-[-10px] flex-1 flex-col space-y-4 divide-y"
        >
          <li>
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                  alt="Michael image"
                />
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-gray-900 truncate text-sm font-medium dark:text-white">
                  Michael Gough
                </p>
                <p class="text-gray-500 dark:text-gray-400 truncate text-sm">
                  email@windster.com
                </p>
              </div>
              <div class="text-gray-900 inline-flex items-center text-base font-semibold dark:text-white">
                <img width="24" height="24" src="https://img.icons8.com/fluency/24/speech-bubble-with-dots--v1.png" alt="speech-bubble-with-dots--v1" />

              </div>
            </div>
          </li>
          <li>
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                  alt="Michael image"
                />
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-gray-900 truncate text-sm font-medium dark:text-white">
                  Michael Gough
                </p>
                <p class="text-gray-500 dark:text-gray-400 truncate text-sm">
                  email@windster.com
                </p>
              </div>
              <div class="text-gray-900 inline-flex items-center text-base font-semibold dark:text-white">
                <img width="24" height="24" src="https://img.icons8.com/fluency/24/speech-bubble-with-dots--v1.png" alt="speech-bubble-with-dots--v1" />

              </div>
            </div>
          </li>
          <li>
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                  alt="Michael image"
                />
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-gray-900 truncate text-sm font-medium dark:text-white">
                  Michael Gough
                </p>
                <p class="text-gray-500 dark:text-gray-400 truncate text-sm">
                  email@windster.com
                </p>
              </div>
              <div class="text-gray-900 inline-flex items-center text-base font-semibold dark:text-white">
                <img width="24" height="24" src="https://img.icons8.com/fluency/24/speech-bubble-with-dots--v1.png" alt="speech-bubble-with-dots--v1" />

              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    // </div>
  );
};

export default FriendList;
