import React from 'react'
import { Container, Typography } from '@mui/material'
import { useState } from 'react'
import { MoviesProvider } from './context/MoviesProvider'
function App() {

  return (
		<MoviesProvider>
				<Container>
					<header>
						<Typography >
								Movies
						</Typography>
					</header>
				</Container>
		</MoviesProvider>
  )
}

export default App
