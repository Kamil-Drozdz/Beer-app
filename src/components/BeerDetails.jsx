import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

const BeerDetails = () => {
	const [beer, setBeer] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { beerId } = useParams();

	useEffect(() => {
		const fetchBeer = async () => {
			setIsLoading(true);
			const response = await axios.get(`https://api.punkapi.com/v2/beers/${beerId}`);
			console.log(response);
			setBeer(response.data[0]);
			// setIsLoading(false);
		};
		fetchBeer();
	}, [beerId]);

	return (
		<div className='w-full flex flex-col justify-center items-center'>
			{isLoading ? (
				<div className='h-screen flex items-center'>
					<FadeLoader />
				</div>
			) : (
				<div>
					<img src={beer?.image_url} alt={beer?.name} />
					<h3>{beer?.name}</h3>
					<p>{beer?.tagline}</p>
					<p>{beer?.description}</p>
					<p>ABV: {beer?.abv}</p>
					<p>IBU: {beer?.ibu}</p>
					<h4>Ingredients:</h4>
					<ul>
						{beer?.ingredients.malt.map((malt, index) => (
							<li key={index}>{malt.name}</li>
						))}
						{beer?.ingredients.hops.map((hop, index) => (
							<li key={index}>{hop.name}</li>
						))}
					</ul>
					<p>Yeast: {beer?.ingredients.yeast}</p>
				</div>
			)}
		</div>
	);
};

export default BeerDetails;
