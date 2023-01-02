import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { IDetails, IPokemon } from "../models/Types";
import { PokemonContext } from "../store/PokemonCtxProvider";

type Props = {
	children?: React.ReactNode;
	// props....
};

//todo:-----Details component-----://
const Details = (props: Props) => {
	const [details, setDetails] = useState<IDetails>();
	const [isCatched, setIsCatched] = useState(false);

	const pokemonCtx = useContext(PokemonContext);
	const setCatched = pokemonCtx.setCatched;

	const router = useRouter();
	const { id } = router.query;
	let theId: string;
	if (isNaN(parseInt(id as string))) {
		theId = "25";
	} else {
		theId = id as string;
	}

	useEffect(() => {
		const fetchDetails = async () => {
			try {
				const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${theId}`);
				const data = await resp.json();

				setDetails(data as IDetails);
			} catch (error) {
				console.log("error: ", error);
			}
		};

		fetchDetails();

		return () => {};
	}, [theId]);

	const handleCatch = (id: string | string[] | undefined) => {
		setIsCatched(true);
		setCatched(id as string);
	};
	return (
		<div className="flex flex-col items-center w-full text-center my-3">
			{!details ? (
				<p>Loading</p>
			) : (
				<>
					<Image
						src={details.sprites!.front_default}
						alt=""
						width={150}
						height={150}
					/>
					<div className="font-bold text-2xl">
						<h1>{details.name}</h1>
					</div>
					<div>
						<p>Type: {details.types![0].type.name}</p>
						<p>Height: {details.height}</p>
						<p>Weight: {details.weight}</p>
					</div>
					{isCatched ? (
						<button
							className={`bg-green-700 text-gray-200 rounded-md px-3 cursor-pointer m-5`}
						>
							Catched
						</button>
					) : (
						<button
							className={`bg-slate-500 text-gray-200 rounded-md px-3 cursor-pointer m-5`}
							onClick={() => handleCatch(id as string)}
						>
							Catch!
						</button>
					)}
				</>
			)}
		</div>
	);
};

export default Details;
