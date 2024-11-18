function Photo({ photo }) {
    return (
        <div className="w-full h-[160px] relative cursor-pointer ">
            <img src={photo.image} alt="Photo" className="w-full h-full object-cover rounded-[10px]"></img>
            <div className="flex justify-between absolute left-0 w-full bottom-2 px-4">
                <span className="font-bold text-white text-[21px] nunito-text">{photo.name}</span>
                <span className="font-bold text-white text-[16px] nunito-text">+15</span>
            </div>
        </div>
    );
}

export default Photo;