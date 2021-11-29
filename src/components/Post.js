import shortid from 'shortid';
import axios from 'axios';
import React, { useState } from 'react';
import { ThumbUpIcon, ChatAlt2Icon } from '@heroicons/react/solid';
import Comment from './Comment';
import AddComment from './AddComment';

const Post = ({ username, struct }) => {
    const {
        _id, title, description, image, user, createdAt, likes, comments,
    } = struct;

    const [showComments, setShowComments] = useState(false);
    const [commentState, setCommentState] = useState(comments);
    const [liked, setLiked] = useState(likes.some((it) => it.username === username));
    const [likesCount, setLikesCount] = useState(likes.length);

    function addComment(comment) {
        const val = [...commentState, { ...comment, user: { username } }];

        setCommentState(val);
    }

    async function likePost() {
        try {
            const { data } = axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/like/${_id}`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });


            if (!liked) {
                setLikesCount(likesCount + 1);
                setLiked(true);
            } else {
                setLikesCount(likesCount - 1);
                setLiked(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function HidePost() {
        try {
            const { data } = axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/toggle/${_id}`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });


           console.log(data);
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="flex flex-col space-evenly rounded-2xl w-min p-4 text-white my-4 justify-evenly">
            <div className="w-full flex flex-col font-bold text-white overflow-x-auto justify-evenly">
                <h1 className="w-1/2">
                    @
                    {user?.username}
                </h1>
                <h2 className="text-right w-1/2">{ new Date(createdAt).toLocaleDateString() }</h2>
            </div>
            {
                image && <img className="w-full h-40 object-cover my-2 rounded-2xl" src={image} alt="No se pudo cargar la imagen" />
            }
            <div className="flex flex-col justify-evenly">
                <button>Editar</button>
                <button onClick={HidePost}>Ocultar</button>
            </div>
            <div className="w-full flex flex-col font-medium text-sm space-y-2, overflow-x-auto overflow-y-auto">
                <h1 className="">{ title }</h1>
                <h2 className="font-normal text-xs">{ description }</h2>
            </div>
            <div className="w-full mt-4 flex justify-center">
                <button
                    onClick={likePost}
                    type="button"
                    className={`flex space-x-2 text-xs justify-center items-center w-1/2 ${liked && 'text-purple-800'}`}
                >
                    <span><ThumbUpIcon className="mr-2 w-5 h-5 mx-0" /></span>
                    { likesCount }
                </button>
                <button
                    onClick={() => setShowComments(!showComments)}
                    type="button"
                    className={`flex space-x-2 text-xs justify-center items-center w-1/2 ${showComments && 'text-purple-800'}`}
                >
                    <span><ChatAlt2Icon className="mr-2 w-5 h-5 mx-0" /></span>
                    { commentState.length }
                </button>
            </div>
            <div className={`${!showComments && 'hidden'} mt-4 w-full flex flex-col items-start`}>
                {
                    comments && commentState.map((it) => (
                        <Comment
                            key={shortid.generate()}
                            info={it}
                        />
                    ))
                }
                <AddComment post={_id} afterSubmit={addComment} />
            </div>
        </div>
    );
};

export default Post;