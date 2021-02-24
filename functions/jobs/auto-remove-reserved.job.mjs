import bfastnode from "bfastnode";
import {JobService} from "../services/job.service.mjs";

const {bfast} = bfastnode;

export const removeNotPaidJourneyJob = bfast.functions().onJob(
    {second: "*/30"},
    _ => {
        new JobService().removeNotPaid()
            .then(value => {
                console.log(value);
            })
            .catch(reason => {
                console.log('fails to remove expired journeys')
            })
    }
);
