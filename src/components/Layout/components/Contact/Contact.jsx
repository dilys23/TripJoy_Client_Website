import ava1 from "../../../../images/ava1.png"
import ava2 from "../../../../images/ava2.png"
import ContactItem from "./ContactItem";
function Contact() {
    const contactList = [
        { ava: ava1, name: "Le Nguyen" },
        { ava: ava2, name: "Van Nguyen" },
        { ava: ava1, name: "Minh Nhat" },
        { ava: ava2, name: "Hong Son" },
        { ava: ava1, name: "Hong Nhung" },
    ]
    return (
        <div className="w-full">
            <div className="text-[#aeaeae] md:text-base text-[13px] font-bold my-3">LIÊN HỆ</div>
            <div className="w-full h-[582px] bg-white rounded-20">
                {contactList.map((item, index) => (
                    <ContactItem key={index} contact={item}></ContactItem>
                ))}
            </div>
        </div>
    );
}

export default Contact;