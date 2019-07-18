import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  static redirect(path: string) {
    const link = document.createElement('a');
    const attr = document.createAttribute('href');
    attr.value = path;
    link.attributes.setNamedItem(attr);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  doesEmailExist(email: string) {
    const dbRef = this.afs.collection('users');
    return new Promise((resolve) => {
      dbRef.ref.where('email', '==' , email).get().then(docs => {
        if (docs.empty) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
    })
  }

  constructor(public afs: AngularFirestore) {}
}
