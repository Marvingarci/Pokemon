// import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { PrincipalService } from 'src/app/services/principal.service';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredHobbies: Observable<string[]>;
  hobbies: string[] = [];
  allHobbies: string[] = ['Jugar Futbol', 'Jugar Basketball', 'Jugar Tenis', 'Jugar Volleyball', 'Jugar Fifa'];
  formProfile: FormGroup = new FormGroup({})

  @ViewChild('hobbieInput') hobbieInput!: ElementRef<HTMLInputElement>;
  // announcer = inject(LiveAnnouncer);

  ngOnInit(): void {
      this.formProfile = this.fb.group({
        name: ['', [Validators.required]],
        hobbie: ['', []],
        birthday: ['', [Validators.required]],
        DNI: ['', []],
      })
  }
  constructor(private principalService: PrincipalService, private fb: FormBuilder) {
    this.filteredHobbies = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allHobbies.slice())),
    );
  }
  saveProfile(){
    this.principalService.isLoading$.next(true)
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.hobbies.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.hobbies.indexOf(fruit);

    if (index >= 0) {
      this.hobbies.splice(index, 1);

      // this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.hobbies.push(event.option.viewValue);
    this.hobbieInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allHobbies.filter(h => h.toLowerCase().includes(filterValue));
  }
}
