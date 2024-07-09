/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const Section = () => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [restaurant, setRestaurant] = useState({});
	const [counter, setCounter] = useState(0);
	const handleDecrement = () => {
		setCounter(counter - 1);
	};
	const handleIncrement = () => {
		setCounter(counter + 1);
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/data.json');
				if (!response.ok) {
					throw new Error('Failed to fetch data from local JSON file');
				}
				const data = await response.json();
				setData(data);
				setIsLoading(false);
				setRestaurant(data.restaurant);
			} catch (error) {
				console.error('Error fetching data:', error);
				setIsLoading(false); // Set loading to false even if there is an error
			}
		};

		fetchData();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!data) {
		return <div>Error loading data</div>;
	}

	return (
		<div className="w-full h-full flex flex-row">
			<div className="bg-red-300">
				<h1>{restaurant.name}</h1>
				<p className="text-gray-400 text-sm">{restaurant.description}</p>
				{data.categories.map((item, index) => (
					<div key={index}>
						<h1 className="bg-blue-300">{item.name}</h1>

						<div className="grid grid-cols-2 w-full h-full">
							{item.meals.map((meal, index) => {
								return (
									<div
										key={meal.id}
										className="bg-slate-500 hover:bg-slate-400 m-4 p-4 rounded-xl"
									>
										<p className="text-md">{meal.title}</p>
										<p className="text-sm">{meal.description}</p>
										<p className="text-md">{meal.price}€</p>
										<img
											src={meal.picture}
											className="w-24 h-24 object-cover rounded-2xl"
										/>
									</div>
								);
							})}
						</div>
					</div>
				))}
			</div>
			<div className="bg-blue-800 w-full">
				<h1>Panier</h1>
				<button className="bg-customGreen rounded p-2 m-2">
					Valider mon panier
				</button>
				<div className="p-3 flex justify-around items-center bg-red-700">
					<div>
						<button onClick={handleDecrement} className="m-3">
							-
						</button>
						{counter}
						<button onClick={handleIncrement} className="m-3">
							+
						</button>
					</div>
					<div>Brunch vegan</div>
					<div>Prix</div>
				</div>
				<h2>Sous-total</h2>
				<h3>Frais de livraison</h3>
				<h4>Total</h4>
			</div>
		</div>
	);
};

export default Section;
