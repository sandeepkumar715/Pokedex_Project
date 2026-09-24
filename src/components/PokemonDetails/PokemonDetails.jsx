import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css'

import usePokemonDetails from "../../hooks/usePokemonDetails";
function PokemonDetails(){
      const {id} = useParams();
      const [pokemon] = usePokemonDetails(id);
        
        // const [pokemon,setPokemon] = useState({});
       
        // let pokemonListHookResponse=[];
        // async function downloadPokemon(){
            
        //     const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        //     console.log(response.data)
        //     setPokemon({
        //         name:response.data.name,
        //         image:response.data.sprites.other.dream_world.front_default,
        //         weight: response.data.weight,
        //         height: response.data.height,
        //         types: response.data.types.map((t) => t.type.name)
        //     });
        //    return response;
             
        // }
        // pokemonListHookResponse = usePokemonList(`https://pokeapi.co/api/v2/type/${pokemon.types ? pokemon.types[0] : 'fire'}`,true)
       
        // useEffect(() => {
        //     downloadPokemon();
        //     console.log("List", pokemonListHookResponse.pokemonListState);
            
        // },[]);

    return (
       <div className="pokemon-details-wrapper"> 
             <img className="pokemon-details-image" src={pokemon.image} />
            <div className="pokemon-details-name">  <span>{pokemon.name}</span></div>
           
            <div className="pokemon-details-name">Height:  <span>{pokemon.height}</span></div>
            <div className="pokemon-details-name">Weight:  <span>{pokemon.weight}</span></div>
            <div className="pokemon-details-types">
                { pokemon.types && pokemon.types.map((t) => <div key={t} > {t}</div>)}
            </div>
            {
               pokemon.similarPokemons && pokemon.types &&
                <div>
                    More {pokemon.types[0]}  type pokemons
                    <ul>
                        { pokemon.similarPokemons.map((p) => <li key={p.pokemon.id}>{p.pokemon.name}</li>)}
                    </ul>
                </div>
            }       
       </div>
    )
}
export default PokemonDetails;