import Post from "./Post";
import ava from '../../assets/images/ava.jpg'
import anh1 from "../../assets/images/anh1.jpg"
import anh2 from "../../assets/images/anh2.jpg"
import anh3 from "../../assets/images/anh3.jpg"
import anh4 from "../../assets/images/anh4.jpg"
function Posts() {
    const dataPost = [
        {
            avatar: ava,
            name: 'Le Nguyen',
            time: '12 tieng truoc',
            descrip: 'Măng Đen hôm đó nhiều mây. Nếu là người yêu núi yêu rừng thì Măng Đen là một nơi thật tuyệt. Và nó tuyệt với mìn thật.Măng Đen hôm đó nhiều mây. Nếu là người yêu núi yêu rừng thì Măng Đen là một nơi thật tuyệt. Và nó tuyệt với mìn thật.Nếu là người yêu núi yêu rừng thì Măng Đen là một nơi thật tuyệt. Và nó tuyệt với mìn thật.',
            image: [anh1, anh2, anh3, anh4, anh1, anh2, anh3],
            isLiked: true,
            numLikes: '100',
            numComments: '8'
        }, {
            avatar: ava,
            name: 'My Thuat',
            time: '5 tieng truoc',
            descrip: 'Măng Đen hôm đó nhiều mây. Nếu là người yêu núi yêu rừng thì Măng Đen là một nơi thật tuyệt. Và nó tuyệt với mìn thật.Măng Đen hôm đó nhiều mây. Nếu là người yêu núi yêu rừng thì Măng Đen là một nơi thật tuyệt. Và nó tuyệt với mìn thật.Nếu là người yêu núi yêu rừng thì Măng Đen là một nơi thật tuyệt. Và nó tuyệt với mìn thật.',
            image: [anh1, anh2, anh3],
            isLiked: false,
            numLikes: '50',
            numComments: '8'
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