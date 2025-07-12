import React from 'react'
import { BACKGROUND_IMAGE } from '../utils/constants'
import lang from '../utils/langConstants'
import { useSelector } from 'react-redux'

const GptSearchBar = () => {

    const langKey = useSelector(store => store.config.lang);

    return (<div>
        <div className='absolute -z-10'>
            <img
                src={BACKGROUND_IMAGE}
                alt="Browse Background"
            />
        </div>
        <div className='pt-[10%] flex justify-center'>
            <form className='bg-black w-1/2 grid grid-cols-12'>
                <input type='text'
                    className='p-4 m-4 bg-white col-span-9'
                    placeholder={lang[langKey].searchPlaceHolder}
                />
                <button className='py-2 px-4 bg-red-700 text-white rounded-lg col-span-3 m-4'>{lang[langKey].search}</button>
            </form>
        </div>
    </div>
    )
}

export default GptSearchBar