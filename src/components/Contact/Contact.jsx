import ContactItem from "./ContactItem";
import { useEffect, useState } from "react"
import { getMyFriend } from "../../services/friend"
function Contact() {
    const [listMyFriend, setListMyFriend] = useState([]);
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const listFriend = await getMyFriend();
                setListMyFriend(listFriend.users.data);
            } catch (error) {
                console.log('Error while getting my friend request:', error);
            }
        };

        fetchFriends();
    }, []);

    return (
        <div className="w-full">
            <div className="text-[#aeaeae] lg:text-base text-[12px] font-bold my-3">LIÊN HỆ</div>
            <div className="w-full h-auto bg-white rounded-20 border border-[#CCD0D5] min-h-[200px]">
                {listMyFriend.map((item, index) => (
                    <ContactItem key={index} contact={item}></ContactItem>
                ))}
            </div>
        </div>
    );
}

export default Contact;