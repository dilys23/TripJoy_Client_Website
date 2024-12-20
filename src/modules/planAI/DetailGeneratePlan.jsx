import motobrike from "../../assets/images/motorbike.png";
import Mapbox from "../../components/MapCard/MapMapBox";
// import MapGenerate from "../../components/MapCard/MapGenerateOPSMcopy";
import MapGenerate from "../../components/MapCard/MapOPSMLeftlet"; // with OPSM
// import MapGenerate from "../../components/MapCard/MapGenerateOPSM";
import axios from "axios";

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
  totalDistance,
}) {
  console.log(listLocation);
  console.log(listLongitude);
  console.log(listAddress);
  console.log(listLatitude);
  console.log("totalDistance", totalDistance);
  // Lọc các điểm hợp lệ
  const waypoints = listLongitude
    .map((lon, index) => ({
      lat: listLatitude[index],
      lng: lon,
    }))
    .filter((point) => {
      return (
        point.lat >= 8.179 &&
        point.lat <= 23.393 &&
        point.lng >= 102.144 &&
        point.lng <= 109.465
      );
    });

  console.log("Filtered waypoints:", waypoints);

  // // Nếu không có điểm hợp lệ, thoát hàm
  // if (waypoints.length === 0) {
  //   console.error("No valid waypoints found!");
  //   return;
  // }

  // // Chuyển đổi danh sách tọa độ thành chuỗi cho API
  // const originsArray = waypoints.map((point) => `${point.lat},${point.lng}`);

  // const destination = originsArray.pop();

  // const origins = originsArray.join("|");

  // // const destination = `${endPoint.lat},${endPoint.lng}`; // Điểm đích
  // console.log("origins", origins);
  // console.log("destination", destination);
  // const apiKey =
  //   "IqFkHRqG13QDEixJDZ3soQtbsaWyKZPjNipXSxLl0BqhPCo51CBQMFhRagkgEkoi"; // Thay bằng key API của bạn

  // const apiUrl = `https://api-v2.distancematrix.ai/maps/api/distancematrix/json?origins=${origins}&destinations=${destination}&key=${apiKey}`;
  // console.log("Generated API URL:", apiUrl);

  // // Gửi yêu cầu đến API
  // try {
  //   const response = await axios.get(apiUrl, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   });
  //   const data = await response.json();

  //   // Tính tổng quãng đường
  //   if (data.status === "OK") {
  //     let totalDistance = 0;
  //     data.rows.forEach((row) => {
  //       const element = row.elements[0];
  //       if (element.status === "OK") {
  //         totalDistance += element.distance.value; // Lấy khoảng cách (mét)
  //       }
  //     });
  //     console.log("Tổng quãng đường (m):", totalDistance);
  //     console.log("Tổng quãng đường (km):", totalDistance / 1000);
  //   } else {
  //     console.error("API error:", data.status);
  //   }
  // } catch (error) {
  //   console.error("Error fetching API:", error);
  // }

  return (
    <div className="flex h-full w-full flex-col gap-3 px-3 py-3">
      <div className="px-1 text-[18px] font-bold">Lộ trình</div>
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
      <div className="px-1 text-[18px] font-bold">Chi tiết</div>
      <div className="flex h-[250px] w-full items-center rounded-lg border border-[#C2BFBF] px-7 shadow-lg lg:gap-14">
        <img
          src={motobrike}
          alt=""
          className="h-[100px] w-[100px] lg:h-[170px] lg:w-[170px] ml-5"
        />
        <div className="flex flex-col px-2 py-3 lg:w-[60%]">
          <div className="flex justify-between">
            <div className="flex flex-col justify-start">
              <span className="text-[20px] font-bold text-[#B3B3B3]">
                Bắt đầu
              </span>
              <span className="font-bold text-[19px] text-[#616161]">{startPoint}</span>
            </div>
            <div className="flex w-[200px] flex-col justify-start">
              <span className="text-[20px] font-bold text-[#B3B3B3]">
                Kết thúc
              </span>
              <span className="font-bold text-[19px] text-[#616161]">{endPoint}</span>
            </div>
          </div>
          {/* <hr className="w-[80%] mx-auto text-[#CCD0D5]" /> */}
          <div className="flex justify-between mt-4">
            <div className="flex flex-col justify-start">
              <span className="text-[20px] font-bold text-[#B3B3B3]">
                Thời gian
              </span>
              <span className="font-bold text-[19px] text-[#616161]">
                {startDate} đến {endDate}
              </span>
            </div>
            <div className="flex w-[200px] flex-col justify-end">
              <span className="text-[20px] font-bold text-[#B3B3B3]">
                Tổng quãng đường 
              </span>

              <span className="font-bold text-[19px] text-[#616161]">{totalDistance} km</span>
            </div>
          </div>
          {/* <hr className="w-[80%] mx-auto text-[#CCD0D5]" /> */}
          <div className="flex justify-between mt-4">
            <div className="flex flex-col justify-start">
              <span className="text-[20px] font-bold text-[#B3B3B3]">
                Thành viên
              </span>
              <span className="font-bold text-[19px] text-[#616161]">Cá nhân</span>
            </div>
            <div className="flex w-[200px] flex-col justify-end">
              <span className="text-[20px] font-bold text-[#B3B3B3]">
                Kinh phí
              </span>
              <span className="font-bold text-[19px] text-[#616161]">{budget}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailGeneratePlan;
