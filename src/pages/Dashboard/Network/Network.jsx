import ava from "../../../assets/images/ava.jpg";
import * as MdIcons from "react-icons/fa";
import FriendRequest from "../../../components/FriendRequest";
import Contact from "../../../components/Contact/Contact";
import { useContext, useState } from "react";
import ModalListPost from "../../../modules/network/ModalListPost";
import { UserContext } from "../../../contexts/UserContext";
import { Avatar } from "antd";
import RecommendationPlanItem from "../../../components/RecommendationPlan";
import RecommendationAddressItem from "../../../components/RecommendationAddress";
import Post from "../../../modules/network/Posts/Post";
import anh1 from "../../../assets/images/anh1.jpg"
import anh2 from "../../../assets/images/anh2.jpg"
import anh3 from "../../../assets/images/anh3.jpg"
import anh4 from "../../../assets/images/anh4.jpg"
function Network() {
  const [showModalListPost, setShowModalListPost] = useState(false)
  const closeModal = () => {
    setShowModalListPost(false);
  };
  const { user } = useContext(UserContext)
  console.log(user);
  const listRecommendationPlan = [
    {
      id: 1,
      title: "Cù Lao Chàm",
      image: anh1,
      time: "20/12 đến 25/12",
      numberMember: 5,
    },
    {
      id: 2,
      title: "Lủng Cú",
      image: anh2,
      time: "20/12 đến 25/12",
      numberMember: 3,
    },
    {
      id: 3,
      title: "Vịnh Hạ Long",
      image: anh4,
      time: "20/12 đến 25/12",
      numberMember: 2,
    },
  ];
  const dataPost = [
    {
      avatar: ava,
      name: 'Le Nguyen',
      time: '12 tieng truoc',
      title: 'Măng Đen hôm đó nhiều mây',
      descrip: 'Măng Đen hôm đó nhiều mây. Nếu là người yêu núi yêu rừng thì Măng Đen là một nơi thật tuyệt. Và nó tuyệt với mìn thật.Măng Đen hôm đó nhiều mây. Nếu là người yêu núi yêu rừng thì Măng Đen là một nơi thật tuyệt. Và nó tuyệt với mìn thật.Nếu là người yêu núi yêu rừng thì Măng Đen là một nơi thật tuyệt. Và nó tuyệt với mìn thật.',
      image: [anh2, anh1, anh4, anh4],
      isLiked: true,
      numLikes: 100,
      numComments: 8
    }, {
      avatar: ava,
      name: 'My Thuat',
      time: '5 tieng truoc',
      title: 'Măng Đen hôm đó nhiều mây',
      descrip: 'Măng Đen hôm đó nhiều mây. Nếu là người yêu núi yêu rừng thì Măng Đen là một nơi thật tuyệt. Và nó tuyệt với mìn thật.Măng Đen hôm đó nhiều mây. Nếu là người yêu núi yêu rừng thì Măng Đen là một nơi thật tuyệt. Và nó tuyệt với mìn thật.Nếu là người yêu núi yêu rừng thì Măng Đen là một nơi thật tuyệt. Và nó tuyệt với mìn thật.',
      image: [anh1, anh2, anh3],
      isLiked: false,
      numLikes: 50,
      numComments: 8
    }
  ]
  return (
    <div className=" my-3 flex w-full md:px-3 px-2 gap-8">
      <div className="lg:w-2/12  flex-col md:flex hidden gap-5">
        <div className="bg-white h-[130px] rounded-xl p-3">
          <div className="bg-[#FEF7F7] rounded-xl h-full w-full flex flex-col p-3 gap-2">
            <div className="flex gap-3  items-center">
              <Avatar src={ava} alt="avatar" className="w-10 h-10 rounded-full"></Avatar>
              <div className="font-medium">Bach Duong</div>
            </div>
            <div className="flex gap-2 justify-around">
              <div className="flex flex-col justify-center text-center">
                <div className="text-[15px] font-medium">2.3k</div>
                <div className="text-[13px]">Bạn bè</div>
              </div>
              <div className="flex flex-col justify-center text-center">
                <div className="text-[15px] font-medium">21</div>
                <div className="text-[13px]">Bài đăng</div>
              </div>
            </div>
          </div>
        </div>
        <Contact></Contact>
      </div>
      <div className="lg:w-7/12 ">
        <div className="rounded-20 flex h-[71px] w-full items-center justify-between bg-white px-4 ">
          <div className="flex cursor-pointer items-center gap-3 w-full">
            <img
              src={ava}
              alt=""
              className="rounded-90 h-[41px] w-[42px] sm:h-[51px] sm:w-[52px]"
            />
            <span className="text-[11px] text-[#979797] sm:text-[14px]">
              Có gì mới không? Bach Duong
            </span>
          </div>
          <div
            onClick={() => setShowModalListPost(!showModalListPost)}
            className=" rounded-20 flex h-[30px] md:w-[120px] cursor-pointer items-center gap-3 border-none bg-[#FF8642] px-2">
            <MdIcons.FaLink className="text-sm text-white" />
            <span className="hidden text-white sm:block sm:text-[10px] md:text-base">
              Chia sẻ
            </span>
            {showModalListPost && <ModalListPost onClose={closeModal}></ModalListPost>}
          </div>
        </div>
        <div className="mt-6 sm:px-0 px-1">
          {dataPost.map((data, index) => (
            <Post key={index} data={data}></Post>
          ))}
        </div>
      </div>
      <div className="lg:w-3/12  flex-col md:flex hidden">
        <FriendRequest></FriendRequest>
        <span className="text-[#aeaeae] lg:text-base text-[13px] font-bold pb-3">NHÓM GỢI Ý</span>
        <div className="flex gap-3 lg:flex-row flex-col">
          {listRecommendationPlan.slice(0, 2).map((plan) => (
            <RecommendationPlanItem key={plan.id} plan={plan}></RecommendationPlanItem>
          ))}
        </div>
        <span className="text-[#aeaeae] lg:text-base text-[13px] font-bold pb-3 pt-3">ĐỊA ĐIỂM GỢI Ý</span>
        <div className="flex w-full flex-col gap-3">
          {listRecommendationPlan.map((plan) => (
            <RecommendationAddressItem key={plan.id} plan={plan}></RecommendationAddressItem>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Network;
