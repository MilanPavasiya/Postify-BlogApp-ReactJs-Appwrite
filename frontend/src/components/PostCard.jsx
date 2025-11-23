import React from 'react';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
	return (
		<Link to={`/post/${$id}`} className='block group animate-fade-in-up'>
			<div className='w-full bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:border-purple-300 transform hover:-translate-y-2 relative'>
				<div className='absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 z-10 pointer-events-none'></div>

				<div className='w-full aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative'>
					<img
						src={featuredImage}
						alt={title}
						className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
				</div>
				<div className='p-4 sm:p-6 relative z-10'>
					<h2 className='text-base sm:text-lg md:text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300'>
						{title}
					</h2>
				</div>
			</div>
		</Link>
	);
}

export default PostCard;
