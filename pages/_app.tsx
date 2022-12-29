import "../styles/globals.css";
import type { AppProps } from "next/app";
import PokemonCtxProvider from "../store/PokemonCtxProvider";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<PokemonCtxProvider>
			<Component {...pageProps} />
		</PokemonCtxProvider>
	);
}
