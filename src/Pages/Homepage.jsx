import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='mt-4 flex flex-col gap-4'>
      {/* BREADCRUMB */}
      <div className="flex gap-3">
        <Link to="/">Home</Link>
        <span>•</span>
        <span className='text-blue-800'>Blogs and Articles</span>
      </div>
      {/* INTRODUCTION */}
      {/* FEATURED POSTS */}
      {/* POST LIST */}
    </div>
  )
}

export default HomePage
