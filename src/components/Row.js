import React, { useEffect, useState } from 'react';
import './Row.css';

export default function Row({ title, path, isLarge, apiKey }) {
    const [filmes, setFilmes] = useState([]);
    const imageHost = 'https://image.tmdb.org/t/p/original/';

    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3${path}&api_key=${apiKey}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    useEffect(() => {
        fetchData().then((data) => {
            setFilmes(data?.results || []);
        });
    }, [path, apiKey]);

    return (
        <div className='row-container'>
            <h2 className='row-header'>{title}</h2>
            <div className='row-cards'>
                {filmes?.map((filme) => (
                    <img
                        className={`movie-card ${isLarge && "movie-card-large"}`}
                        key={filme.id}
                        src={imageHost + (isLarge ? filme.backdrop_path : filme.poster_path)}
                        alt={filme.name}
                    />
                ))}
            </div>
        </div>
    );
}
