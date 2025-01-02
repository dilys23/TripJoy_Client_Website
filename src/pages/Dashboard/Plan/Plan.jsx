import { FaSearch } from "react-icons/fa";
import PlanCard from "../../../modules/trips/PlanCard";
import { Link } from "react-router-dom";
import config from "../../../config";
import RecommendationPlanItem from "../../../components/RecommendationPlan";
import anh1 from "../../../assets/images/anh1.jpg"
import anh2 from "../../../assets/images/anh2.jpg"
import anh3 from "../../../assets/images/anh3.jpg"
import anh4 from "../../../assets/images/anh4.jpg"
import AddPlan from "../../../modules/plan/AddPlan";
import { MdFilterAlt } from "react-icons/md";
import { DatePicker, Dropdown, Skeleton } from 'antd';
import { useEffect, useState } from "react";
import { getMyPlanRequest, searchMyPlanByTitleRequest } from "../../../services/plan";
import useDebounce from "../../../hooks/useDebounce";
import dayjs from "dayjs";
function Plan() {
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#">
          Tất cả
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#">
          Đang diễn ra
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#">
          Đã diễn ra
        </a>
      ),
    },
  ];

  const [loading, setLoading] = useState(false);
  const [listMyPlan, setListMyPlan] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 200);
  const [isPlanAdded, setIsPlanAdded] = useState(false);
  const [dateSelect, setDateSelect] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // const {user} = useCon
  // Lắng nghe sự thay đổi kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const fetchPlans = async () => {
    try {
      setLoading(true);
      const data = await getMyPlanRequest(0, 10);
      setListMyPlan(data.plans.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchPlans();
  }, [])


  const handleChange = (e) => {
    const searchInput = e.target.value;
    if (!searchInput.startsWith(' ')) {
      setSearchValue(searchInput);
    }
  };
  const fetchFilteredPlans = async () => {
    try {
      setLoading(true);
      if (!debouncedValue.trim() && !dateSelect) {
        await fetchPlans();
      } else {
        if (dateSelect) {
          const data = await searchMyPlanByTitleRequest(0, 10, debouncedValue, dateSelect);
          setListMyPlan(data.plans.data);
        }
        else {
          const data = await searchMyPlanByTitleRequest(0, 10, debouncedValue, dateSelect);
          setListMyPlan(data.plans.data);
        }

      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFilteredPlans();
  }, [debouncedValue, dateSelect]);


  useEffect(() => {
    fetchPlans();
  }, [isPlanAdded]);



  return (
    <div className="my-1 flex w-full flex-col lg:px-10 md:px-5 sm:px-3 px-3">
      <div className="flex h-[75px] w-full items-center justify-between rounded-[7px] border-[0.4px] border-[#CCD0D5] bg-white md:px-4 px-2 py-2 shadow-md">
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="nunito-text lg:text-[25px] font-semibold">
              Hora, Dilysnguyen
            </div>
          </div>
          <div className="md:text-[13px] text-[10px]">
            Hãy bắt đầu chuyến đi mới đầy thú vị nhé !
          </div>
        </div>
        <div className="flex cursor-pointer items-center gap-1 lg:pr-5">
          <Link
            to={config.routes.planAI}
            className="lg:text-[16px] md:text-[13px] text-[10px] font-bold text-[#0023FE] flex items-center"
          >
            Tạo chuyến đi mới với AI<img width="30" height="30" src="https://img.icons8.com/plasticine/100/light-on.png" alt="light-on" className="w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]" />
          </Link>
        </div>
      </div>
      <div className="mt-8 flex h-full w-full lg:gap-16 md:gap-10 sm:gap-6">
        <div className="sm:w-3/5 w-full">
          <div className="mb-5 flex md:h-[42px] w-full sm:gap-3 gap-3 sm:justify-normal justify-end sm:flex-row flex-col" >
            <div className="flex w-full gap-1 md:h-[42px] h-[30px]">
              <input
                value={searchValue}
                onChange={(e) => handleChange(e)}
                type="search"
                placeholder="Tìm kiếm chuyến đi"
                className="h-full w-4/6 lg:py-3 py-2 rounded-md border-[0.4px] border-[#CCD0D5] bg-white px-3 md:text-[14px] text-[10px] shadow-md outline-none"
              ></input>
              <DatePicker
                format="DD-MM-YYYY"
                value={dateSelect ? dayjs(dateSelect, "YYYY-MM-DD") : null}
                onChange={(date, dateString) => {
                  // Lưu ngày dưới định dạng YYYY-MM-DD cho API
                  setDateSelect(date ? date.format("YYYY-MM-DD") : null);
                }}
              />

              <div className="h-full w-1/6">
                <Dropdown menu={{ items }} placement="bottom">
                  <button
                    className="h-full w-full flex items-center justify-center rounded-md bg-[#007AFF] shadow-md text-white md:text-[14px] text-[10px]">
                    <MdFilterAlt className="md:text-[20px] text-white" />
                    Bộ lọc
                  </button>
                </Dropdown>
              </div>
            </div>
            <div className="sm:hidden flex w-full justify-end ">
              <button
                onClick={() => setIsModalOpen(true)}
                className="sm:hidden w-1/4 h-[30px] flex border border-[#ff7124fc] text-[10px] text-[#ff7124fc] bg-white rounded-md hover:bg-[#ff7124fc] hover:text-white duration-200 font-bold items-center justify-center"
              >
                Lên kế hoạch
              </button>
            </div>

          </div>
          {loading ? (
            <div className="w-full flex flex-col gap-2">
              <Skeleton active />
              <Skeleton active />
            </div>

          ) : (
            <div className="flex flex-col gap-5">
              {listMyPlan.map((plan, index) => (
                <PlanCard key={plan.id} plan={plan} mapId={index}></PlanCard>
              ))}
            </div>
          )}
        </div>
        <div className="sm:w-2/5 sm:flex hidden flex-col gap-1">
          <AddPlan onAddSuccess={() => setIsPlanAdded((prev) => !prev)} />
        </div>

        {isMobile && isModalOpen && (
          <div className="modalAddPlan">
            <AddPlan
              onAddSuccess={() => {
                setIsPlanAdded((prev) => !prev);
                setIsModalOpen(false); // Đóng modal sau khi thêm kế hoạch thành công
              }}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        )}
        {/* <div className=" flex-col gap-1 sm:w-2/5 sm:flex hidden">

          <AddPlan onAddSuccess={() => setIsPlanAdded((prev) => !prev)} />

        </div>
        {
          isModalOpen &&
          <div className="modalAddPlan sm:hidden">
            <AddPlan
              onAddSuccess={() => {
                setIsPlanAdded((prev) => !prev);
                setIsModalOpen(false); // Đóng modal sau khi thêm kế hoạch thành công
              }}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        } */}
      </div>
    </div>
  );
}

export default Plan;
