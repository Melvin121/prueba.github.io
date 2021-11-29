import axios from 'axios';
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import GetPost from "../components/GetPost";
import Navbar from '../components/Navbar';


const User = () => {
    const [whoami, setWhoami] = useState();

    const navigate = useNavigate();
    const user = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    useEffect(() => {
        async function getIdentity() {
            const { data } = await axios.get('https://posts-pw2021.herokuapp.com/api/v1/auth/whoami', {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });
            
            setWhoami(data.username);
        }

        if (user == null) {
            navigate('/login');
            return;
        }

        getIdentity();
    }, []);

    return(
        <div >
            {   
             role === 'admin' && (
             <Navbar />
             )
            }
            <GetPost username={whoami}/>
        </div>
    
    );
};

export default User;