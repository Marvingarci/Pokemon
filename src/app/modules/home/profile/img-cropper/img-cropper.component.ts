import { ComponentType } from '@angular/cdk/portal';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile';
import { PrincipalService } from 'src/app/services/principal.service';

@Component({
  selector: 'app-img-cropper',
  templateUrl: './img-cropper.component.html',
  styleUrls: ['./img-cropper.component.css'],
})
export class ImgCropperComponent implements OnInit {
  @Input() imageChangedEvent: any = '';
  @Output('sendImage') sendImage = new EventEmitter<string>();
  @Output('closeModal') closeModal = new EventEmitter<string>();
  constructor(
    public dialog: MatDialog,
    public principalService: PrincipalService
  ) {}

  ngOnInit(): void {}
  
  closeDialog() {
    this.closeModal.emit();
  }
  imageCropped(event: ImageCroppedEvent) {
    this.sendImage.emit(event.base64 as string);
  }
}
