import bfastnode from "bfastnode";
import {JourneyService} from "../services/journey.service.mjs";
import {CryptoService} from "../services/crypto.service.mjs";
import {JobService} from "../services/job.service.mjs";
import {AuthorizationController} from "../controller/authorization.controller.mjs";
import {SecretsUtil} from "../utils/secrets.util.mjs";

const {bfast, BFast} = bfastnode;
const journeyService = new JourneyService();
const jobService = new JobService();
const ndicUrl = "http://41.59.225.242/.well-known/tz-uts-server";
const busPoaJourneysApi = "https://buspoa.co.tz/manifest/utsrequest.php";

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

               let journeys = await bfast.functions().request(busPoaJourneysApi).get();
               journeys = journeys.map(x=>{
                   x.class = x.class.toString().replace('Luxuly', 'Luxury').trim();
                   return x;
               });
               console.log(journeys[0])
                if (journeys && Array.isArray(journeys) && journeys.length > 0 && validateJourneyList(journeys)) {
                    const hash = CryptoService.hash(journeys);
                     const isSent = await jobService.isJobSent(hash)
                    // console.log(isSent);
                    if (isSent) {
                        throw {message: 'journeys already sent'};
                    } else {
                        return {
                            hash,
                            journeys,
                            ...data
                        }
                    }
                } else {
                    throw {message: 'no journeys available'};
                }
            })
            .then(async (data) => {
                const result = await bfast.functions().request(data.url).post(
                    data["journeys"],
                    {
                        headers: {
                            authorization: 'Bearer ' + new AuthorizationController().getToken(SecretsUtil.keyPair)
                        }
                    }
                );
                return {
                    result,
                    ...data
                }
            })
            .then(data => {
                console.log(data.result);
                return jobService.registerJob({
                    id: data.hash,
                    date: new Date()
                })
            })
            .catch(reason => {
                console.log(reason && reason.response?reason.response.data: reason);
            })
    });
