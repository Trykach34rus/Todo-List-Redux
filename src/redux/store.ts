import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import filterReducer from './slices/filterReducer'
import todoReducer from './slices/todoReducer'

const preloadedState = localStorage.getItem('Todo-List-Redux')
	? JSON.parse(localStorage.getItem('Todo-List-Redux') as string)
	: {}

const rootReducer = combineReducers({
	todo: todoReducer,
	filter: filterReducer,
})

export const store = configureStore({
	reducer: rootReducer,
	preloadedState,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

store.subscribe(() => {
	localStorage.setItem('Todo-List-Redux', JSON.stringify(store.getState()))
})
