import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isLoaded: boolean;
  userObject;
  userProfile;
  userFeed = [];
  doesFollow = false;
  isMe: boolean;

  follow() {
    this.userObject.profileManager.follow(this.activatedRoute.snapshot.paramMap.get("uid"));
    setTimeout(() => {
      this.doesFollow = true;
    }, 1000)
  }

  unfollow() {
    this.userObject.profileManager.unfollow(this.activatedRoute.snapshot.paramMap.get("uid"));
    setTimeout(() => {
      this.doesFollow = false;
    }, 1000)
  }

  initialize() {
    const paramId = this.activatedRoute.snapshot.paramMap.get("uid");
    this.userObject = this.objectProvider.userObject;
    this.userObject.profileManager.getUserInfo(paramId).then((user) => {
      this.userProfile = user;
      this.userObject.feedHandler.getFeedItems(paramId).then((result) => {
        if (result) {
          result.forEach(item => {
            this.userObject.profileManager.getUserInfo(item.creator).then((info) => {
              const userAndFeedObject = {
                name: info.firstName + ' ' + info.lastName,
                date: item.date,
                picture: info.profilePicture,
                content: item.content,
                id: info.uid
              };
              this.userFeed.push(userAndFeedObject);
            })
          }); 
        }
      })
      
      console.log(this.userProfile);

      this.userObject.profileManager.getConnections(this.userObject.uid).then(connections => {
        connections.following.forEach(follow => {
          if (follow === paramId) {
            this.doesFollow = true
          }
        })
      })

      if (this.userObject.uid === paramId) {
        this.isMe = true;
      } else {
        this.isMe = false;
      }
      this.isLoaded = true;
    })
  }

  constructor(private objectProvider: ProviderService, private activatedRoute: ActivatedRoute) {
    this.initialize();
  }

  ngOnInit() {
  }

}
