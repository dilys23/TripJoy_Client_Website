import { MdClose, MdFilterList, MdOutlineSearch } from "react-icons/md";
import Button from "../../../components/Button/Button";
import CardGeneratePlan from "../../../modules/planAI/CardGeneratePlan"
function GeneratePlan() {
    return (
        <div className="min-h-screen w-full flex lg:px-10">
            <div className="w-2/5 flex flex-col gap-5 px-5">
                <div className="flex w-full gap-2">
                    <div className="w-4/5 relative bg-white h-[37px] shadow-lg rounded-lg px-2">
                        <div className="w-[37px] h-[37px] absolute top-0 left-0 flex justify-center items-center"><MdOutlineSearch className="text-[#b7b7b7] w-[25px] h-[25px]" /></div>
                        <input type="text" className="w-full h-full outline-none pl-8 pr-2" />
                    </div>
                    <Button className="bg-white w-[37px] h-[37px] rounded-lg  transition-all duration-150 text-[#b7b7b7] flex " leftIcon={<MdFilterList className="w-[25px] h-[25px] pl-1" />}></Button>
                </div>
                <div className="flex w-full flex-wrap gap-2">
                    <Button className="shadow-lg  bg-white px-3 py-2 rounded-[20px]" rightIcon={<MdClose />}>Quán ăn giá rẻ</Button>
                    <Button className="shadow-lg  bg-white px-3 py-2 rounded-[20px]" rightIcon={<MdClose />}>Những địa điểm nổi tiếng </Button>
                </div>
                <div className="flex w-full flex-col">
                    <CardGeneratePlan></CardGeneratePlan>
                </div>
            </div>
        </div>
    );
}

export default GeneratePlan;