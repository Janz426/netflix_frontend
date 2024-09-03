import React, { useEffect, useState } from 'react';
import './Banner.css';

function Banner({ apiKey, categories }) {
    const [movie, setMovie] = useState({});

    const fetchRandomMovie = async () => {
        try {
            const netflixOriginalsCategory = categories.find(
                (category) => category.name === "netflixOriginals"
            );

            if (!netflixOriginalsCategory) {
                throw new Error("Categoria 'netflixOriginals' não encontrada");
            }

            const response = await fetch(`https://api.themoviedb.org/3${netflixOriginalsCategory.path}&api_key=${apiKey}`);
            const data = await response.json();
            const movies = data?.results;
            const randomIndex = Math.floor(Math.random() * movies.length);
            setMovie(movies[randomIndex]);
        } catch (error) {
            console.log("Erro ao buscar filme aleatório:", error);
        }
    };

    useEffect(() => {
        if (apiKey && categories.length > 0) {
            fetchRandomMovie();
        }
    }, [apiKey, categories]);

    const truncate = (str, n) => {
        return str?.length > n ? str?.substr(0, n - 1) + '...' : str;
    };

    return (
        <header
            className='banner-container'
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
                backgroundPosition: "center-center",
            }}
        >
            <div className='banner-content'>
                <h1 className='banner-title'>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className='banner-button-container'>
                    <div className='banner-button'>
                        Assistir
                    </div>
                    <div className='banner-button'>
                        Minha Lista
                    </div>
                </div>
                <div className='banner-description'>
                    <h2>{truncate(movie?.overview, 100)}</h2>
                </div>
            </div>
        </header>
    );
}

export default Banner;
