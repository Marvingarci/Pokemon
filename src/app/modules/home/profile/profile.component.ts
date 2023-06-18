import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { PrincipalService } from 'src/app/services/principal.service';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('modalCropper') modal! : ComponentType<any>;
  @Input() showView : boolean = false
  @Input() editingProfile: boolean = false
  profile$! : Observable<Profile> 
  dialogRef!: MatDialogRef<any>
  imageChangedEvent: any = '';
  imageSrc: string = '';
  fileName: string = '';

  constructor( 
    public dialog: MatDialog,
    public principalService: PrincipalService,
    ) { }

  ngOnInit(): void {
    this.profile$ = this.principalService.actualProfile$
  }
  
  openDialog() {
    this.dialogRef = this.dialog.open(this.modal, {
      height: '600px',
      width: '600px',
    });
  }

  closeDialog(arg:string){
    this.dialogRef.close()
  }

  fileChangeEvent(event: any): void {
    const file: File = event.target.files[0];
    this.fileName = file.name;
    this.imageChangedEvent = event;
    this.openDialog()
  }

  setImage(img:string){
    this.imageSrc = img
    this.principalService.imageChange$.next(this.imageSrc)
  }

  removeImg(){
    this.imageSrc = ''
    this.principalService.imageChange$.next(this.imageSrc)
  }
}
