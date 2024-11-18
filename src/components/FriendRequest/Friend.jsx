function Friend({ friend }) {
    return (
        <div className="flex flex-col gap-2 pt-2">
            <img src={friend.avatar} alt="" className="w-[80px] h-[80px] rounded-md" />
            <p className="text-[13px] text-start nunito-text font-semibold">{friend.name}</p>
        </div>
    );
}

export default Friend;