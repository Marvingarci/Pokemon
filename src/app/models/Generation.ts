import { Observable } from "rxjs";
import { Pokemon } from "./Pokemon";

export interface Generation {
  abilities:       any[];
  id:              number;
  main_region:     MainRegion;
  moves:           MainRegion[];
  name:            string;
  names:           Name[];
  pokemon_species: MainRegion[];
  types:           MainRegion[];
  version_groups:  MainRegion[];
}

export interface MainRegion {
  name: string;
  url:  string;
  pokemon: Pokemon
}


interface Stat {
  base_stat: number;
  effort:    number;
  stat:      Species;
}

interface Species {
  name: string;
  url:  string;
}

export interface Name {
  language: MainRegion;
  name:     string;
}
