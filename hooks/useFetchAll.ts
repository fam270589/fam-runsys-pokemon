import { useState, useEffect } from "react";
import { IPokemon } from "../models/Types";

export const useFetchAll = (initialValue: IPokemon[]) => {
	const [allPokemons, setAllPokemons] = useState<IPokemon[]>(initialValue);

	useEffect(() => {
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
				setAllPokemons(tempPokemons);
			} catch (error) {
				console.log("error: ", error);
			}
		};

		fetchPokemons();

		console.log("useEffect run...");

		return () => {};
	}, []);

	return allPokemons;
};
