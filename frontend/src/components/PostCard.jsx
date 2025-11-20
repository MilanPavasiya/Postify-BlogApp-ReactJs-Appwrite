import React from 'react';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
	return (
		<Link to={`/post/${$id}`} className='block group'>
			<div className='w-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-gray-300'>
				<div className='w-full aspect-video overflow-hidden bg-gray-100'>
					<img
						src={featuredImage}
						alt={title}
						className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
					/>
				</div>
				<div className='p-6'>
					<h2 className='text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200'>
						{title}
					</h2>
				</div>
			</div>
		</Link>
	);
}

export default PostCard;
