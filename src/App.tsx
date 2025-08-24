import Filter from './components/Filter.tsx'
import TodoForm from './components/TodoForm.tsx'
import TodoList from './components/TodoList.tsx'
import { useAppSelector } from './redux/store.ts'
import { Theme } from './types.ts'

function App() {
	const { theme } = useAppSelector(state => state.filter)

	return (
		<div
			className={`min-h-screen font-kanit ${
				theme === Theme.light
					? 'bg-gray-100 text-gray-900'
					: 'bg-gray-900 text-gray-100'
			}`}
		>
			<div className='max-w-4xl mx-auto relative min-h-screen px-4'>
				<header className='pt-10 pb-8'>
					<h1 className='text-2xl sm:text-3xl font-medium uppercase text-center mb-5 tracking-wide'>
						Todo List
					</h1>
					<Filter />
				</header>

				<main className='pb-20'>
					<TodoList />
					<section className='fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4'>
						<TodoForm />
					</section>
				</main>
			</div>
		</div>
	)
}

export default App
