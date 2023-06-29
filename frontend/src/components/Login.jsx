import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShareVideo from '../assets/share.mp4'
import logo from '../assets/logo.png'
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { client } from '../client';

function Login({ setUser }) {
    const navigate = useNavigate();
    useEffect(() => {
        //following comment must be included all the time
        /* global google */
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_API_TOKEN,
            callback: handleCallbackResponse
        });
        //generete auto google signin button
        google.accounts.id.renderButton(
            document.getElementById("loginButton"),
            { theme: "outline", size: "large" }
        );
        //for auto signin popup
        google.accounts.id.prompt();
    }, [])

    function handleCallbackResponse(response) {
        const userObject = jwt_decode(response.credential);
        localStorage.setItem('user', JSON.stringify(userObject));
        const { given_name, family_name, sub, picture } = userObject;
        const doc = {
            _id: sub,
            _type: 'user',
            userName: given_name + " " + family_name,
            image: picture,
        };
        console.log(doc, userObject);
        client.createIfNotExists(doc).then(() => {
            navigate('/', { replace: true });
          });

    };

    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='w-full h-full relative '>
                <video
                    src={ShareVideo}
                    autoPlay
                    controls={false}
                    loop
                    muted
                    type='video/mp4'
                    className='w-full h-full object-cover'
                />
                <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                    <div className='p-5 invert brightness-0 '>
                        <img src={logo} width={130} alt="logo" />
                    </div>
                    <div className='shadow ' id='loginButton'>
                        {/* <button className='justify-center items-center flex bg-white p-2 rounded-lg'><FcGoogle className='pr-2 text-3xl' />Sign in with Google</button> */}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;