import bfastnode from "bfastnode";
import {JobService} from "../services/job.service.mjs";

const {bfast} = bfastnode;

export const pushJourneyJob = bfast.functions().onJob(
    {second: "*/5"},
    _ => {
        new JobService().sendJourneyJob()
            .then(console.log)
            .catch(console.log)
    }
);
