import bfastnode from 'bfastnode';
import moment from "moment";

const {BFast, bfast} = bfastnode;

export class JobService {
    /**
     *
     * @param job {{date: Date, id: string}}
     * @return {Promise<*>}
     */
    async registerJob(job) {
        // console.log(job);
        let _job = null;
        try {
            _job = await bfast.database().table('jobs').get(job.id);
        } catch (e) {
        }

        if (_job) {
            return bfast.database().collection('jobs').query().byId(job.id)
                .updateBuilder()
                .set('date', job.date)
                .update();
        } else {
            return bfast.database().collection('jobs').save(job);
        }
    }

    /**
     *
     * @param _job {
     *     {
                id: string,
                date: string,
            }
     * }
     * @return {Promise<*>}
     */
    async isDailySalesJobExecuted(_job) {
        try {
            const job = await BFast.database().collection('jobs').get(_job.id);
            if (job && job.date) {
                const diff = moment(_job.date).diff(moment(job.date));
                return diff === 0;
            } else {
                return false
            }
        } catch (e) {
            return false;
        }
    }

    async isJobSent(hash) {
        try {
            const job = await bfast.database().collection('jobs').get(hash);
            return !!(job && job.date);
        } catch (e) {
            return false;
        }
    }
}
