import empty from '../assets/empty.png'

export default function Empty() {
	return (
		<div className='flex flex-col items-center justify-center gap-5 py-8'>
			<img
				src={empty}
				alt='No tasks found'
				className='w-50 h-50 object-contain opacity-80'
			/>
			<p className='text-xl font-normal text-gray-500 dark:text-gray-400'>
				Empty...
			</p>
		</div>
	)
}
