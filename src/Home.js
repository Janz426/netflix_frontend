import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './components/Nav'; 
import Banner from './components/Banner'; 
import Row from './components/Row'; 

export default function Home() {
    const [tvs, setTVs] = useState();
    const [categories, setCategories] = useState([]);
    const [apiKey, setApiKey] = useState(null);
    const navigate = useNavigate(); 

    const fetchApiKeyAndCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/categories', {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('sessionID')}`
                }
            });
            const data = await response.json();
            setApiKey(data.apiKey);
            setCategories(data.categories);
        } catch (error) {
            console.error('Erro ao obter a chave da API e as categorias:', error);
        }
    };

    useEffect(() => {
        const sessionID = sessionStorage.getItem('sessionID');
        if (!sessionID) {
            navigate('/'); 
            return;
        }

        fetchApiKeyAndCategories();
    }, [navigate]);

    return (
        <div className="home">
            <Nav />
            <Banner apiKey={apiKey} categories={categories} />
            {categories.map((category) => (
                <Row
                    key={category.name}
                    title={category.title}
                    path={category.path}
                    isLarge={category.isLarge}
                    apiKey={apiKey}
                />
            ))}
        </div>
    );
}
