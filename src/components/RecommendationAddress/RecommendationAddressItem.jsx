function RecommendationAddressItem({ plan }) {
    return (
        <div className="w-full h-auto py-2 flex gap-3 lg:flex-row flex-col">
            <img src={plan.image} alt="" className="w-[84px] h-[84px] rounded-[7px] object-cover" />
            <div className="flex flex-col">
                <span className="font-bold text-[18px]">{plan.title}</span>
                <span className="text-[14px]">Chia sẻ và cùng lập kế hoạch với bạn đồng hành</span>
                <a href="#" className="text-[13px] text-[#0354AD] font-semibold italic">Xem chi tiết</a>
            </div>
        </div>
    );
}

export default RecommendationAddressItem;