import {Injectable} from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';
import {Upload} from './upload';

@Injectable()
export class UploadService {
  private basePath = '/uploads';
  private uploadTask: firebase.storage.UploadTask;
  private fileImage;
  constructor(private af: AngularFireModule, private db: AngularFireDatabase) { }

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
      console.log(this.uploadTask);
      upload.url = this.uploadTask.snapshot.downloadURL;
      upload.name = upload.file.name;
      this.saveFileData(upload);
      this.setfileImage(upload);
      }
    );
  }
  setfileImage(file) {
    this.fileImage = file;
  }

  getfileImage() {
    console.log(this.fileImage);
    return this.fileImage;
  }

  private saveFileData( upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
  }

  deleteUpload(upload: Upload) {
    console.log(upload.file.name);
    this.deleteFileData(upload.$key)
    .then( () => {
      this.deleteFileStorage(upload.file.name);
    })
    .catch(error => {
      console.log(error);
      return false;
    });
    return true;

  }

  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }

}
