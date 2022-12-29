export interface IPokemon {
	id: string;
	name: string;
	url: string;
	catched: boolean;
}

export interface IPokemonCtx {
	pokemons: IPokemon[];
	setPokemons: React.Dispatch<React.SetStateAction<IPokemon[]>>;
	catchedPokes: IPokemon[];
	setCatchedPokes: React.Dispatch<React.SetStateAction<IPokemon[]>>;
	setCatched: (id: string) => void;
}

export interface IDetails {
	sprites: { front_default: string };
	name: string;
	types: { type: { name: string } }[];
	height: number;
	weight: number;
	abilities: string;
}
