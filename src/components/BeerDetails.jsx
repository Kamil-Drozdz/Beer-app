import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

const BeerDetails = () => {
	const [beer, setBeer] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { beerId } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		const fetchBeer = async () => {
			setIsLoading(true);
			const response = await axios.get(`https://api.punkapi.com/v2/beers/${beerId}`);
			setBeer(response.data[0], 'xdcddsfddf');
			setIsLoading(false);
		};
		fetchBeer();
	}, [beerId]);

	return (
		<div className='flex w-screen h-screen items-center justify-center'>
			{isLoading ? (
				<div className='w-screen h-screen flex justify-center items-center'>
					<FadeLoader />
				</div>
			) : (
				<div className='md:mt-0 mt-[50%] pb-8 flex md:flex-row flex-col items-center justify-center text-sm md:text-base'>
					<button
						onClick={() => {
							navigate('/');
						}}
						className='absolute left-0 top-0 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
						← Back to Beer List
					</button>
					<img
						className='w-[200px] h-[400px] md:h-[600px] my-8 mr-8 object-contain'
						loading='lazy'
						src={beer?.image_url}
						alt={beer?.name}
					/>
					<div className='md:w-1/2 flex flex-col mx-2'>
						<h3>
							<strong className='mr-2'>NAME:</strong>
							{beer?.name}
						</h3>
						<p>
							<strong className='mr-2'>TAGLINE:</strong>
							{beer?.tagline}
						</p>
						<p>
							<strong className='mr-2'>DESCRIPTION:</strong>
							<br />
							{beer?.description}
						</p>
						<p>
							<strong className='mr-2'>ABV:</strong>
							{beer?.abv}
						</p>
						<p>
							<strong className='mr-2'>IBU:</strong> {beer?.ibu}
						</p>
						<h4>
							<strong className='mr-2'>Ingredients:</strong>
						</h4>
						<ul>
							{beer?.ingredients?.malt.map((malt, index) => (
								<div key={index}>
									<strong>{index + 1}.</strong> {malt?.name}
								</div>
							))}
							{beer?.ingredients?.hops.map((hop, index) => (
								<li key={index} className='flex'>
									<span className='mx-1'>
										<strong>{hop?.add}:</strong>
									</span>
									<span className='mx-1'>{hop?.name}</span>
									<span className='mx-1'>{hop?.attribute}</span>
									<span className='mx-1'>
										{hop?.amount.value}/{hop?.amount.unit}
									</span>
								</li>
							))}
						</ul>
						<p>
							<strong>YEAST:</strong> {beer?.ingredients.yeast}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default BeerDetails;
