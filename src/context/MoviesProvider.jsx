import React from 'react'
import { useState, useEffect, createContext } from 'react'

const MoviesContext = createContext()

const MoviesProvider = ({ children }) => {
	const [movie, setMovie] = useState({})
	const [movies, setMovies] = useState([])

	/* Consultar API "Movies" y alamacenar en el state */

	return (
		<MoviesContext.Provider
			value={{ movie, movies }}
		>
			{ children }
		</MoviesContext.Provider>
	)

}

export { MoviesProvider }

export default MoviesContext