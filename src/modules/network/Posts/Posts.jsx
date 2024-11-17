import Post from "./Post";
import ava from '../../../assets/images/ava.jpg'
import anh1 from "../../../assets/images/anh1.jpg"
import anh2 from "../../../assets/images/anh2.jpg"
import anh3 from "../../../assets/images/anh3.jpg"
import anh4 from "../../../assets/images/anh4.jpg"
function Posts() {
  
    return (
        <div className="mt-6 sm:px-0 px-1">
            {dataPost.map((data, index) => (
                <Post key={index} data={data}></Post>
            ))}
        </div>
    );
}

export default Posts;