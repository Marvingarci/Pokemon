import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Pokemon } from 'src/app/models/Pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon!: Pokemon
  @Output() selectOne: EventEmitter<number> = new EventEmitter<number>()
  selected: boolean= false
  constructor() { }

  ngOnInit(): void {
  }

  selectAPokemon(){
    this.selected = true
    this.selectOne.emit(this.pokemon.id)
  }

}
