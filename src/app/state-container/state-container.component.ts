import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { Employer } from '../models/employer';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProviderService } from '../services/provider.service';
import { FireProviderService } from '../services/fire-provider.service';

@Component({
  selector: 'app-state-container',
  templateUrl: './state-container.component.html',
  styleUrls: ['./state-container.component.css']
})
export class StateContainerComponent implements OnInit {
  userObject;
  isLoaded;

  getUser(docId) {
    this.afs.collection('users').doc(docId).get().subscribe((user) => {
      const userData = user.data();
      if (userData.accountType === 'student') {
        const userModel = new Student();
        this.userObject = userModel.objectToStudent(userData);
      }
      if (userData.accountType === 'employer') {
        const userModel = new Employer();
        this.userObject = userModel.objectToEmployer(userData);
      }
      this.initMods();
      console.log('Im done initializing');
      this.isLoaded = true;
      this.objectProvider.userObject = this.userObject;
    });
  }

  initMods() {
    const fs = this.fp.returnFirestore();
    const fa = this.fp.returnAuth();
    const fstore = this.fp.returnFirestorage();
    this.userObject.initializeModules(fs, fa, fstore);
  }

  constructor(private afa: AngularFireAuth, private afs: AngularFirestore, private fp: FireProviderService,
              private objectProvider: ProviderService) {
    this.afa.authState.subscribe((user) => {
      if (user) {
        const docId = user.uid;
        this.getUser(docId);
      } else {
        this.isLoaded = true;
      }
    });
  }

  ngOnInit() {
  }

}
