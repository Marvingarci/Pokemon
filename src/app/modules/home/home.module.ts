import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { FormUsuarioComponent } from './form-usuario/form-usuario.component';
import {MatInputModule} from '@angular/material/input';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from './pokemon-list/pokemon-card/pokemon-card.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { PokeidPipe } from 'src/app/pipes/pokeid.pipe';
import { SortGenerationPipe } from 'src/app/pipes/sort-generation.pipe';

const routes: Routes = [
    {
      path: '',
      component: PrincipalComponent
    }
  ]

@NgModule({
  declarations: [ProfileComponent,LoadingComponent, PokeidPipe, SortGenerationPipe, PrincipalComponent, FormUsuarioComponent, PokemonListComponent, PokemonCardComponent],
  imports: [
    CommonModule,
    MatInputModule,
    ImageCropperModule,
    MatAutocompleteModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    VirtualScrollerModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
