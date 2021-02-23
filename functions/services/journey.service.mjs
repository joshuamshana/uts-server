import bfastnode from "bfastnode";
import {JobService} from "./job.service.mjs";


const {bfast} = bfastnode;

export class JourneyService {
    static COLLECTION_NAME = 'journeys';

    /**
     *
     * @param journeys: []
     * @returns {Promise<any>}
     */
    async saveJourneys(journeys) {
        return Promise.all(journeys.map(async journey => {
            return bfast.database().collection(JourneyService.COLLECTION_NAME).get(journey.id).then(async j => {
                if (j) {
                    return await bfast.database().collection(JourneyService.COLLECTION_NAME).query().updateBuilder().doc(journey).update();
                } else {
                    return await bfast.database().collection(JourneyService.COLLECTION_NAME).save(journey);
                }
            }).catch();

        }));
    }

    async reserveJourney(reserve) {
        const busPoaUrlReserve = "https://www.buspoa.co.tz/manifest/utsrequest_poa.php";
        console.log(reserve);
        if (this._validateReserveData(reserve)) {
            const results = await bfast.functions().request(busPoaUrlReserve).post(reserve);
            if (results.expires) {
                results.expires = results.expires.toString().replace(new RegExp('(:Z)', 'ig'), 'Z')
            }
            console.log(results);
            if (results.status && results.status === 'success') {
                new JobService().sendJourneyJob()
                    .then(console.log)
                    .catch(console.log)
            }
            return results;
        } else {
            throw {message: 'invalid data supplied'};
        }
    }

    /**
     * @private
     * @return {boolean}
     * @param data {*}
     */
    _validateReserveData(data) {
        return true;
        // return !!(data &&
        //     data.reservation_request_id &&
        //     data.journey_id )
        // &&
        // (data.passengers && Array.isArray(data.passengers) && data.passengers.length > 0) &&
        // data.language &&
        // data.phone_number) ;
    }
}
