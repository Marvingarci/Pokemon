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
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { PokeidPipe } from 'src/app/pipes/pokeid.pipe';
import { SortGenerationPipe } from 'src/app/pipes/sort-generation.pipe';
import { ShowprofileResolver } from 'src/app/resolvers/showprofile.resolver';
import { PokemonShowComponent } from './pokemon-show/pokemon-show.component';
import { ProgressComponent } from 'src/app/ui/progress/progress.component';
import { ImgCropperComponent } from './profile/img-cropper/img-cropper.component';
import { TextMaskModule } from 'angular2-text-mask';

const routes: Routes = [
    {
      path: '',
      children:[
        {
          path: 'new', component: PrincipalComponent
        },
        {
          path: 'edit-profile/:id', component: PrincipalComponent,
          resolve: {editProfile: ShowprofileResolver }
        },
        {
          path: 'show/:id', component: PrincipalComponent,
          resolve: {profile: ShowprofileResolver }
        },
        {
          path: '**', redirectTo: 'new'
        }
      ]
    }
  ]

@NgModule({
  declarations: [ProfileComponent,LoadingComponent,ProgressComponent, PokeidPipe, SortGenerationPipe, PrincipalComponent, FormUsuarioComponent, PokemonListComponent, PokemonCardComponent, PokemonShowComponent, ImgCropperComponent],
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
    TextMaskModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
