import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { IDetails, IPokemon } from "../models/Types";
import { PokemonContext } from "../store/PokemonCtxProvider";

type Props = {
	children?: React.ReactNode;
	// props....
};

//todo:-----Details component-----://
const Details = (props: Props) => {
	const [details, setDetails] = useState<IDetails>();
	const [isCatched, setIsCatched] = useState(false);

	const pokemonCtx = useContext(PokemonContext);
	const setCatched = pokemonCtx.setCatched;
	const setCatchedPokes = pokemonCtx.setCatchedPokes;
	const pokemons = pokemonCtx.pokemons;

	const { query } = useRouter();

	useEffect(() => {
		const fetchDetails = async () => {
			try {
				const resp = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${query.id}`
				);
				const data = await resp.json();

				setDetails(data);
				console.log(data);
			} catch (error) {
				console.log("error: ", error);
			}
		};

		fetchDetails();

		console.log("useEffect run");

		return () => {};
	}, [query.id]);

	const handleCatch = (id: string) => {
		const found = pokemons.find((pokemon) => pokemon.id === id);
		const newPoke = { ...found, catched: true };

		// setCatchedPokes((prev) => [...prev, newPoke]);
		setIsCatched(true);
		setCatched(id);
	};
	return (
		<div className="flex flex-col items-center w-full text-center my-3">
			{!details ? (
				<p>Loading</p>
			) : (
				<>
					<Image
						src={details.sprites.front_default}
						alt=""
						width={150}
						height={150}
					/>
					<div className="font-bold text-2xl">
						<h1>{details.name}</h1>
					</div>
					<div>
						<p>Type: {details.types[0].type.name}</p>
						<p>Height: {details.height}</p>
						<p>Weight: {details.weight}</p>
					</div>
					{isCatched ? (
						<button
							className={`bg-green-700 text-gray-200 rounded-md px-3 cursor-pointer m-5`}
						>
							Catched
						</button>
					) : (
						<button
							className={`bg-slate-500 text-gray-200 rounded-md px-3 cursor-pointer m-5`}
							onClick={() => handleCatch(query.id as string)}
						>
							Catch!
						</button>
					)}
				</>
			)}
		</div>
	);
};

export default Details;
