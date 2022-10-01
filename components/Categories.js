import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { getCategories } from '../services'

const Categories = () => {
    const [categories, setCategories] = useState([])
    useEffect(()=>{
        getCategories().then((newCategories)=>setCategories(newCategories))
    },[])
    return (
        <div className='bg-white p-8 mb-8 shadow-lg rounded-lg'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                Categories
            </h3>
            {categories.map((category)=>(
                <Link key={category.slug} href={`/category/${category.slug}`}>
                    <span className='cursor-pointer block mb-3 pb-3'>
                        {category.name}
                    </span>
                </Link>
            ))}
        </div>
    )
    }

export default Categories