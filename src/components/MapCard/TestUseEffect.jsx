import { DivIcon } from 'leaflet';
import React, { useEffect, useState } from 'react';
// Những trường hợp dùng UserEffect 
// 1 useEffect(callback) 
// - 1. callback luôn được gọi sau khi component mounted
// - Gọi callback sau khi component thêm element vào DOM  
// 2. useEffect(callback, []) Mảng rỗng
// 3 useEffect(callback, dependencies)  // dependencies là mảng giá trị phụ thuộc vào state hoặc props
// 
// 
const TestUseEffect = () => {
    const [title, setTitle] = useState('');
    const [posts, setPosts] = useState([]);
    const tabs = ['posts', 'comments', 'albums'];
    const [type, setType] = useState('posts');
    console.log(type)
    useEffect(()=>
    {
        // console.log("Mounted", title)
        document.title = title;
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res=>res.json())
        .then(posts => {
            setPosts(posts)
            console.log('Fetch posts')
 
        }) 
        // nếu sử dụng hàm effect chỉ với callback thì nó sẽ gọi liên tục 
        // Nhưng nếu truyền depen vào thì nó chỉ gọi 1 lần duy nhất
    }, [])
    return (
        <div>
            <h1>Hello Le </h1>
            <input className='bg-black text-white' type="text" 
            value={title}
            onChange={ e=>setTitle(e.target.value)} />
            {console.log('setTitle')}

            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
            <div>
                {tabs.map(tab => (
                    <button key={tab} onClick={()=>setType(tab)}>{tab}</button>
                ))}
    
        </div>
        </div>
    );
}

export default TestUseEffect;
// Luồng làm việc nó sẽ render hết các html lên DOM và rồi in ra setTitle trước khi in ra lệnh của useEffect
// Nhưng lệnh vẫn chạy từ trước và chạy useEffect đầu tiên, rồi đến render ra giao diện rồi quay trở lại in trong effect ra
// Side effect là sửa lại những dữ liệu bên cạnh render giao diện nhưng vẫn cần render giao diện trước 