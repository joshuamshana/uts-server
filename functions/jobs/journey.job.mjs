import bfastnode from "bfastnode";
import {JobService} from "../services/job.service.mjs";

const {bfast} = bfastnode;
const jobService = new JobService();

export const pushJourneyJob = bfast.functions().onJob(
    {second: "*/5"},
    _ => {
        jobService.sendJourneyJob()
            .then(console.log)
            .catch(console.log)
    });
