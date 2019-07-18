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

  constructor(private objectProvider: ProviderService, private activatedRoute: ActivatedRoute) {
    const paramId = this.activatedRoute.snapshot.paramMap.get("uid");
    this.userObject = this.objectProvider.userObject;
    this.userObject.profileManager.getUserInfo(paramId).then((user) => {
      this.userProfile = user;
      this.userObject.feedHandler.getFeedItems(paramId).then((result) => {
        console.log(result.length);
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
        console.log(this.userFeed);
      })
      this.isLoaded = true;
    })
  }

  ngOnInit() {
  }

}
