import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
	base: '/Todo-List-Redux',
	plugins: [tailwindcss(), react()],
})
