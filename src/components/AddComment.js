import React , {useState} from 'react';
import axios from 'axios';

const AddComment = ({ post, afterSubmit }) => {
    const [inputVal, setInputVal] = useState('');

    function onChange(e) {
        setInputVal(e.target.value);
    }

    async function onSubmit(e) {
        e.preventDefault();

        const body = {
            description: inputVal,
        };

        await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/comment/${post}`, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        setInputVal('');

        afterSubmit(body);
    }

    return (
        <form className="w-full" onSubmit={onSubmit}>
            <input
                value={inputVal}
                onChange={onChange}
                className="px-4 py-2 w-full rounded-2xl text-gray-800 border-2 border-blue-500 text-xs"
                type="text"
                placeholder="Presiona enter para comentar"
            />
        </form>
    );
};

export default AddComment;