import React, { use, useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../utils/userSlice'
import { LOGO, SUPPORTED_LANGUAGE } from '../utils/constants';
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
    const navigate = useNavigate();
    const userProfile = useSelector(store => store.user);
    const dispacth = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispacth(
                    addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL
                    })
                );
                navigate('/browse');
            } else {
                dispacth(removeUser());
                navigate('/');
            }
        });
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleSingout = () => {
        signOut(auth).then(() => {
            navigate('/');
        }).catch((error) => {
            navigate('/error');
        });
    }

    const handleGptSearchClick = () => {
        dispacth(toggleGptSearchView());
    }

    const handleLanguageChange = (e) => {
        dispacth(changeLanguage(e.target.value));
    }
    return (
        <div className='flex absolute bg-gradient-to-b from-black z-10 w-full justify-between'>
            <img
                className='w-20'
                src={LOGO}
                alt="Hotstar Logo"
            />
            {userProfile && (<div className='flex p-2'>
                <select 
                    className='bg-gray-500 py-2 px-4 mx-4 my-4 text-white rounded-xl'
                    onChange={handleLanguageChange}
                    >
                    {SUPPORTED_LANGUAGE.map(lang =>
                        <option
                            key={lang.identifier}
                            value={lang.identifier}
                            className='bg-black text-white'
                        >
                            {lang.name}
                        </option>)}
                </select>
                <button
                    className='bg-purple-500 py-2 px-4 mx-4 my-4 text-white rounded-xl'
                    onClick={handleGptSearchClick}>
                    GPT Search
                </button>
                <img
                    className='w-10 h-10 rounded-full'
                    alt="Logout icon"
                    src={userProfile?.photoURL}
                />
                <button
                    className='font-bold text-white cursor-pointer'
                    onClick={handleSingout}>
                    Sign Out
                </button>
            </div>)}
        </div>
    )
}

export default Header