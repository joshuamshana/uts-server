import bfastnode from "bfastnode";


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
            console.log(results);
            return results;
            // return {
            //     "type": "mock",
            //     "reservation_id": reserve.reservation_request_id,
            //     "reservation_request_id": RandomUtil.uuid,
            //     "reservation_url": "https://",
            //     "journey_id": "xyz123",
            //     "expires": moment().format("YYYY-MM-DDThh:mm:ssZ"),
            //     "passengers:": [
            //         {
            //             "passenger_index": 0,
            //             "first_name": "John",
            //             "middle_name": "",
            //             "last_name": "Doe",
            //             "seat": "A1",
            //             "price": "12500.00"
            //         }
            //     ],
            // }
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
