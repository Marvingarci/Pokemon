// import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, of, startWith, switchMap, timer } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { PrincipalService } from 'src/app/services/principal.service';
import { PokemondbService } from 'src/app/services/pokemondb.service';
import { Profile } from 'src/app/models/profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  myProfile!: Profile 
  filteredHobbies!: Observable<string[]>;
  hobbies: string[] = [];
  allHobbies: string[] = ['Jugar Futbol', 'Jugar Basketball', 'Jugar Tenis', 'Jugar Volleyball', 'Jugar Fifa'];
  formProfile: FormGroup = new FormGroup({})
  @Input() editingProfile: boolean = false
  @Input() profileToEdit!: Profile
  @ViewChild('hobbieInput') hobbieInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
      this.formProfile = this.fb.group({
        img: ['', [Validators.required]],
        name: ['', [Validators.required]],
        hobbie: [[], []],
        birthday: ['', [Validators.required]],
        DNI: ['', []],
        Pokemons: [[], []]
      })

      this.principalService.imageChange$.subscribe((newImg: string)=>{
        this.formProfile.patchValue({img:newImg})
      })

      this.filteredHobbies = (this.formProfile.get('hobbie') as FormControl).valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allHobbies.slice())),
      );

      if(this.editingProfile){
        console.log(this.profileToEdit)
        this.formProfile.patchValue(this.profileToEdit)
        this.hobbies.push(this.profileToEdit.hobbie)
      }
  }
  constructor(
    private principalService: PrincipalService, 
    private pokemonService: PokemondbService, 
    private router: Router, 
    private fb: FormBuilder) 
  {

  }
  saveProfile(){
    console.log(this.hobbies)
    console.log(this.formProfile.value)
    this.principalService.isLoading$.next(true)

    of(1).pipe(
      switchMap(()=>{
        if(!this.editingProfile){
          return this.pokemonService.saveProfile(this.formProfile.value as Profile)
        }else{
          return this.pokemonService.updateProfile(this.formProfile.value as Profile, this.profileToEdit.id)
        }
      })
    ).subscribe((response: any)=>{
      this.myProfile = response
      this.principalService.actualProfile$.next(this.myProfile)
      if(this.editingProfile){
        this.router.navigate(['/home/show/'+this.myProfile.id])
        return      
      }
      this.principalService.isLoading$.next(false)
    }, error => console.log(error))
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.hobbies.push(value);
    }
    event.chipInput!.clear();
    (this.formProfile.get('hobbie') as FormControl).setValue(this.hobbies);
  }

  remove(fruit: string): void {
    const index = this.hobbies.indexOf(fruit);
    if (index >= 0) {
      this.hobbies.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.hobbies.push(event.option.viewValue);
    this.hobbieInput.nativeElement.value = '';
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allHobbies.filter(h => h.toLowerCase().includes(filterValue));
  }
}
