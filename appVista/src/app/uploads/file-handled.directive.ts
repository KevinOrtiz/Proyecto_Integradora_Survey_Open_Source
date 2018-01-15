import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import * as _ from 'lodash';

@Directive({
  selector: '[appFileHandled]'
})
export class FileHandledDirective {
  @Output() filesDropped = new EventEmitter<FileList>();
  @Output() fileHovered = new EventEmitter();
  constructor() { }
  @HostListener('drop', ['$event'])
    onDrop($event) {
      $event.preventDefault();
      const transfer = $event.dataTransfer;
      this.filesDropped.emit(transfer.files);
    }

    @HostListener('dragover', ['$event'])
    onDragOver($event) {
      $event.preventDefault();
      this.fileHovered.emit(true);
    }

    @HostListener('dragleave', ['$event'])
    onDragLeave($event) {
      $event.preventDefault();
      this.fileHovered.emit(false);
    }

}
