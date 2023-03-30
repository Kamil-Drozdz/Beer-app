import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

const BeerList = () => {
	const [beers, setBeers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);

	useEffect(() => {
		const fetchBeers = async () => {
			setIsLoading(true);
			const response = await axios.get(`https://api.punkapi.com/v2/beers?page=${page}&per_page=12`);
			setBeers(response.data);
			setIsLoading(false);
		};
		fetchBeers();
	}, [page]);

	const handlePrevPage = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

	const handleNextPage = () => {
		setPage(page + 1);
	};

	return (
		<>
			<h1 className='w-full flex justify-center font-bold text-6xl'>Beers</h1>
			<div className='w-full flex flex-wrap justify-center items-center'>
				{isLoading ? (
					<FadeLoader />
				) : (
					beers.map(beer => (
						<div key={beer?.id} className='w-full md:w-1/3 sm:w-1/2 p-4'>
							<Link to={`/details/${beer?.id}`}>
								<div className='border-2 border-gray-400 h-[700px] flex flex-col items-center p-4'>
									<img
										className='w-full h-[80%] md:h-[90%] mb-4 object-contain'
										loading='lazy'
										src={beer?.image_url}
										alt={beer?.name}
									/>
									<h3 className='font-bold mb-2'>{beer?.name}</h3>
									<p>{beer?.tagline}</p>
								</div>
							</Link>
						</div>
					))
				)}
			</div>
			<div className='w-full flex justify-center items-center my-8'>
				<button
					className='mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					onClick={handlePrevPage}>
					Prev
				</button>
				{page}
				<button
					className='mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					onClick={handleNextPage}>
					Next
				</button>
			</div>
		</>
	);
};

export default BeerList;
