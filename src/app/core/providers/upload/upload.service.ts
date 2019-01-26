//ref: http://javasampleapproach.com/frontend/angular/angular-4-firebase-upload-file-to-storage
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { FileUpload } from '../../../shared/models/upload';


@Injectable()
export class UploadService {

  private uploadCollection: AngularFirestoreCollection<FileUpload>;
  private basePath: string = '/uploads';

  constructor(private afs: AngularFirestore) {
    this.uploadCollection = afs.collection<FileUpload>('uploads');
  }

  pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }, refId: string) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
      },
      (error) => {
        // fail
        console.log(error)
      },
      () => {
        // success
        fileUpload.url = uploadTask.snapshot.downloadURL;
        fileUpload.name = fileUpload.file.name;
        fileUpload.$key = refId;
        this.saveFileData(fileUpload)
      }
    );
  }

  private saveFileData(fileUpload: FileUpload) {
    console.log(fileUpload);
    const id = fileUpload.$key;

    let file = {
      $key: id,
      name: fileUpload.name,
      url: fileUpload.url,
      createdAt: fileUpload.createdAt
    }
    this.uploadCollection.doc(file.$key).set(file).then(() => {
      //update user profile picture with url
      this.afs.collection('users').doc(file.$key).update({
        photoUrl: file.url
      });
    }).catch(err => console.log(err));
  }


  private deleteFileData(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child('/uploads/' + name).delete();
  }


}
