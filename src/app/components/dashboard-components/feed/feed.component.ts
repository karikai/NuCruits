import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { FeedItem } from 'src/app/models/feed';
import * as firebase from 'firebase';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  postContent;
  userObject;
  isLoaded = false;
  feedItems = [];
  followers = ['LBOtH9ydF5Vc60IQQjyOnEtrXC63', 'MpXY5NlErrWObe4koT9ixKHoyuy1', 'jn7opzZctTQ1CbbuvikutttyT742']

  postFeed() {
    const feedItem = new FeedItem();
    feedItem.content = this.postContent
    feedItem.creator = this.userObject.uid;
    feedItem.postType = 'text';
    feedItem.date = firebase.firestore.Timestamp.now();
    this.userObject.feedHandler.postFeed(feedItem);
    this.postContent = '';
  }

  constructor(private provider: ProviderService) {
    this.userObject = this.provider.userObject;

    this.followers.forEach(follower => {
      this.userObject.feedHandler.getFeedItems(follower).then((result) => {
        result.forEach(item => {
          this.userObject.profileManager.getUserInfo(item.creator).then((info) => {
            const userAndFeedObject = {
              name: info.firstName + ' ' + info.lastName,
              date: item.date,
              picture: info.profilePicture,
              content: item.content,
              id: info.uid
            };

            if (info.accountType === 'employer') {
              userAndFeedObject.name = info.companyName;
            }
            this.feedItems.push(userAndFeedObject);
          })
        });
      })
      this.isLoaded = true;
    });
    console.log(this.feedItems);
    console.log(this.feedItems.length);
  }

  ngOnInit() {
  }

}
