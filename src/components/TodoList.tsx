import { useAppSelector } from '../redux/store'
import { Todo } from '../types'
import Empty from './Empty'
import TodoItem from './TodoItem'

export default function TodoList() {
	const { list } = useAppSelector(state => state.todo)
	const { filter, search } = useAppSelector(state => state.filter)

	const filteredList: Todo[] = list
		.filter(item =>
			filter === 'Complete'
				? item.complete
				: filter === 'Incomplete'
				? !item.complete
				: true
		)
		.filter(item => item.title.toLowerCase().includes(search))

	return (
		<section className='max-w-2xl mx-auto mb-8'>
			{filteredList.length === 0 ? (
				<Empty />
			) : (
				filteredList.map(item => <TodoItem key={item.id} item={item} />)
			)}
		</section>
	)
}
