import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper: boolean = false
  dialogRef!: MatDialogRef<any>
  @ViewChild('someInput') modal! : ComponentType<any>;

  imageSrc!: string;
   myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(private sanitizer: DomSanitizer, public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  openDialog() {
    this.dialogRef = this.dialog.open(this.modal, {
      height: '600px',
      width: '600px',
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  closeDialog(){
    this.dialogRef.close()
  }


  onFileChange(event: any) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
        console.log(this.imageSrc)
        this.myForm.patchValue({
          fileSource: reader.result
        });
   
      };
   
    }
  }

  fileChangeEvent(event: any): void {
    this.showCropper = true
    this.openDialog()
    this.imageChangedEvent = event;
  }
imageCropped(event: ImageCroppedEvent) {
  this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl as string);
  console.log(event)
  this.imageSrc = event.base64 as string
  // event.blob can be used to upload the cropped image
}
imageLoaded(image?: LoadedImage) {
    console.log(image)
  }
  cropperReady() {
  console.log('Cropper')
  // cropper ready
}
loadImageFailed() {
  console.log('fail')
  // show message
}

}
