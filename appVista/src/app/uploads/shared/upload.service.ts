import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { Upload } from './upload';
import { PreguntasService } from '../../services/preguntas.service';

@Injectable()
export class UploadService {
  private basePath = '/uploads';
  private uploadTask: firebase.storage.UploadTask;

  constructor(private af: AngularFireModule, private db: AngularFireDatabase, private pregunta: PreguntasService) { }

  pushUpload( upload: Upload) {
    const  storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        upload.progress = (snapshot['bytesTransferred'] / snapshot['totalBytes']) * 100;
      },
    (error) => {
      console.log(error);
    },
    () => {
      upload.url = this.uploadTask.snapshot.downloadURL;
      upload.name = upload.file.name;
      this.pregunta.setListaImagenes(upload.url);
      this.saveFileData(upload);
      }
    );
  }
  private saveFileData( upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
  }

  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
    .then( () => {
      this.deleteFileStorage(upload.name);
    })
    .catch(error => console.log(error));
  }
  // Deletes the file details from the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }
  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }

}
