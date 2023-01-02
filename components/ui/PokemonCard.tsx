import Link from "next/link";
import React, { useContext } from "react";
import { IPokemon } from "../../models/Types";
import { PokemonContext } from "../../store/PokemonCtxProvider";

type Props = {
	children?: React.ReactNode;
	// props....
	pokemon: IPokemon;
	id: string | undefined;
};

//todo:-----PokemonCard component-----://
const PokemonCard = ({ id, pokemon }: Props) => {
	const pokemonCtx = useContext(PokemonContext);
	const setCatched = pokemonCtx.setCatched;
	const catchedPokes = pokemonCtx.catchedPokes;
	const setCatchedPokes = pokemonCtx.setCatchedPokes;

	const handleCatch = (id: string | undefined) => {
		setCatched(id as string);
	};

	return (
		<div className="flex w-full my-3 justify-between border shadow-sm py-3 px-5 rounded-md drop-shadow-md">
			<Link href={`/${id}`}>
				<p className="cursor-pointer underline-offset-4 hover:underline">
					{pokemon.name}
				</p>
			</Link>
			{pokemon.catched ? (
				<p
					className={`bg-green-700 text-gray-200 rounded-md px-3 cursor-pointer `}
				>
					Catched
				</p>
			) : (
				<p
					className={`bg-slate-500 text-gray-200 rounded-md px-3 cursor-pointer `}
					onClick={() => {
						handleCatch(id);
					}}
				>
					Catch!
				</p>
			)}
		</div>
	);
};

export default PokemonCard;
