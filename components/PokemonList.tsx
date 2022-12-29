import React, { useContext, useState } from "react";
import { useFetchAll } from "../hooks/useFetchAll";
import { PokemonContext } from "../store/PokemonCtxProvider";
import PokemonCard from "./ui/PokemonCard";

type Props = {
	children?: React.ReactNode;
	// props....
};

//todo:-----PokemonList component-----://
const PokemonList = (props: Props) => {
	const [isAscending, setisAscending] = useState(false);
	const [sortCatchedActive, setSortCatchedActive] = useState(false);
	const [sortNameActive, setSortNameActive] = useState(false);

	const allPokes = useFetchAll([]);

	const pokemonCtx = useContext(PokemonContext);
	const pokemons = pokemonCtx.pokemons;
	const setPokemons = pokemonCtx.setPokemons;
	const catchedPokes = pokemonCtx.catchedPokes;

	const handleSortName = () => {
		let sorted;

		if (isAscending) {
			sorted = [...pokemons].sort((a, b) => (a.name < b.name ? 1 : -1));
		} else {
			sorted = [...pokemons].sort((a, b) => (a.name > b.name ? 1 : -1));
		}

		setPokemons(sorted);
		setisAscending((prevState) => !prevState);

		if (!sortNameActive) {
			setSortNameActive(true);
		}
	};

	const handleSortCatched = () => {
		if (sortCatchedActive) {
			setPokemons(allPokes);
		} else {
			setPokemons(catchedPokes);
		}

		setSortCatchedActive((prevState) => !prevState);
	};

	return (
		<>
			<div className="flex gap-6">
				<p>Sort: </p>
				<p
					className={`border text-gray-500 px-2 rounded-md cursor-pointer ${
						sortNameActive ? "border-blue-400 bg-blue-400 text-white" : ""
					}`}
					onClick={handleSortName}
				>
					{isAscending ? "Descending" : "Ascending"}
				</p>
				<p
					className={`border text-gray-500 px-2 rounded-md cursor-pointer ${
						sortCatchedActive ? "border-blue-400 bg-blue-400 text-white" : ""
					}`}
					onClick={handleSortCatched}
				>
					Catched
				</p>
			</div>

			<div className="w-5/6 sm:w-1/2 my-1">
				{pokemons ? (
					pokemons.map((pokemon) => (
						<PokemonCard key={pokemon.id} id={pokemon.id} pokemon={pokemon} />
					))
				) : (
					<p>Loading...</p>
				)}
			</div>
		</>
	);
};

export default PokemonList;
