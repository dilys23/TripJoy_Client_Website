import { MdCircle, MdMoreVert } from "react-icons/md";

function CardRecommendationPlan({
  isActive,
  onClick,
  suggestion,
  theme,    
  details,
}) {
  return (
    <div
      onClick={onClick}
      className={`flex w-full min-w-[360px] max-w-[360px] rounded-[15px] md:min-w-[260px] md:max-w-[240px] lg:min-w-[400px] lg:max-w-[550px] ${isActive ? "bg-[#007AFF]" : "border border-[#C2BFBF] bg-white shadow-lg"} cursor-pointer flex-col gap-2 px-3 pt-2`}
    >
      {/* Header */}
      <div className="flex w-full justify-between">
        <span
          className={`${isActive ? "text-white" : "text-black"} text-[15px] font-bold lg:text-[18px] mb-2`}
        >
          {suggestion}
        </span>
        <MdMoreVert
          className={`${isActive ? "text-white" : "text-black"} cursor-pointer`}
        />
      </div>

      {/* Progress Bar */}
      <div className="h-[10px] w-full rounded-[5px] bg-white border mb-[-10px]">
        <div className="h-full w-1/3 rounded-[5px] bg-[#6FFFC3]  "></div>
      </div>

      {/* Details Section */}
      <div className="relative flex min-h-fit flex-col gap-2 mb-3 p-5">
        {details.map((detail, index) => (
          <div
            key={index}
            className={`flex items-center ${isActive ? "text-white" : "text-black"} w-full gap-2 text-[14px] `}
          >
            <span className="inline-block  w-1/5 text-[12px] lg:w-1/6 lg:text-base mr-2">
              {detail.date || "N/A"}
            </span>
            {isActive ? (
              <MdCircle className="w-4 ml-2"/>
            ) : (
              <MdCircle className=" w-4 text-[#717171] ml-2" />
            )}
            <div className="flex w-full flex-col ml-2 mt-5 ">
              <span className="overflow-hidden text-ellipsis text-[13px] lg:text-base">
                {detail.location || "Activity not provided"}
              </span>
              <span className="overflow-hidden text-ellipsis text-[13px] lg:text-base">
                {detail.address || "No address provided"}
              </span>
            </div>
          </div>
        ))}
        <div className="absolute flex h-full w-full flex-row items-center gap-[14px]">
          <div className="inline-block w-1/5 lg:w-1/6"></div>
          <div
            className={`border-l-[1px] ${isActive ? "border-white" : "border-[#717171]"} h-[92%] border ml-2 mb-11`}
          ></div>
          <div className="w-2/3"></div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="bottom-2 right-5 flex w-full justify-end">
        <button className="flex h-[30px] w-[64px] items-center justify-center rounded-md bg-[#FF9864] mb-2 text-[12px] font-bold text-black transition-all duration-200 hover:bg-[#ea8553] lg:text-base">
          Chọn
        </button>
      </div>
    </div>
  );
}

export default CardRecommendationPlan;
