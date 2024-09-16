import Post from "./Post";
import ava from '../../images/ava.jpg'
import anh1 from "../../images/anh1.jpg"
import anh2 from "../../images/anh2.jpg"
function Posts() {
    const dataPost = [
        {
            avatar: ava,
            name: 'Le Nguyen',
            time: '12 tieng truoc',
            descrip: 'Măng Đen hôm đó nhiều mây. Nếu là người yêu núi yêu rừng thì Măng Đen là một nơi thật tuyệt. Và nó tuyệt với mìn thật.',
            image: [anh1, anh2]
        }
    ]
    return (
        <div className="mt-6">
            {dataPost.map((data, index) => (
                <Post key={index} data={data}></Post>
            ))}
        </div>
    );
}

export default Posts;