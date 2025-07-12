import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { PHOTO_URL, BACKGROUND_IMAGE } from '../utils/constants';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();
  const dispath = useDispatch();

  const handleButtonClick = () => {
    const errMessage = checkValidData(email.current.value, password.current.value);

    // if (errMessage) return;
    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: PHOTO_URL
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispath(addUser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL
            }
            ));
          }).catch((error) => {
            navigate('/error');
          });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
        });

    }
  }
  const toggleSignInform = () => {
    setIsSignInForm(!isSignInForm);
  }
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img
          src={BACKGROUND_IMAGE}
          alt="Browse Background"
        />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className='p-12 bg-black text-white w-3/12 my-36 mx-auto right-0 left-0 absolute rounded-lg opacity-60'>
        <p className='text-red-500'>{errMessage}</p>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In " : "Sign Up"}</h1>
        {!isSignInForm &&
          <input type='text' ref={name} placeholder='Full Name' className='p-2 my-4 w-full bg-gray-500 rounded-lg' />}
        <input type='text' ref={email} placeholder='Email address' className='p-2 my-4 w-full bg-gray-500 rounded-lg' />
        <input type='password' ref={password} placeholder='Password' className='p-2 my-4 w-full bg-gray-500 rounded-lg' />
        <button className='p-4 my-4 bg-red-700 w-full'
          onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInform}>
          {isSignInForm ? "New to Hotstar? Sign Up now" : "Already have an account? Sign In"}
        </p>
      </form>
    </div>
  )
}

export default Login