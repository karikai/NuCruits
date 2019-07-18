import { AngularFirestore } from '@angular/fire/firestore';
import { Connections } from '../models/connection';

export class ProfileManager {
    uid;
    afs: AngularFirestore;

    getAllJobs() {
        const allJobs = [];
        return new Promise((resolve) => {
            this.afs.collection('jobs').get().subscribe((jobs) => {
                jobs.forEach((job) => {
                    const jobData = job.data();
                    allJobs.push(jobData);
                });
                resolve(allJobs);
            });
        })
    }

    getUserInfo(id) {
        return new Promise((resolve) => {
            this.afs.collection('users').doc(id).get().subscribe((userObject) => {
                resolve(userObject.data());
            })
        })
    }

    getJob(jid) {
        return new Promise((resolve) => {
            this.afs.collection('jobs').doc(jid).get().subscribe((jobObject) => {
                resolve(jobObject.data());
            })
        })
    }

    getEmployerInfo(uid) {
        return new Promise((resolve) => {
            this.afs.collection('users').doc(uid).get().subscribe((user) => {
                const userData = user.data();
                const userObject = {
                    companyName: userData.companyName,
                    profilePicture: userData.profilePicture
                }
                resolve(userObject);
            })
        })
    }

    getStudentInfo(uid) {

    }

    follow(uid: string) {
        this.afs.collection('connections').doc(this.uid).get().subscribe((connectionsData) => {
            if (connectionsData.exists) {
                const connections = connectionsData.data();
                const isFollowing = connections.following.includes(uid);
                if (!isFollowing) {
                    connections.following.push(uid);
                } else {
                    console.log('already following')
                }
                this.afs.collection('connections').doc(this.uid).set(connections);
            } else {
                const newConnections = new Connections();
                newConnections.following = [uid];
                newConnections.followers = [];
                newConnections.uid = this.uid;
                this.afs.collection('connections').doc(this.uid).set(newConnections.connectionsToObject(newConnections));
            }
        })
    }

    unfollow(uid: string) {
        this.afs.collection('connections').doc(this.uid).get().subscribe((connectionsData) => {
            if (connectionsData.exists) {
                const connections = connectionsData.data();
                const newFollowingList = [];
                connections.following.forEach((followee) => {
                    if (followee !== uid) {
                        newFollowingList.push(followee)
                    }
                })
                connections.following = newFollowingList;
                this.afs.collection('connections').doc(this.uid).set(connections);
            }
        })
    }

    getConnections(uid: string) {
        return new Promise((resolve) => {
            this.afs.collection('connections').doc(uid).get().subscribe((connectionsData) => {
                if (connectionsData.exists) {
                    const connections = connectionsData.data();
                    resolve(connections);
                }
            })
        })
    }
    
    // getFollowers() {}    
    // getFollowing() {}
    
    initialize(afs) {
        this.afs = afs;
    }

    constructor(uid) {
        this.uid = uid;
        console.log('working')
    }
}