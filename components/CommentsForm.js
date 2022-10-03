import React, {useState, useEffect,useRef} from 'react'
import { ahmetComment } from '../services';

const CommentsForm = ({slug}) => {
    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const commentEl = useRef();
    const nameEl = useRef();
    const emailEl = useRef();
    const storeDataEl= useRef()
    useEffect(()=>{
        nameEl.current.value= window.localStorage.getItem('name')
        emailEl.current.value= window.localStorage.getItem('email')
    },[])
    const handleClick = () => {
        setError(false);
        const {value:comment} = commentEl.current;
        const {value:name} = nameEl.current;
        const {value:email} = emailEl.current;
        const {checked:storeData} = storeDataEl.current;
        if(!comment || !name || !email){
            setError(true)
            return;
        }
        const ahmet = {name,email,slug,comment}
        if(storeData){
            window.localStorage.setItem('name', name)
            window.localStorage.setItem('email', email)
        }else{
            window.localStorage.removeItem('name', name)
            window.localStorage.removeItem('email', email)
        }
            ahmetComment(comment).then((res)=>{
                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false)
                }, 3000);
            })
    }
    return (
        <div className='bg-white  rounded-lg p-8 pb-12 mb-8'>
            <h1 className='text-xl font-semibold mb-8 border-b pb-4'>Leave a reply</h1>
            <div className='grid grid-cols-1 gap-4 mb-4'>
                <textarea
                    ref={commentEl}  
                    className='p-4 outline-none rounded-lg w-full focus:ring-2 bg-gray-100 focus:ring-gray-200 text-gray-700'
                    placeholder='Comment'
                    name='comment'/>
            </div>
            <div className='grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2'>
                <input 
                    ref={nameEl} 
                    type='text'
                    className='py-2 px-4 outline-none rounded-lg w-full focus:ring-2 bg-gray-100 focus:ring-gray-200 text-gray-700'
                    placeholder='Name'
                    name='name'/>
                <input 
                    type="email"
                    ref={emailEl}
                    className='py-2 px-4 rounded-lg w-full outline-none bg-gray-100 focus:ring-2 focus:ring-gray-200 text-gray-700'
                    placeholder='Email'
                    name='email'/>
        </div>
            <div className='grid grid-cols-1 gap-4 mb-4'>
                <div>
                    <input ref={storeDataEl} type='checkbox' id='ahmet' name='storeData' value='true'/>
                    <label className='text-gray-500 cursor-pointer ml-2' htmlFor='ahmet'>Save my e-mail and name for the next time I comment.</label>
                </div>
            </div>
            {error && <p className='text-xs text-red-500'>All fields are required.</p>}
            <div className='mt-8'>
                <button 
                    type='button' 
                    onClick={handleClick} 
                    className='transition duration-500 ease hover:bg-green-300 inline-block bg-green-200  text-lg rounded-full px-8 py-3 cursor-pointer'>
                    Post Comment
                </button>
                {showSuccessMessage && <span className='float-right text-xl font-semibold mt-3 text-green-500'>Comment submitted for review</span>}
            </div>
        </div>
    )
    }

export default CommentsForm