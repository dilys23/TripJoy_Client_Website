import motobrike from "../../assets/images/motorbike.png";
import Mapbox from "../../components/MapCard/MapMapBox";
// import MapGenerate from "../../components/MapCard/MapGenerateOPSMcopy";
import MapGenerate from "../../components/MapCard/MapGenerateAI"; // with OPSM
// import MapGenerate from "../../components/MapCard/MapGenerateOPSM";

function DetailGeneratePlan({
  startPoint,
  endPoint,
  startDate,
  endDate,
  budget,
  transport,
  listLocation,
  listAddress,
  listLongitude,
  listLatitude,
}) {
  console.log(listLocation);
  console.log(listLongitude);
  console.log(listAddress);
  console.log(listLatitude);

  return (
    <div className="flex h-full w-full flex-col gap-4 px-3 py-3">
      <div className="px-1 text-[18px] font-bold">Gợi ý 1</div>
      {/* <img src={map} alt="" className="w-full lg:h-2/3 h-[300px] object-cover rounded-lg" /> */}
      <div>
        {/* <Mapbox
          listAddress={listAddress.filter(
            (address) => address && address.trim() !== "",
          )}
          listLongitude={listLongitude.filter((lon) => !isNaN(lon))}
          listLatitude={listLatitude.filter((lat) => !isNaN(lat))}
        /> */}
        <MapGenerate
          listAddress={listAddress.filter(
            (address) => address && address.trim() !== "",
            
          )}
          listLongitude={listLongitude.filter((lon) => !isNaN(lon))}
          listLatitude={listLatitude.filter((lat) => !isNaN(lat))}
        />
      </div>
      <div className="px-2 text-[18px] font-bold">Chi tiết</div>
      <div className="flex h-[200px] w-full items-center rounded-lg border border-[#C2BFBF] px-7 shadow-lg lg:gap-10">
        <img
          src={motobrike}
          alt=""
          className="h-[100px] w-[100px] lg:h-[170px] lg:w-[170px]"
        />
        <div className="flex flex-col gap-1 px-2 py-3 lg:w-[60%]">
          <div className="flex justify-between">
            <div className="flex flex-col justify-start">
              <span className="text-[16px] font-bold text-[#B3B3B3]">
                Bắt đầu
              </span>
              <span className="font-bold text-[#616161]">{startPoint}</span>
            </div>
            <div className="flex w-[140px] flex-col justify-start">
              <span className="text-[16px] font-bold text-[#B3B3B3]">
                Kết thúc
              </span>
              <span className="font-bold text-[#616161]">{endPoint}</span>
            </div>
          </div>
          {/* <hr className="w-[80%] mx-auto text-[#CCD0D5]" /> */}
          <div className="flex justify-between">
            <div className="flex flex-col justify-start">
              <span className="text-[16px] font-bold text-[#B3B3B3]">
                Thời gian{" "}
              </span>
              <span className="font-bold text-[#616161]">
                {startDate},{endDate}
              </span>
            </div>
            <div className="flex w-[140px] flex-col justify-end">
              <span className="text-[16px] font-bold text-[#B3B3B3]">
                Tổng quãng đường
              </span>
              <span className="font-bold text-[#616161]">{transport}</span>
            </div>
          </div>
          {/* <hr className="w-[80%] mx-auto text-[#CCD0D5]" /> */}
          <div className="flex justify-between">
            <div className="flex flex-col justify-start">
              <span className="text-[16px] font-bold text-[#B3B3B3]">
                Thành viên
              </span>
              <span className="font-bold text-[#616161]">Cá nhân</span>
            </div>
            <div className="flex w-[140px] flex-col justify-end">
              <span className="text-[16px] font-bold text-[#B3B3B3]">
                Kinh phí
              </span>
              <span className="font-bold text-[#616161]">{budget}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailGeneratePlan;
