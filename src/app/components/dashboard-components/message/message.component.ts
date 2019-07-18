import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { Message } from 'src/app/models/message';
import * as firebase from 'firebase';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  isLoaded: boolean;
  userObject;
  messageThreads = [];
  messagePreviews = [];
  messageDialogBox: boolean;
  newMessageText: string;
  newMessageRecipient: string;
  inMessageThread = false;
  currentThread;
  currentRecipientName;
  currentRecipientPicture;
  currentMessageText: string;

  newThread() {
    this.messageDialogBox = true;
  }

  createThread() {
    const message = new Message();
    message.date = firebase.firestore.Timestamp.now();
    message.from = this.userObject.uid;
    message.body = this.newMessageText;
    if (this.newMessageRecipient && this.newMessageText) {
      this.userObject.messenger.createThread(message, this.newMessageRecipient);
    }
    this.newMessageRecipient = '';
    this.newMessageText = '';
    this.messageDialogBox = false;
  }

  openThread(id, name, picture) {
    this.currentRecipientName = name;
    this.currentRecipientPicture = picture;

    this.messageThreads.forEach(thread => {
      if (thread.threadId === id) {
        this.currentThread = thread;
      }
    })

    this.inMessageThread = true;
    console.log(this.currentThread)
  }

  sendMessage() {
    const message = new Message();
    message.from = this.userObject.uid;
    message.date = firebase.firestore.Timestamp.now();
    message.body = this.currentMessageText;
    if (this.currentMessageText !== '') {
      this.userObject.messenger.sendMessage(message, this.currentThread.threadId);
    }
    this.currentMessageText = '';
    this.userObject.messenger.getThread(this.currentThread.threadId).then(thread => {
      this.currentThread = thread;
    })
  }

  initialize() {
    this.userObject = this.provider.userObject;
    this.userObject.messenger.getAllThreads().then(threads => {
      this.messageThreads = threads;
      let participantId;

      threads.forEach(element => {
        // Check who is the other user
        element.threadParticipants.forEach(par => {
          if (par !== this.userObject.uid) {
            participantId = par
          }
        });

        this.userObject.profileManager.getUserInfo(participantId).then(info => {
          let previewObject;
          if (info.accountType === 'student') {
            previewObject = {
              name: info.firstName + ' ' + info.lastName,
              picture: info.profilePicture,
              lastMessage: element.messages[element.messages.length - 1].body,
              threadId: element.threadId
            }
          }

          if (info.accountType === 'employer') {
            previewObject = {
              name: info.companyName,
              picture: info.profilePicture,
              lastMessage: element.messages[element.messages.length - 1].body,
              threadId: element.threadId
            }
          }

          this.messagePreviews.push(previewObject)
        })
      });
    })
  }

  constructor(private provider: ProviderService) {
    this.initialize();
  }

  ngOnInit() {
  }

}
