import { get } from 'http'
import moment from 'moment'
import React from 'react'
import {getPostDetails} from '../services'
const PostDetail = ({post}) => {
    // console.log('11',post);
    const getContentFragment = (index,text,obj,type)=>{
        let modifiedText = text;
        if(obj) {
            if(obj.bold){
                modifiedText= (<b key={index}>{text}</b>)
            }
            if(obj.italic){
                modifiedText = (<em key={index}>{text}</em>)
            }
            if(obj.underline){
                modifiedText = (<u key={index}>{text}</u>)
            }
        }
        switch (type) {
            case 'heading-three':
                return <h3 key={index} className='text-xl font-semibold mb-4'>{modifiedText.map((item,i)=><React.Fragment key={i}>{item}</React.Fragment>)}</h3>
            case 'paragraph':
                return <p key={index} className='mb-8'>{modifiedText.map((item,i)=><React.Fragment key={i}>{item}</React.Fragment>)}</p>
            case 'heading-four':
                return <h4 key={index} className='text-md font-semibold mb-4'>{modifiedText.map((item,i)=><React.Fragment key={i}>{item}</React.Fragment>)}</h4>
            case 'image' :
                return(
                    <img src={obj.src} alt={obj.title} key={index} height={obj.height} width={obj.width}/>
                );
            default :
                    return modifiedText;
            }
    }
    return (
        
        <div className='bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8'>
            <div className='overflow-hidden relative shadow-md mb-6'>
                <img
                src={post.featuredImage.url}
                alt={post.title} 
                className='object-top h-full w-full rounded-t-lg'/>
            </div>
            <div className='px-4 lg:px-0'>
                <div className='flex items-center mb-8 w-full'>
                <div className='flex items-center mb-4 w-full lg:mb-0 lg:w-auto mr-8'>
                    <img 
                        alt={post.author.name}
                        height='30px'
                        width='30px'
                        className='align-middle rounded-full'
                        src={post.author.photo.url}
                    />
                    <p className='inline align-middle ml-2 text-gray-700 w-full text-lg'>
                        {post.author.name}
                    </p>
                </div>
                <div className='font-medium text-gray-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>
                        {post.createdAt ? moment(post.createdAt).format('MMM DD, YYYY') : ''}
                    </span>
                </div>
            </div>
                    <h1 className='mb-8 font-semibold text-3xl'>{post.title}</h1>
                    {/* {console.log(post.content.raw)} */}
                    {post.content.raw.children.map((typeObj,index)=>{
                        const children = typeObj.children.map((item, itemIndex)=>getContentFragment(itemIndex, item.text, item))
                        return getContentFragment(index, children, typeObj, typeObj.type)
                    })}
            </div>
        </div>
    )
    }

export default PostDetail