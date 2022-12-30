export interface IPokemon {
	id: string | undefined;
	name: string | undefined;
	url?: string | undefined;
	catched: boolean | undefined;
	details?: IDetails | undefined;
}

export interface IPokemonCtx {
	pokemons: IPokemon[];
	setPokemons: React.Dispatch<React.SetStateAction<IPokemon[]>>;
	catchedPokes: IPokemon[];
	setCatchedPokes: React.Dispatch<React.SetStateAction<IPokemon[]>>;
	setCatched: (id: string | undefined) => void;
}

export interface IDetails {
	sprites?: { front_default: string };
	name: string | undefined;
	type?: string | undefined;
	types?: { type: { name: string } }[];
	height: number | string | undefined;
	weight: number | string | undefined;
	abilities?: string;
}
