import classNames from 'classnames'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { addTodo } from '../redux/slices/todoReducer'
import { useAppDispatch } from '../redux/store'

export default function TodoForm() {
	const [open, setOpen] = useState<boolean>(false)
	const [text, setText] = useState<string>('')
	const dispatch = useAppDispatch()

	function openModal(): void {
		setOpen(true)
	}

	function closeModal(): void {
		setOpen(false)
	}

	function handleSubmit(): void {
		if (text.trim()) {
			dispatch(addTodo(text))
			setText('')
			closeModal()
		}
	}

	function handleKeyDown(e: React.KeyboardEvent): void {
		if (e.key === 'Enter') {
			handleSubmit()
		}
	}

	return (
		<div className='relative'>
			<button
				className='w-12 h-12 bg-purple-600 shadow-lg shadow-purple-600/30 rounded-full flex items-center justify-center absolute right-2 bottom-8 z-10 transition-all duration-300 hover:bg-purple-700 hover:shadow-purple-700/40'
				onClick={openModal}
			>
				<svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M10.5 22.5C10.5 22.8978 10.658 23.2794 10.9393 23.5607C11.2206 23.842 11.6022 24 12 24C12.3978 24 12.7794 23.842 13.0607 23.5607C13.342 23.2794 13.5 22.8978 13.5 22.5V13.5H22.5C22.8978 13.5 23.2794 13.342 23.5607 13.0607C23.842 12.7794 24 12.3978 24 12C24 11.6022 23.842 11.2206 23.5607 10.9393C23.2794 10.658 22.8978 10.5 22.5 10.5H13.5V1.5C13.5 1.10218 13.342 0.720644 13.0607 0.43934C12.7794 0.158035 12.3978 0 12 0C11.6022 0 11.2206 0.158035 10.9393 0.43934C10.658 0.720644 10.5 1.10218 10.5 1.5V10.5H1.5C1.10218 10.5 0.720644 10.658 0.43934 10.9393C0.158035 11.2206 0 11.6022 0 12C0 12.3978 0.158035 12.7794 0.43934 13.0607C0.720644 13.342 1.10218 13.5 1.5 13.5H10.5V22.5Z'
						fill='#F7F7F7'
					/>
				</svg>
			</button>
			{open &&
				createPortal(
					<div
						className={classNames(
							'fixed inset-0 flex items-center justify-center z-50 transition-all duration-300',
							{
								'opacity-0 invisible': !open,
								'opacity-100 visible': open,
							}
						)}
					>
						<div
							className='absolute inset-0 bg-gray-900/70 backdrop-blur-sm'
							onClick={closeModal}
						/>
						<div className='relative w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl mx-4'>
							<div className='flex flex-col p-6 gap-6'>
								<h1 className='text-2xl font-medium text-center uppercase text-gray-900 dark:text-white'>
									New Note
								</h1>

								<input
									type='text'
									value={text}
									onChange={event => setText(event.target.value)}
									onKeyDown={handleKeyDown}
									placeholder='Input your note...'
									className='w-full bg-transparent text-gray-900 dark:text-white text-base font-medium px-4 py-2 rounded border border-purple-500 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500'
									autoFocus
								/>

								<div className='flex items-center justify-between gap-4'>
									<button
										className='flex-1 px-6 py-3 rounded border border-purple-500 text-purple-500 font-medium uppercase hover:bg-purple-500/10 transition-all duration-200'
										onClick={closeModal}
									>
										Cancel
									</button>
									<button
										className='flex-1 px-6 py-3 rounded bg-purple-600 text-white font-medium uppercase hover:bg-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
										onClick={handleSubmit}
										disabled={!text.trim()}
									>
										Apply
									</button>
								</div>
							</div>
						</div>
					</div>,
					document.body
				)}
		</div>
	)
}
