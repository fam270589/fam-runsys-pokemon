import Head from "next/head";
import { useContext, useEffect } from "react";
import Header from "../components/layout/Header";
import PokemonList from "../components/PokemonList";
import Search from "../components/Search";
import { useFetchAll } from "../hooks/useFetchAll";

import { PokemonContext } from "../store/PokemonCtxProvider";

export default function Home() {
	const allPoke = useFetchAll([]);

	const pokemonCtx = useContext(PokemonContext);
	const pokemons = pokemonCtx.pokemons;
	const setPokemons = pokemonCtx.setPokemons;

	useEffect(() => {
		localStorage.setItem("isLoggedIn", "true");

		setPokemons(allPoke);

		return () => {};
	}, [allPoke, setPokemons]);

	return (
		<div className="w-full flex flex-col items-center">
			<Head>
				<title>fam RunSys Pokemon</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="w-full flex flex-col justify-center items-center max-w-7xl px-3 py-2 text-slate-700 select-none">
				<Header />
				<Search />
				<PokemonList />
			</main>
		</div>
	);
}
