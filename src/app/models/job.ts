export class Job {
    jobId: string;
    employer: string;
    positionTitle: string;
    state: string;
    city: string;
    responsibilities: string;
    duties: string;
    qualifications: string;
    hired: boolean;
    applicants = [];
    date;

    objectToJob(jobObject) {
        const jobModel = new Job();
        jobModel.jobId = jobObject.jobId;
        jobModel.employer = jobObject.employer;
        jobModel.positionTitle = jobObject.positionTitle;
        jobModel.state = jobObject.state;
        jobModel.city = jobObject.city;
        jobModel.responsibilities = jobObject.responsibilities;
        jobModel.duties = jobObject.duties;
        jobModel.qualifications = jobObject.qualifications;
        jobModel.hired = jobObject.hired;
        jobModel.date = jobObject.date;
        jobModel.applicants = jobObject.applicants;
        return jobModel;
    }

    jobToObject(jobModel: Job) {
        const jobObject = {
            jobId: jobModel.jobId,
            employer: jobModel.employer,
            positionTitle: jobModel.positionTitle,
            state: jobModel.state,
            city: jobModel.city,
            responsibilities: jobModel.responsibilities,
            duties: jobModel.duties,
            qualifications: jobModel.qualifications,
            hired: jobModel.hired,
            applicants: jobModel.applicants,
            date: jobModel.date
        };
        return jobObject;
    }

    constructor() {

    }
}
