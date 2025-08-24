import classNames from 'classnames'
import {
	completeTodo,
	deleteTodo,
	setEditText,
	startEditing,
	updateTodoText,
} from '../redux/slices/todoReducer.ts'
import { useAppDispatch, useAppSelector } from '../redux/store.ts'
import { Todo } from '../types.ts'

export default function TodoItem({ item }: { item: Todo }) {
	const { editId, editText } = useAppSelector(state => state.todo)
	const dispatch = useAppDispatch()

	return (
		<div
			className={classNames(
				'flex justify-between items-center py-4 border-b border-purple-500/45',
				'hover:[&_.right]:opacity-100 transition-all duration-300',
				{
					'opacity-60': item.complete,
				}
			)}
		>
			<div className='flex items-center gap-4'>
				<button
					className={classNames(
						'w-6 h-6 rounded-sm border border-purple-500 transition-all duration-300',
						'flex items-center justify-center',
						{
							'bg-purple-500': item.complete,
							'hover:bg-purple-500/20': !item.complete,
						}
					)}
					onClick={() => dispatch(completeTodo(item.id))}
				>
					<svg
						width='15'
						height='15'
						viewBox='0 0 15 15'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className={classNames('transition-all duration-300', {
							'opacity-100': item.complete,
							'opacity-0': !item.complete,
						})}
					>
						<mask id='path-1-inside-1_18_421' fill='white'>
							<path d='M4.9978 14.6488L1.72853e-05 9.74756L9.55927 2.22748e-06L14.5571 4.90124L4.9978 14.6488Z' />
						</mask>
						<path
							d='M4.9978 14.6488L3.59745 16.0767L5.02539 17.4771L6.42574 16.0491L4.9978 14.6488ZM6.39816 13.2209L1.40037 8.31962L-1.40034 11.1755L3.59745 16.0767L6.39816 13.2209ZM13.1291 3.50089L3.56986 13.2484L6.42574 16.0491L15.985 6.30159L13.1291 3.50089Z'
							fill='#F7F7F7'
							mask='url(#path-1-inside-1_18_421)'
						/>
					</svg>
				</button>

				{editId === item.id ? (
					<input
						type='text'
						value={editText}
						onChange={e => dispatch(setEditText(e.target.value))}
						onBlur={() =>
							dispatch(updateTodoText({ id: item.id, text: editText }))
						}
						onKeyDown={e => {
							if (e.key === 'Enter') {
								dispatch(updateTodoText({ id: item.id, text: editText }))
							}
						}}
						className='bg-transparent border-b border-purple-500/50 focus:border-purple-500 outline-none text-xl font-medium uppercase transition-colors duration-200'
					/>
				) : (
					<h2
						className={classNames(
							'text-xl font-medium uppercase transition-all duration-300',
							{
								'line-through text-gray-400 dark:text-gray-500': item.complete,
								'text-current': !item.complete,
							}
						)}
					>
						{item.title}
					</h2>
				)}
			</div>

			<div className='right flex items-center gap-2 opacity-0 transition-opacity duration-300'>
				<button
					className='w-5 h-5 bg-transparent text-gray-400 hover:text-purple-500 transition-colors duration-200'
					onClick={() =>
						dispatch(startEditing({ id: item.id, text: item.title }))
					}
				>
					<svg
						width='18'
						height='18'
						viewBox='0 0 18 18'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='w-full h-full'
					>
						<path
							d='M8.67272 5.99106L2 12.6637V16H5.33636L12.0091 9.32736M8.67272 5.99106L11.0654 3.59837L11.0669 3.59695C11.3962 3.26759 11.5612 3.10261 11.7514 3.04082C11.9189 2.98639 12.0993 2.98639 12.2669 3.04082C12.4569 3.10257 12.6217 3.26735 12.9506 3.59625L14.4018 5.04738C14.7321 5.37769 14.8973 5.54292 14.9592 5.73337C15.0136 5.90088 15.0136 6.08133 14.9592 6.24885C14.8974 6.43916 14.7324 6.60414 14.4025 6.93398L14.4018 6.93468L12.0091 9.32736M8.67272 5.99106L12.0091 9.32736'
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</button>

				<button
					className='w-5 h-5 bg-transparent text-gray-400 hover:text-red-500 transition-colors duration-200'
					onClick={() => dispatch(deleteTodo(item.id))}
				>
					<svg
						width='18'
						height='18'
						viewBox='0 0 18 18'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='w-full h-full'
					>
						<path
							d='M3.87414 7.61505C3.80712 6.74386 4.49595 6 5.36971 6H12.63C13.5039 6 14.1927 6.74385 14.1257 7.61505L13.6064 14.365C13.5463 15.1465 12.8946 15.75 12.1108 15.75H5.88894C5.10514 15.75 4.45348 15.1465 4.39336 14.365L3.87414 7.61505Z'
							stroke='currentColor'
						/>
						<path
							d='M14.625 3.75H3.375'
							stroke='currentColor'
							strokeLinecap='round'
						/>
						<path
							d='M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z'
							stroke='currentColor'
						/>
						<path
							d='M10.5 9V12.75'
							stroke='currentColor'
							strokeLinecap='round'
						/>
						<path
							d='M7.5 9V12.75'
							stroke='currentColor'
							strokeLinecap='round'
						/>
					</svg>
				</button>
			</div>
		</div>
	)
}
