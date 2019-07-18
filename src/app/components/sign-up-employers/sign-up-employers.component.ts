import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Employer } from 'src/app/models/employer';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-sign-up-employers',
  templateUrl: './sign-up-employers.component.html',
  styleUrls: ['./sign-up-employers.component.css']
})
export class SignUpEmployersComponent implements OnInit {
  stage = 1;
  userPath = 's-' + Date.now().toString();
  employerObject: Employer;
  password: string;
  repassword: string;

  signUp() {
    this.afa.auth.createUserWithEmailAndPassword(this.employerObject.email, this.password).then((user) => {
      this.employerObject.uid = user.user.uid;
      const userObj = this.userToObject();
       for (const propertyName in userObj) { // Deletes fields that don't have data
         if (typeof userObj[propertyName] === 'undefined') {
           delete userObj[propertyName];
         }
       }
      console.log(userObj);
      this.afs.collection('users').doc(user.user.uid).set(userObj).then(() => {
        UtilitiesService.redirect('');
      });
    }).catch((err) => {
      window.alert(err);
    });
  }

  userToObject() {
    return this.employerObject.employerToObject(this.employerObject);
  }

  emailPasswordValidation() {
    if (this.isEmailValid()) { // Email Validation
      if (this.doPasswordsMatch()) { // Confirm Password Validation
        if (this.isPasswordValid()) { // Password Credentials Validation
          this.doesEmailExist().then((resolve) => { // New Email Validation
            if (resolve) {
              this.nextStage();
            } else {
              window.alert('Email Address already exist')
            }
          })
        } else {
          window.alert('Passwords needs to contain an uppercase, a lowercase, and a number')
        }
      } else {
        window.alert('Passwords do not match')
      }
    } else {
      window.alert('Enter a valid Email Address')
    }
  }

  infoValidation() {
    const nameCheck = this.isFieldEmpty(this.employerObject.companyName);
    const stateCheck = this.isFieldEmpty(this.employerObject.state);
    const cityCheck = this.isFieldEmpty(this.employerObject.city);

    if (nameCheck) {
        if (stateCheck) {
          if (cityCheck) {
            this.nextStage();
          } else {
            window.alert('Enter a valid city')
          }
        } else {
          window.alert('Enter a valid state')
        }
    } else {
      window.alert('Please enter your company\'s name')
    }
  }

  // File Upload Operations

  uploadPicture() {
    const file = document.getElementById('profile-picutre');
    const picture = document.getElementById('upload-demo');
    const storage = this.afstore.storage;
    // @ts-ignore
    const storageRef = this.afstore.ref(this.userPath + '/' + Date.now().toString() + file.files[0].name);

    // @ts-ignore
    storageRef.put(file.files[0]).then((val) => {
      storage.ref(val.metadata.fullPath).getDownloadURL().then((url) => {
        picture.setAttribute('src', url);
        this.employerObject.profilePicture = url;
      });
    });
  }

  // Validation Functions

  isEmailValid() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.employerObject.email).toLowerCase());
  }

  doesEmailExist() {
    return new Promise((resolve) => {
      this.util.doesEmailExist(this.employerObject.email).then(doesExist => {
        resolve(doesExist)
      })
    })
  }

  isPasswordValid() {
    let hasUpper;
    let hasLower;
    let hasNumber;
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';

    for (let i = 0; i < this.password.length; i++) {
      const char = this.password[i];

      for (let j = 0; j < letters.length; j++) {
        const lowercase = letters[j];
        const uppercase = letters.toLocaleUpperCase()[j];

        if (char === lowercase) {
          hasLower = true;
        }

        if (char === uppercase) {
          hasUpper = true;
        }

      }

      for (let k = 0; k < numbers.length; k++) {
        const number = numbers[k].toString();

        if (char === number) {
          hasNumber = true;
        }

      }

    }

    if (hasNumber && hasLower && hasUpper) {
      return true;
    } else {
      return false;
    }

  }

  doPasswordsMatch() {
    if (this.password === this.repassword) {
      return true;
    } else {
      return false;
    }
  }

  isFieldEmpty(field) {
    if (field !== '') {
      return true;
    } else {
      return false;
    }
  }

  // Functions to navigate through Sign Up Panes

  backStage() {
    this.stage--;
  }

  nextStage() {
    this.stage++;
  }

  // Functions to recieve output from selectors

  getState($event) {
    this.employerObject.state = $event;
  }


  constructor(private util: UtilitiesService, private afa: AngularFireAuth,
    private afs: AngularFirestore, private afstore: AngularFireStorage) {
    this.employerObject = new Employer();
  }

  ngOnInit() { }

}
