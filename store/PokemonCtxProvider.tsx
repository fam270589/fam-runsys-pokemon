import React, { useEffect, useState } from "react";
import { IPokemon, IPokemonCtx } from "../models/Types";

export const PokemonContext = React.createContext<IPokemonCtx>({
	pokemons: [],
	fetchPokemons: () => {},
	setPokemons: () => {},
	catchedPokes: [],
	setCatchedPokes: () => {},
	setCatched: () => {},
	getLocalPokemons: () => {},
});

type Props = {
	children?: React.ReactNode;
	// props....
};

//todo:-----PokemonCtxProvider component-----://
const PokemonCtxProvider = (props: Props) => {
	const [pokemons, setPokemons] = useState<IPokemon[]>([]);
	const [catchedPokes, setCatchedPokes] = useState<IPokemon[]>([]);

	const fetchPokemons = async () => {
		try {
			const resp = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
			const data = await resp.json();

			const tempPokemons: IPokemon[] = data.results.map(
				(pokemon: IPokemon, idx: number) => {
					const idString = (idx + 1).toString();
					return { ...pokemon, catched: false, id: idString };
				}
			);

			setPokemons(tempPokemons);
		} catch (error) {
			console.log("error: ", error);
		}
	};

	useEffect(() => {
		const arrPokemons = localStorage.getItem("pokemons");

		if (arrPokemons === null) {
			fetchPokemons();
		} else {
			const items = JSON.parse(arrPokemons);
			setPokemons(items);
		}

		return () => {};
	}, []);

	const getLocalPokemons = () => {
		const arrPokemons = localStorage.getItem("pokemons");
		const items = JSON.parse(arrPokemons as string);

		setPokemons(items);
	};

	const setCatched = (id: string | undefined) => {
		const tempPokemons = pokemons.map((pokemon) => {
			if (pokemon.id === id) {
				return { ...pokemon, catched: true };
			}
			return pokemon;
		});

		localStorage.setItem("pokemons", JSON.stringify(tempPokemons));
		setPokemons(tempPokemons);
	};

	const contextValue: IPokemonCtx = {
		pokemons,
		fetchPokemons,
		setPokemons,
		catchedPokes,
		setCatchedPokes,
		setCatched,
		getLocalPokemons,
	};

	return (
		<PokemonContext.Provider value={contextValue}>
			{props.children}
		</PokemonContext.Provider>
	);
};

export default PokemonCtxProvider;
