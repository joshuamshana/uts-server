import bfastnode from "bfastnode";
import {JourneyService} from "../services/journey.service.mjs";

const {bfast, BFast} = bfastnode;
const journeyService = new JourneyService();
const ndicUrl = "http://41.59.225.242/.well-known/tz-uts-server";

function validateJourneyList(body) {
    return (
        body && Array.isArray(body) &&
        body.every((journey) => {
            return (
                journey["journey_id"]
                // &&
                // journey["journey_endpoint_url"] &&
                // journey["company_name"] &&
                // journey["brand_name"] &&
                // journey["schedule_id"] &&
                // journey["schedule_name"] &&
                // journey["schedule_bus_plate_number"] &&
                // journey["amenities"] &&
                // journey["class"] &&
                // journey["origin"] &&
                // journey["destination"] &&
                // journey["destination_search_token"] &&
                // journey["origin_search_tokens"] &&
                // journey["trip_id"] &&
                // journey["bus_plate_number"] &&
                // journey["origin"] &&
                // journey["seats"] &&
                // journey["price"] &&
                // journey["pickup_up_points"] &&
                // journey["drop_off_points"] &&
                // journey["departure_date"] &&
                // journey["departure_time"] &&
                // journey["arrival_date"] &&
                // journey["arrival_time"] &&
                // journey["last_modified"]
            )
        }))
}

export const push = bfast.functions().onJob(
    {second: "*/30"},
    _ => {
        bfast.functions().request(ndicUrl).get()  // get credentials from NDIC
            .then(creds => {
                return {
                    url: creds["journeys_update_endpoint_url"],
                    jwks_uri: creds["jwks_uri"]
                }
            })
            .then(async data => { // get journeys
                const busPoaJourneysApi = "https://buspoa.co.tz/manifest/utsrequest.php";
                const journeys = await bfast.functions().request(busPoaJourneysApi).get()
                console.log(journeys)
                if (journeys && Array.isArray(journeys) && journeys.length > 0 && validateJourneyList(journeys)) {
                    const hash = CryptoService.hash(journeys);
                    const isSent = await jobService.isJobSent(hash)
                    if (isSent === true) {
                        throw {message: 'journeys already sent'};
                    } else {
                        return {
                            journeys,
                            ...data
                        }
                    }
                } else {
                    throw {message: 'no journeys available'};
                }
            })
            .then(async (data) => {  // send journeys to NDIC
                console.log(data)
                // return bfast.functions().request(ndicUrl).post(
                //     data["journeys"],
                // );
            })
            .then(console.log)
            .catch(console.warn)
    });
