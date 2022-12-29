export interface IPokemon {
	name: string;
	url: string;
	catched: boolean;
}

export interface IPokemonCtx {
	pokemons: IPokemon[];
	setPokemons: React.Dispatch<React.SetStateAction<IPokemon[]>>;
	setCatched: (id: string) => void;
}

export interface IDetails {
	sprite: string;
	name: string;
	types: string;
	height: number;
	weight: number;
	abilities: string;
}
