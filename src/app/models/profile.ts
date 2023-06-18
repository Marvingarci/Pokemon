import { Pokemon } from "./Pokemon";

export interface Profile{
  id:number;
  img: string;
  name: string;
  hobbie: string;
  birthday: string;
  DNI: string;
  Pokemons?: Pokemon[];
}