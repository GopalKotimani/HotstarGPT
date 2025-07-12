import React, { use, useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../utils/userSlice'
import { LOGO } from '../utils/constants';

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
    return (
        <div className='flex absolute bg-gradient-to-b from-black z-10 w-full justify-between'>
            <img
                className='w-20'
                src={LOGO}
                alt="Hotstar Logo"
            />
            {userProfile && (<div className='flex p-2'>
                <img
                    className='w-10 h-10 rounded-full'
                    alt="Logout icon"
                    src={userProfile?.photoURL}
                />
                <button className='font-bold text-white cursor-pointer' onClick={handleSingout}>Sign Out</button>
            </div>)}
        </div>
    )
}

export default Header