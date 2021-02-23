import bfastnode from "bfastnode";
import {JobService} from "../services/job.service.mjs";

const {bfast} = bfastnode;

export const removeNotPaidJourneyJob = bfast.functions().onJob(
    {second: "*/5"},
    _ => {
        new JobService().removeNotPaid()
            .then(value => {
                console.log(value, '***********not paid*********');
            })
            .catch(reason => {
                console.log('fails to remove expired journeys')
            })
    }
);
