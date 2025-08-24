import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { FilterT, Theme } from '../../types'

export interface FilterState {
	theme: Theme
	search: string
	filter: FilterT
}
const initialState: FilterState = {
	theme: Theme.light,
	search: '',
	filter: FilterT.all,
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		changeTheme: state => {
			state.theme = state.theme === Theme.light ? Theme.dark : Theme.light
		},
		handleSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload.toLowerCase()
		},
		setFilter: (state, action: PayloadAction<FilterT>) => {
			state.filter = action.payload
		},
	},
})

export const { changeTheme, handleSearch, setFilter } = filterSlice.actions
export default filterSlice.reducer
