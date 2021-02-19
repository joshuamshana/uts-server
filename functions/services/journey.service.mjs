import bfastnode from "bfastnode";

import moment from "moment";
import {RandomUtil} from "../utils/random.util.js";


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
           return bfast.database().collection(JourneyService.COLLECTION_NAME).get(journey.id).then( j => {
               if (j) {
                   return await bfast.database().collection(JourneyService.COLLECTION_NAME).query().updateBuilder().doc(journey).update();
               } else {
                   return await bfast.database().collection(JourneyService.COLLECTION_NAME).save(journey);
               }
           }).catch();

        }));

    }


    async reserveJourney(reserve) {
        if (this._validateReserveData(reserve)) {
            // todo: implement reserve from bus poa
            console.log(reserve);
            return {
                "type": "mock",
                "reservation_id": reserve.reservation_request_id,
                "reservation_request_id": RandomUtil.uuid,
                "reservation_url": "https://",
                "journey_id": "xyz123",
                "expires": moment().format("YYYY-MM-DDThh:mm:ssZ"),
                "passengers:": [
                    {
                        "passenger_index": 0,
                        "first_name": "John",
                        "middle_name": "",
                        "last_name": "Doe",
                        "seat": "A1",
                        "price": "12500.00"
                    }
                ],
            }
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
        return !!(data &&
            data.reservation_request_id &&
            data.journey_id &&
            // data.passengers &&
            data.bording_point_id &&
            data.bording_point_name &&
            data.dropoff_point_id &&
            data.dropoff_point_name);
    }
}
