import axios from 'axios';
import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';

const CreateForm = () => {
    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const body = Object.fromEntries(formData.entries());

        if (body.title === '' || body.description === '') return alert('Llena el titulo y la descripcion');

        const res = await axios.post('https://posts-pw2021.herokuapp.com/api/v1/post/create', { title : body.title, description : body.description, image : body.image }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        console.log(res);
    }

    return (
        <form id="form" onSubmit={onSubmit} className="bg-white bg-opacity-30 mt-4 rounded-2xl p-4 text-white font-bold space-y-3">
            <div className="flex flex-col text-sm">
                <label htmlFor="title">Titulo</label>
                <input className="text-gray-800 rounded-full px-2 py-1 my-1" type="text" name="title" id="title" />
            </div>
            <div className="flex flex-col text-sm">
                <label htmlFor="description">Descripcion</label>
                <input className="text-gray-800 rounded-full px-2 py-1 my-1" type="text" name="description" id="description" />
            </div>
            <div className="flex flex-col text-sm">
                <label htmlFor="image">Imagen</label>
                <input className="text-gray-800 rounded-full px-2 py-1 my-1" type="text" name="image" id="image" />
            </div>
            <div className="flex flex-row text-sm items-center justify-center">
                <div className="flex text-sm w-1/3">
                    <label htmlFor="active">Activo</label>
                    <input
                        className="rounded-lg text-blue-500 w-5 h-5 mx-2 focus:ring-blue-400 focus:ring-opacity-25 border border-gray-300"
                        type="checkbox"
                        name="active"
                        id="active"
                    />
                </div>
                <button type="submit" className="bg-blue-500 w-2/3 rounded-2xl text-center flex py-1 justify-center items-center font-bold">
                    <CheckCircleIcon className="mr-2 h-5 w-5" />
                    Publicar
                </button>
            </div>
        </form>
    );
};

export default CreateForm;
