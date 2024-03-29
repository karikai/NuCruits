import { Job } from '../models/job';
import { AngularFirestore } from '@angular/fire/firestore';

export class JobInteractor {
    uid;
    afs: AngularFirestore;

    getJobListings(employerId) {
        return new Promise((resolve) => {
            const jobList = []
            const jobRef = this.afs.collection('jobs').ref;
            jobRef.where('employer', '==', employerId).get().then(snapshots => {
                snapshots.forEach(snapshot => {
                    jobList.push(snapshot.data())
                })
                resolve(jobList);
            })
        })
    }

    createJob(job: Job) {
        return new Promise((resolve) => {
            this.afs.collection('jobs').doc(job.jobId).set(job.jobToObject(job));
            resolve('finished');
        })
    }

    deleteJob(jobId) {
        this.afs.collection('jobs').doc(jobId).delete();
    }

    markAsHired(jobId) {
        this.afs.collection('jobs').doc(jobId).get().subscribe((job) => {
            const jobObject = job.data();
            jobObject.hired = true;
            this.afs.collection('jobs').doc(jobId).set(jobObject);
        });
    }

    getApplicantList(jobId) {
        this.afs.collection('jobs').doc(jobId).get().subscribe((job) => {
            const jobObject = job.data();
            return jobObject.applicants;
        });
    }

    randomJobId() {
        const length = 14;
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    initialize(afs) {
        this.afs = afs;
    }

    constructor(uid) {
        this.uid = uid;
    }
}
