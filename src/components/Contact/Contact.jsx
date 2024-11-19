import ava1 from "../../assets/images/ava1.png"
import ava2 from "../../assets/images/ava2.png"
import ava from "../../assets/images/ava.jpg"
import anh1 from "../../assets/images/anh1.jpg"
import anh2 from "../../assets/images/anh2.jpg"
import ContactItem from "./ContactItem";
function Contact() {
    const contactList = [
        { ava: ava1, name: "Le Nguyen" },
        { ava: ava2, name: "Van Nguyen" },
        { ava: anh1, name: "Minh Nhat" },
        { ava: anh2, name: "Hong Son" },
        { ava: ava, name: "Hong Nhung" },
    ]
    return (
        <div className="w-full">
            <div className="text-[#aeaeae] lg:text-base text-[13px] font-bold my-3">LIÊN HỆ</div>
            <div className="w-full h-auto bg-white rounded-20 border border-[#CCD0D5]">
                {contactList.map((item, index) => (
                    <ContactItem key={index} contact={item}></ContactItem>
                ))}
            </div>
        </div>
    );
}

export default Contact;