import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {

  return {
    // vite config
		plugins: [react()],
		esbuild: {
			jsxInject: `import * as React from 'react';`
		}
  }
})