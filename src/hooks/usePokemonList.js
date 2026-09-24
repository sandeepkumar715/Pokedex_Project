import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(type) {
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon/',
        nextUrl: '',
        prevUrl: '',
        type:''
    })

    async function downloadPokemon() {
        // setIsLoading(true);

        // iterating over the array of pokemons and using their url, to create an array of promises
        // that will  download  those 20 pokemons 
       
            setPokemonListState((state) => ({
                ...state,
                isLoading: true
            }))

            //this dowloads list of 20 pokemons
            // const response = await axios.get(pokedexUrl);
            const response = await axios.get(pokemonListState.pokedexUrl);


            //we get the array of pokemons from result
            const pokemonResults = response.data.results;
            console.log("response ise", response.data.pokemon);

            console.log(response.data);
            // setNextUrl(response.data.next);
            // setPrevUrl(response.data.previous);
            setPokemonListState((state) => ({
                ...state,
                nextUrl: response.data.next,
                prevUrl: response.data.previous
            }));

            const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

            //passing that promise array to aaxios.all
            const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon detailed data
            console.log(pokemonData);

            //now iterate on data of each pokeemon and extract id,name,image,types
            const pokeListResult = pokemonData.map((pokeData) => {
                const pokemon = pokeData.data;
                return {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                    types: pokemon.types
                }

            })
            console.log(pokeListResult);
            //  setPokemonList( pokeListResult);
            // setIsLoading(false);
            setPokemonListState((state) => ({
                ...state,
                pokemonList: pokeListResult,
                isLoading: false

            }));


        

    }
    useEffect(() => {
        downloadPokemon();


    }, [pokemonListState.pokedexUrl]);

    return {
        pokemonListState, setPokemonListState
    }

}
export default usePokemonList;