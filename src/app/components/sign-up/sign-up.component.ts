import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Student } from 'src/app/models/student';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  stage = 1;
  userPath = 's-' + Date.now().toString();
  studentObject: Student;
  password: string;
  repassword: string;

  signUp() {
    this.afa.auth.createUserWithEmailAndPassword(this.studentObject.email, this.password).then((user) => {
      this.studentObject.uid = user.user.uid;
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
    return this.studentObject.studentToObject(this.studentObject);
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
    const firstNameCheck = this.isFieldEmpty(this.studentObject.firstName);
    const lastNameCheck = this.isFieldEmpty(this.studentObject.lastName);
    const stateCheck = this.isFieldEmpty(this.studentObject.state);
    const cityCheck = this.isFieldEmpty(this.studentObject.city);

    if (firstNameCheck) {
      if (lastNameCheck) {
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
        window.alert('Please enter your last name')
      }
    } else {
      window.alert('Please enter your first name')
    }
  }

  studentValidation() {
    const majorCheck = this.isFieldEmpty(this.studentObject.major);
    const gradYearCheck = this.isFieldEmpty(this.studentObject.gradYear);
    const schoolCheck = this.isFieldEmpty(this.studentObject.school);

    if (majorCheck) {
      if (gradYearCheck) {
        if (schoolCheck) {
          this.nextStage();
        } else {
          window.alert('Please select a university')
        }
      } else {
        window.alert('Please select your graduation year')
      }
    } else {
      window.alert('Please select your major')
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
        this.studentObject.profilePicture = url;
      });
    });
  }

  uploadResume() {
    const file = document.getElementById('resume');
    const storage = this.afstore.storage;
    // @ts-ignore
    const storageRef = this.afstore.ref(this.userPath + '/' + Date.now().toString() + file.files[0].name);

    // @ts-ignore
    storageRef.put(file.files[0]).then((val) => {
      storage.ref(val.metadata.fullPath).getDownloadURL().then((url) => {
        console.log(url);
        this.studentObject.resume = url;
      });
    });
  }

  uploadTranscript() {
    const file = document.getElementById('transcript');
    const storage = this.afstore.storage;
    // @ts-ignore
    const storageRef = this.afstore.ref(this.userPath + '/' + Date.now().toString() + file.files[0].name);

    // @ts-ignore
    storageRef.put(file.files[0]).then((val) => {
      storage.ref(val.metadata.fullPath).getDownloadURL().then((url) => {
        console.log(url);
        this.studentObject.transcript = url;
      });
    });
  }

  // Validation Functions

  isEmailValid() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.studentObject.email).toLowerCase());
  }

  doesEmailExist() {
    return new Promise((resolve) => {
      this.util.doesEmailExist(this.studentObject.email).then(doesExist => {
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
    this.studentObject.state = $event;
  }

  getMajor($event) {
    this.studentObject.major = $event;
  }

  getSchool($event) {
    this.studentObject.school = $event;
  }


  constructor(private util: UtilitiesService, private afa: AngularFireAuth,
    private afs: AngularFirestore, private afstore: AngularFireStorage) {
    this.studentObject = new Student();
    this.studentObject.experiences = [];
    this.studentObject.skills = [];
  }

  ngOnInit() { }

}
