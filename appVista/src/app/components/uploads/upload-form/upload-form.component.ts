import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../../uploads/shared/upload.service';
import { Upload } from '../../../uploads/shared/upload';
import * as _ from 'lodash';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  selectedFiles: FileList;
  currentUpload: Upload;
  // tslint:disable-next-line:no-inferrable-types
  dropzoneActive: boolean = false;
  constructor(private instanceUpload: UploadService, public thisDialogRef: MatDialogRef<UploadFormComponent>) { }

  ngOnInit() {
  }

  detectedFiles(event) {
   this.selectedFiles = event.target.files;
  }

  uploadSingle () {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.instanceUpload.pushUpload(this.currentUpload);
  }

  cerrarVentana() {
    this.thisDialogRef.close('confirm');
  }
  dropzoneState($event: boolean) {
    this.dropzoneActive = $event;
  }

  handleDrop ( fileList: FileList) {
    const filesIndex = _.range(fileList.length);
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(fileList[idx]);
      this.instanceUpload.pushUpload(this.currentUpload);
    });
  }

}
