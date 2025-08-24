import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Todo } from '../../types'

export interface TodoState {
	list: Todo[]
	editId: number | null
	editText: string
}
interface EditingPayload {
	id: number
	text: string
}

const initialState: TodoState = {
	list: [],
	editId: null,
	editText: '',
}

export const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<string>) => {
			state.list.push({
				id: Date.now(),
				title: action.payload,
				complete: false,
			})
		},
		deleteTodo: (state, action: PayloadAction<number>) => {
			state.list = state.list.filter(item => item.id !== action.payload)
		},
		completeTodo: (state, action: PayloadAction<number>) => {
			state.list = state.list.map(item =>
				item.id === action.payload
					? { ...item, complete: !item.complete }
					: item
			)
		},
		startEditing: (state, action: PayloadAction<EditingPayload>) => {
			state.editId = action.payload.id
			state.editText = action.payload.text
		},
		updateTodoText: (state, action: PayloadAction<EditingPayload>) => {
			state.list = state.list.map(item =>
				item.id === action.payload.id
					? { ...item, title: action.payload.text }
					: item
			)
			state.editId = null
			state.editText = ''
		},
		setEditText: (state, action: PayloadAction<string>) => {
			state.editText = action.payload
		},
	},
})

export const {
	addTodo,
	deleteTodo,
	completeTodo,
	startEditing,
	updateTodoText,
	setEditText,
} = todoSlice.actions
export default todoSlice.reducer
