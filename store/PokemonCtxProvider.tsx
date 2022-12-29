import React, { useState } from "react";
import { IPokemon, IPokemonCtx } from "../models/Types";

export const PokemonContext = React.createContext<IPokemonCtx>({
	pokemons: [],
	setPokemons: () => {},
	catchedPokes: [],
	setCatchedPokes: () => {},
	setCatched: () => {},
});

type Props = {
	children?: React.ReactNode;
	// props....
};

//todo:-----PokemonCtxProvider component-----://
const PokemonCtxProvider = (props: Props) => {
	const [pokemons, setPokemons] = useState<IPokemon[]>([]);
	const [catchedPokes, setCatchedPokes] = useState<IPokemon[]>([]);

	const setCatched = (id: string) => {
		const tempPokemons = pokemons.map((pokemon) => {
			if (pokemon.id === id) {
				return { ...pokemon, catched: true };
			}
			return pokemon;
		});

		setPokemons(tempPokemons);
	};

	const contextValue: IPokemonCtx = {
		pokemons,
		setPokemons,
		catchedPokes,
		setCatchedPokes,
		setCatched,
	};

	return (
		<PokemonContext.Provider value={contextValue}>
			{props.children}
		</PokemonContext.Provider>
	);
};

export default PokemonCtxProvider;
