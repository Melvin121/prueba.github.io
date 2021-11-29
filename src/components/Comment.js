import React from 'react';

const Comment = ({ info }) => {
    const { description, user } = info;

    return (
        <div className="w-full border-t my-3">
            <h1 className="mt-2 text-sm font-medium text-purple-800">
                @
                { user?.username }
            </h1>
            <p className="text-xs pl-4">{ description }</p>
        </div>
    );
};

export default Comment;