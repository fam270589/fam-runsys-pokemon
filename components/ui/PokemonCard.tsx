import React, { useContext } from "react";
import { IPokemon } from "../../models/Types";
import { PokemonContext } from "../../store/PokemonCtxProvider";

type Props = {
	children?: React.ReactNode;
	// props....
	pokemon: IPokemon;
	id: string;
};

//todo:-----PokemonCard component-----://
const PokemonCard = ({ id, pokemon }: Props) => {
	const pokemonCtx = useContext(PokemonContext);
	const setCatched = pokemonCtx.setCatched;

	const handleCatch = (name: string) => {
		setCatched(name);
		console.log(pokemon);
	};

	return (
		<div className="flex w-full my-3 justify-between border py-2 px-3 rounded-md drop-shadow-md">
			<p className="cursor-pointer">{pokemon.name}</p>
			<p
				className={` text-gray-200 rounded-md px-3 cursor-pointer ${
					pokemon.catched ? "bg-green-400" : "bg-slate-500"
				}`}
				onClick={() => {
					handleCatch(id);
				}}
			>
				Catch!
			</p>
		</div>
	);
};

export default PokemonCard;
