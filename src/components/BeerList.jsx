import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

const BeerList = () => {
	const [beers, setBeers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchBeers = async () => {
			setIsLoading(true);
			const response = await axios.get('https://api.punkapi.com/v2/beers?page=1&per_page=12');
			console.log(response);
			setBeers(response.data);
			setIsLoading(false);
		};

		fetchBeers();
	}, []);

	return (
		<div className='w-full flex flex-col justify-center items-center'>
			{beers.map(beer => (
				<Link key={beer.id} to={`/details/${beer.id}`}>
					{isLoading ? (
						<FadeLoader />
					) : (
						<div>
							<img src={beer.image_url} alt={beer.name} />
							<h3>{beer.name}</h3>
							<p>{beer.tagline}</p>
						</div>
					)}
				</Link>
			))}
		</div>
	);
};
export default BeerList;
