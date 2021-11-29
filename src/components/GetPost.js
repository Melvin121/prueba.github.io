import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Waiting from './Waiting';
import Post from './Post';

const GetPost = (username) => {
    const [posts, setPosts] = useState({
        status: 'LOADING',
        data: {},
    });
    const token = localStorage.getItem('token');
    console.log(token);

    useEffect(() => {
        async function getPosts() {
            const { data  } = await axios.get('https://posts-pw2021.herokuapp.com/api/v1/post/all?limit=666&page=0', {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setPosts ({status : 'Done' , data: data.data });
        }

        getPosts();
        
    }, []);

    if (posts.status === 'LOADING') return <Waiting />;
    console.log(posts);
    return (
        <div className="flex flex-wrap px-6 mt-2 justify-center items-center">
            {
                posts.data && posts.data.map((it) => 
                <Post username={username} key={it._id} struct={it} />)
            }   
        </div>
    );
};

export default GetPost;