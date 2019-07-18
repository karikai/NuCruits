import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FireProviderService {

  returnAuth() {
    return this.afa;
  }

  returnFirestore() {
    return this.afs;
  }

  returnFirestorage() {
    return this.afstore;
  }

  constructor(private afa: AngularFireAuth, private afs: AngularFirestore, private afstore: AngularFireStorage) {

  }
}
