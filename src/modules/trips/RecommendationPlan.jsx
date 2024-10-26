function RecommendationPlan({ plan }) {
    return (
        <div className="w-full flex h-[80px] bg-[#CEF4FC] border border-[#87DDEE] rounded-[5px] justify-between px-4 py-1">
            <div className="flex flex-col gap-1 justify-center">
                <span className="text-[20px] font-normal leading-6">{plan.title}</span>
                <span className="text-[10px] font-normal text-[#AEAEAE]">{plan.time}</span>
                {!plan.state && <span className="text-[14px] font-bold text-[#13C892] leading-4">Đang diễn ra</span>}
            </div>
            <div className="flex ">
                <button className="outline-none border-none text-[#007AFF] text-[11px] font-bold leading-3">Tham gia</button>
            </div>
        </div>

    );
}

export default RecommendationPlan;