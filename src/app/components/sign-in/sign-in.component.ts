import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email: string;
  password: string;

  signIn() {
    this.afa.auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
      UtilitiesService.redirect('feed');
    }).catch(err => {
      window.alert(err);
    })
  }
  
  constructor(private afa: AngularFireAuth) { }

  ngOnInit() {
  }

}
