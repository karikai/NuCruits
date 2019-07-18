export class FeedItem {
    creator: string;
    postType: string;
    content: string;
    date;

    objectToFeed(feedObject) {
        const feedModel = new FeedItem();
        feedModel.creator = feedObject.creator;
        feedModel.postType = feedObject.postType;
        feedModel.content = feedObject.content;
        feedModel.date = feedObject.date;
        return feedModel;
    }

    feedToObject(feedModel: FeedItem) {
        const feedObject = {
            creator: feedModel.creator,
            postType: feedModel.postType,
            content: feedModel.content,
            date: feedModel.date
        };
        return feedObject;
    }

    constructor() {

    }
}

export class FeedArray {
    feedArray = [];

    objectToFeedArray(feedArrayObject) {
        const feedArrayModel = new FeedArray();
        feedArrayObject.forEach(element => {
            const feedItem = new FeedItem();
            feedArrayModel.feedArray.push(feedItem.objectToFeed(element));
        });
        return feedArrayModel;
    }

    feedArrayToObject(feedModel: FeedArray) {
        const feedArrayAttr = [];
        feedModel.feedArray.forEach(element => {
            const feedItem = new FeedItem();
            feedArrayAttr.push(feedItem.feedToObject(element));
        });
        const feedArrayObject = {
            feedArray: feedArrayAttr
        };
        return feedArrayObject;
    }

    constructor() {

    }
}
