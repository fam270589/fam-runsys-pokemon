import React, { useContext, useState } from "react";
import { IPokemon } from "../models/Types";
import { PokemonContext } from "../store/PokemonCtxProvider";

type Props = {
	children?: React.ReactNode;
	// props....
};

//todo:-----Search component-----://
const Search = (props: Props) => {
	const [searchKey, setSearchKey] = useState("");

	const pokemonCtx = useContext(PokemonContext);
	const pokemons = pokemonCtx.pokemons;
	const setPokemons = pokemonCtx.setPokemons;

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const key = e.target.value;
		setSearchKey(key);
	};

	const handleSearch = (key: string) => {
		if (key.trim() === "") {
			const arrPokemons = localStorage.getItem("pokemons");
			const items = JSON.parse(arrPokemons as string);

			setPokemons(items);
			return;
		}

		const newList: IPokemon[] = pokemons.filter((pokemon) =>
			pokemon.name?.includes(key.toLowerCase())
		);
		setPokemons(newList);
		setSearchKey("");
	};

	return (
		<div className="flex gap-2 mt-1 mb-5">
			<input
				className="border rounded-md px-3"
				type="text"
				placeholder="pokemon..."
				value={searchKey}
				onChange={handleOnChange}
				onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
					if (e.key === "Enter") {
						handleSearch(searchKey);
					}
				}}
			/>
			<button
				className="bg-slate-700 text-gray-200 px-3 rounded-md "
				onClick={() => handleSearch(searchKey)}
			>
				Search
			</button>
		</div>
	);
};

export default Search;
