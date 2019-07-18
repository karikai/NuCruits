import { AngularFirestore } from '@angular/fire/firestore';
import { FeedItem } from '../models/feed';

export class FeedHandler {
    uid;
    feedItems = [];
    myFeedItems = [];
    afs: AngularFirestore;

    getMyFeedItems() {
        this.myFeedItems = [];
        return new Promise((resolve) => {
            this.afs.collection('feed').doc(this.uid).get().subscribe((feed) => {
                const myFeed = feed.data();
                myFeed.feedArray.forEach(element => {
                    const feedItem = new FeedItem();
                    this.myFeedItems.push(feedItem.objectToFeed(element));
                });
                resolve(this.myFeedItems);
            });
        });
    }

    getFollowersFeedItems(followingArray: Array<any>) {
        let feedItems = new Array();
        let count = 0;
        return new Promise(resolve => {
            const length = followingArray.length;
            followingArray.forEach((follow) => {
                count++;
                this.afs.collection('feed').doc(follow).get().subscribe((feed) => {
                    const followerFeed = feed.data();
                    if (followerFeed.feedArray) {
                        followerFeed.feedArray.forEach(element => {
                            const feedItem = new FeedItem();
                            feedItems.push(feedItem.objectToFeed(element));
                        });
                    }
                    if (count === length) {
                        resolve(feedItems);
                    }

                });
            });
        })
    }

    getFeedItems(uid: string) {
        const feedItems = []
        return new Promise(resolve => {
            this.afs.collection('feed').doc(uid).get().subscribe((feed) => {
                const followerFeed = feed.data();
                if (followerFeed.feedArray) {
                    followerFeed.feedArray.forEach(element => {
                        const feedItem = new FeedItem();
                        feedItems.push(feedItem.objectToFeed(element));
                    });
                }
                resolve(feedItems);
            })
        })
    }

    postFeed(feedPost: FeedItem) {
        const feedList = [];
        this.afs.collection('feed').doc(this.uid).get().subscribe((feed) => {
            if (feed.exists) {
                const myFeed = feed.data();
                myFeed.feedArray.forEach(element => {
                    feedList.push(element);
                });
                console.log('before', feedList);
                feedList.push(feedPost.feedToObject(feedPost));
                const feedArrayObject = {
                    feedArray: feedList
                };
                console.log('after', feedArrayObject);
                this.afs.collection('feed').doc(this.uid).set(feedArrayObject);
            } else {
                const feedObject = feedPost.feedToObject(feedPost); 
                console.log(feedObject);
                feedList.push(feedObject);
                const feedArrayObject = {
                    feedArray: feedList
                };
                console.log('after', feedArrayObject);
                this.afs.collection('feed').doc(this.uid).set(feedArrayObject);
            }

        });
    }

    initialize(afs) {
        this.afs = afs;
    }

    constructor(uid) {
        this.uid = uid;
    }
}
