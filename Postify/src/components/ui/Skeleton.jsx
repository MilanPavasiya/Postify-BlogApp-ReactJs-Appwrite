import React from 'react';

export const Skeleton = ({ className = '', ...props }) => (
	<div
		className={`animate-pulse bg-gray-200 rounded ${className}`}
		{...props}
	/>
);

export const PostCardSkeleton = () => (
	<div className='bg-white rounded-xl border border-gray-200 overflow-hidden'>
		<Skeleton className='w-full aspect-video' />
		<div className='p-4 space-y-3'>
			<Skeleton className='h-6 w-3/4' />
			<Skeleton className='h-4 w-full' />
			<Skeleton className='h-4 w-2/3' />
		</div>
	</div>
);

export const PostSkeletonGrid = ({ count = 8 }) => (
	<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
		{Array.from({ length: count }).map((_, i) => (
			<PostCardSkeleton key={i} />
		))}
	</div>
);

export default Skeleton;

