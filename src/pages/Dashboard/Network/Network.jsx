import ava from "../../../assets/images/ava.jpg";
import * as MdIcons from "react-icons/fa";
import FriendRequest from "../../../components/FriendRequest";
import Contact from "../../../components/Contact/Contact";
import { useContext, useEffect, useRef, useState } from "react";
import ModalListPost from "../../../modules/network/ModalListPost";
import { UserContext } from "../../../contexts/UserContext";
import { Avatar, notification, Skeleton } from "antd";
import RecommendationPlanItem from "../../../components/RecommendationPlan";
import RecommendationAddressItem from "../../../components/RecommendationAddress";
import Post from "../../../modules/network/Posts/Post";
import anh1 from "../../../assets/images/anh1.jpg"
import anh2 from "../../../assets/images/anh2.jpg"
import anh3 from "../../../assets/images/anh3.jpg"
import anh4 from "../../../assets/images/anh4.jpg"
import { getPlanInvitations } from "../../../services/getPlanInvitations";
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import ModalAddPost from "../../../modules/posts/ModalAddPost";
import { deletePost, getPostHomeFeed } from "../../../services/post";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll ";
import CustomModal from "../../../components/Modal/CustomModal";
import ModalUserLikePost from "../../../components/Modal/ModalUserLikePost";
import { getPlansAvailableToJoin, viewDetailAvailablePlan } from "../../../services/joinRequest";
import ModalDetailRouting from "../../../components/Modal/ModalDetailRouting";
import AvatarDefault from "../../../components/Avatar/AvatarDefault";
function Network() {
  const [showModalListPost, setShowModalListPost] = useState(false);
  const [showModalDeletePost, setShowModalDeletePost] = useState(false);
  const [showModalUserLike, setShowModalUserLike] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [listRecommendation, setListRecommendation] = useState([]);
  const [mySelf, setMySelf] = useState({});
  const { user } = useContext(UserContext);
  // console.log(user);
  useEffect(() => {
    if (user) {
      setMySelf(user.profile);
      // console.log(user.profile)
    }
  }, [user])
  // const observerRef = useRef(null);
  // const [pageIndex, setPageIndex] = useState(0);
  // const [loading, setLoading] = useState(false);
  const [listRecommendationPlan, setListRecommendationPlan] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [showDetailPlan, setShowDetailPlan] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [budget, setBudget] = useState({});

  const fetchDataDetail = async (planId) => {
    try {
      const res = await viewDetailAvailablePlan(planId);
      console.log(res.planLocations.data);
      setDataDetail(res.planLocations.data);
      setBudget(res);
    } catch (error) {
      console.log(error);
    }
  }

  const handleShowDetailRouting = (planId) => {
    setShowDetailPlan(true);
    fetchDataDetail(planId);
  };

  const openNotificationWithIcon = (type, message, description, isHappy = false) => {
    const icon = isHappy ? (
      <SmileOutlined
        style={{
          color: '#108ee9',
        }}
      />
    ) : (
      <FrownOutlined
        style={{
          color: '#108ee9',
        }}
      />
    );
    api[type]({
      message: message || 'Thông báo',
      description: description || 'Vui lòng điền đủ thông tin.',
      icon: icon,
    });
  };


  const closeModal = () => {
    setShowModalListPost(false);
  };

  const fetchInvitation = async () => {
    try {
      const data = await getPlanInvitations(0, 3);
      setListRecommendationPlan(data.planInvitations.data);
    }
    catch (error) {
      console.log(error);
    }
  }
  const fetchPlanAvailable = async () => {
    try {
      const response = await getPlansAvailableToJoin(0, 5);
      return response.plans.data;
      // console.log(data.plans.data);
    }
    catch (error) {
      console.log(error);
      return [];
    }
  }
  useEffect(() => {
    fetchInvitation();
    fetchPlanAvailable();
  }, [])
  const refreshInvitations = async () => {
    await fetchInvitation();
  }
  const fetchPostHome = async (pageIndex, pageSize) => {
    try {
      const response = await getPostHomeFeed(pageIndex, pageSize);
      return response.posts.data;

    } catch (error) {
      console.log(error);
    }
  };
  const {
    dataList: posts,
    loading: loadingPosts,
    hasMore: hasMorePosts,
    observerRef: observerRefPosts,
    setDataList: setPostsDataList,
    refreshData: refreshPosts
  } = useInfiniteScroll(fetchPostHome);

  const {
    dataList: plans,
    loading: loadingPlans,
    hasMore: hasMorePlans,
    observerRef: observerRefPlans,
    setDataList: setPlansDataList,
    refreshData: refreshPlans
  } = useInfiniteScroll(fetchPlanAvailable);


  const handleRefreshData = () => {
    refreshPosts();
  };

  const handleDeletePost = async (postId) => {
    try {
      const res = await deletePost(postId);
      setPostsDataList(posts.filter(post => post.postId !== postId));
      setShowModalDeletePost(false);
    } catch (error) {
      console.log(error)
    }

  };

  const handleOpenModal = (postId) => {
    setPostIdToDelete(postId);
    setShowModalDeletePost(true);
  };
  const handleOpenUserLike = (postId) => {
    setPostIdToDelete(postId);
    setShowModalUserLike(true);
  }


  // const 
  // const listRecommendation = [
  //   {
  //     id: 1,
  //     title: "Cù Lao Chàm",
  //     image: anh1,
  //     time: "20/12 đến 25/12",
  //     numberMember: 5,
  //   },
  //   {
  //     id: 2,
  //     title: "Lủng Cú",
  //     image: anh2,
  //     time: "20/12 đến 25/12",
  //     numberMember: 3,
  //   },
  //   {
  //     id: 3,
  //     title: "Vịnh Hạ Long",
  //     image: anh4,
  //     time: "20/12 đến 25/12",
  //     numberMember: 2,
  //   },
  // ];

  return (
    <div className=" my-3 flex w-full md:px-3 px-2">
      <div className="lg:w-1/5 w-2/12 flex-col md:flex hidden gap-5 fixed lg:left-12 left-2 top-[80px] h-full lg:p-3 p-1">
        <div className="bg-white h-fit rounded-xl p-3 border border-[#CCD0D5]">
          <div className="bg-[#FEF7F7] rounded-xl h-full w-full flex flex-col lg:p-3 p-1 gap-2">
            <div className="flex lg:gap-3 gap-1  items-center">
              <AvatarDefault src={mySelf.avatar?.url} alt="avatar" className="lg:w-10 lg:h-10 w-5 h-5 rounded-full"></AvatarDefault>
              <div className="font-medium lg:text-[16px] text-[13px]">{mySelf.userName}</div>
            </div>
            <div className="flex gap-2 justify-around">
              <div className="flex flex-col justify-center text-center">
                <div className="lg:text-[15px] text-[12px] font-medium">2.3k</div>
                <div className="lg:text-[13px] text-[10px]">Bạn bè</div>
              </div>
              <div className="flex flex-col justify-center text-center">
                <div className="lg:text-[15px] text-[12px] font-medium">21</div>
                <div className="lg:text-[13px] text-[10px]">Bài đăng</div>
              </div>
            </div>
          </div>
        </div>
        <Contact></Contact>
      </div>
      <div className="md:w-7/12  lg:ml-[calc(22%)] lg:mr-[calc(22%)] md:ml-[calc(20%)] md:mr-[calc(20%)] w-full lg:px-16 ">
        <div className="rounded-20 flex h-[71px] w-full items-center justify-between bg-white px-4  border border-[#CCD0D5]">
          <div className="flex cursor-pointer items-center gap-3 w-full">
            <AvatarDefault
              src={mySelf.avatar?.url}
              alt=""
              className="rounded-90 h-[41px] w-[42px] sm:h-[51px] sm:w-[52px]"
            />
            <span className="text-[11px] text-[#979797] sm:text-[14px]">
              Có gì mới không? {mySelf.userName}
            </span>
          </div>
          <div
            onClick={() => setShowModalListPost(!showModalListPost)}
            className=" rounded-20 flex h-[30px] md:w-[120px] cursor-pointer items-center gap-3 border-none bg-[#FF8642] px-2">
            <MdIcons.FaLink className="text-sm text-white" />
            <span className="hidden text-white sm:block sm:text-[10px] md:text-base">
              Chia sẻ
            </span>
            {showModalListPost && <ModalAddPost handleClose={closeModal} onRefresh={handleRefreshData} openNotificationWithIcon={openNotificationWithIcon}></ModalAddPost>}
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:px-0 px-1 w-full">
          {posts.map((data) => (
            <Post key={data.postId} data={data} onDelete={handleOpenModal} onShowUserLike={handleOpenUserLike} mySelf={mySelf} />
          ))}
          <div ref={observerRefPosts} style={{ height: '20px' }}>
            {loadingPosts &&
              <>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
              </>}
            {/* {!hasMore && <p>Đã hết dữ liệu</p>} */}
          </div>
        </div>

      </div>
      <div className="lg:w-1/5 w-2/12  flex-col md:flex hidden fixed top-[80px] lg:right-12 right-2 h-screen lg:p-3 py-3 overflow-y-auto custom-scrollbar pb-[200px]">
        <FriendRequest></FriendRequest>
        {listRecommendationPlan.length > 0 &&
          <>
            <span className="text-[#aeaeae] lg:text-base text-[13px] font-bold pb-3">NHÓM GỢI Ý</span>
            <div className="flex gap-3 lg:flex-row flex-col justify-start ">
              {listRecommendationPlan.slice(0, 1).map((plan) => (
                <RecommendationPlanItem key={plan.planId} plan={plan} onSuccess={refreshInvitations} openNotificationWithIcon={openNotificationWithIcon}></RecommendationPlanItem>
              ))}
            </div>
          </>
        }
        <span className="text-[#aeaeae] lg:text-base text-[13px] font-bold pb-3 pt-3">ĐỊA ĐIỂM GỢI Ý</span>
        <div className="flex w-full flex-col gap-3 pb-16">
          {plans.map((plan) => (
            <RecommendationAddressItem
              mySelf={mySelf}
              key={plan.id}
              plan={plan}
              handleShowDetailRouting={handleShowDetailRouting}
            ></RecommendationAddressItem>
          ))}
        </div>
      </div>
      {showDetailPlan && <ModalDetailRouting routing={dataDetail} handleClose={() => setShowDetailPlan(false)} data={budget} />}
      {/* {showDetailPlan && <ModalDetailRouting routing={{ planLocation: dataDetail }} />} */}
      {showModalUserLike &&
        (
          <ModalUserLikePost handleClose={() => setShowModalUserLike(false)} postId={postIdToDelete}></ModalUserLikePost>
        )}
      {showModalDeletePost && (
        <CustomModal
          title="Xác Nhận Xóa"
          content="Bạn có chắc chắn muốn xóa bài viết này không?"
          open={showModalDeletePost}
          onOk={() => handleDeletePost(postIdToDelete)}
          onCancel={() => setShowModalDeletePost(false)}
          okText="Xác nhận"
          cancelText="Huỷ"
        />
      )}
      {contextHolder}
    </div>
  );
}

export default Network;
