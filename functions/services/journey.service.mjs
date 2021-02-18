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
           return bfast.database().collection(JourneyService.COLLECTION_NAME).get(journey.id).then( j => {
               if (j) {
                   return await bfast.database().collection(JourneyService.COLLECTION_NAME).query().updateBuilder().doc(journey).update();
               } else {
                   return await bfast.database().collection(JourneyService.COLLECTION_NAME).save(journey);
               }
           }).catch();

        }));

    }
}
