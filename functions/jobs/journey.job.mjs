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

            //    let journeys = await bfast.functions().request(busPoaJourneysApi).get();
                let journeys = [
                    {
                    "journey_id": "127",
                    "journey_endpoint_url": "https:\/\/buspoa.co.tz\/manifest\/journeys.php?idc=127",
                    "company": "AIR FORCE ONE",
                    "trip_id": "127",
                    "trip_name": "DAR - CHALINZE - ARUSHA",
                    "bus_plate_number": "T 130 DGN",
                    "amenities": ["tv", "ac"],
                    "class": "Semi Luxuly",
                    "origin": "Semi Luxuly",
                    "orirgin_search_tokens": "Ubungo,Shekilango,Arusha Stendi Kuu,Moshi,Chalinze,Dar es Salaam,Arusha",
                    "destination": "Arusha",
                    "destination_search_tokens": "Ubungo,Shekilango,Arusha Stendi Kuu,Moshi,Chalinze,Dar es Salaam,Arusha",
                    "via": "DAR - CHALINZE - ARUSHA",
                    "image": "https=>\/\/",
                    "seats": {
                        "1": "{\"label\":\"A1\",\"position_x\":\"1\",\"position_y\":1,\"available\":true}",
                        "2": "{\"label\":\"A2\",\"position_x\":\"2\",\"position_y\":1,\"available\":true}",
                        "3": "{\"label\":\"A3\",\"position_x\":\"3\",\"position_y\":1,\"available\":true}",
                        "4": "{\"label\":\"A4\",\"position_x\":\"4\",\"position_y\":1,\"available\":true}",
                        "5": "{\"label\":\"B1\",\"position_x\":\"1\",\"position_y\":2,\"available\":true}",
                        "6": "{\"label\":\"B2\",\"position_x\":\"2\",\"position_y\":2,\"available\":true}",
                        "7": "{\"label\":\"B3\",\"position_x\":\"3\",\"position_y\":2,\"available\":true}",
                        "8": "{\"label\":\"B4\",\"position_x\":\"4\",\"position_y\":2,\"available\":true}",
                        "9": "{\"label\":\"C1\",\"position_x\":\"1\",\"position_y\":3,\"available\":true}",
                        "10": "{\"label\":\"C2\",\"position_x\":\"2\",\"position_y\":3,\"available\":true}",
                        "11": "{\"label\":\"C3\",\"position_x\":\"3\",\"position_y\":3,\"available\":true}",
                        "12": "{\"label\":\"C4\",\"position_x\":\"4\",\"position_y\":3,\"available\":true}",
                        "13": "{\"label\":\"D1\",\"position_x\":\"1\",\"position_y\":4,\"available\":true}",
                        "14": "{\"label\":\"D2\",\"position_x\":\"2\",\"position_y\":4,\"available\":true}",
                        "15": "{\"label\":\"D3\",\"position_x\":\"3\",\"position_y\":4,\"available\":true}",
                        "16": "{\"label\":\"D4\",\"position_x\":\"4\",\"position_y\":4,\"available\":true}",
                        "17": "{\"label\":\"E1\",\"position_x\":\"1\",\"position_y\":5,\"available\":true}",
                        "18": "{\"label\":\"E2\",\"position_x\":\"2\",\"position_y\":5,\"available\":true}",
                        "19": "{\"label\":\"E3\",\"position_x\":\"3\",\"position_y\":5,\"available\":true}",
                        "20": "{\"label\":\"E4\",\"position_x\":\"4\",\"position_y\":5,\"available\":true}",
                        "21": "{\"label\":\"F1\",\"position_x\":\"1\",\"position_y\":6,\"available\":true}",
                        "22": "{\"label\":\"F2\",\"position_x\":\"2\",\"position_y\":6,\"available\":true}",
                        "23": "{\"label\":\"F3\",\"position_x\":\"3\",\"position_y\":6,\"available\":true}",
                        "24": "{\"label\":\"F4\",\"position_x\":\"4\",\"position_y\":6,\"available\":true}",
                        "25": "{\"label\":\"G1\",\"position_x\":\"1\",\"position_y\":7,\"available\":true}",
                        "26": "{\"label\":\"G2\",\"position_x\":\"2\",\"position_y\":7,\"available\":true}",
                        "27": "{\"label\":\"G3\",\"position_x\":\"3\",\"position_y\":7,\"available\":true}",
                        "28": "{\"label\":\"G4\",\"position_x\":\"4\",\"position_y\":7,\"available\":true}",
                        "29": "{\"label\":\"H1\",\"position_x\":\"1\",\"position_y\":8,\"available\":true}",
                        "30": "{\"label\":\"H2\",\"position_x\":\"2\",\"position_y\":8,\"available\":true}",
                        "31": "{\"label\":\"H3\",\"position_x\":\"3\",\"position_y\":8,\"available\":true}",
                        "32": "{\"label\":\"H4\",\"position_x\":\"4\",\"position_y\":8,\"available\":true}",
                        "33": "{\"label\":\"I1\",\"position_x\":\"1\",\"position_y\":9,\"available\":true}",
                        "34": "{\"label\":\"I2\",\"position_x\":\"2\",\"position_y\":9,\"available\":true}",
                        "35": "{\"label\":\"I3\",\"position_x\":\"3\",\"position_y\":9,\"available\":true}",
                        "36": "{\"label\":\"I4\",\"position_x\":\"4\",\"position_y\":9,\"available\":true}",
                        "37": "{\"label\":\"J1\",\"position_x\":\"1\",\"position_y\":10,\"available\":true}",
                        "38": "{\"label\":\"J2\",\"position_x\":\"2\",\"position_y\":10,\"available\":true}",
                        "39": "{\"label\":\"J3\",\"position_x\":\"3\",\"position_y\":10,\"available\":true}",
                        "40": "{\"label\":\"J4\",\"position_x\":\"4\",\"position_y\":10,\"available\":true}"
                    },
                    "price": "12500.00",
                    "pickup_up_points": "Ubungo,Shekilango,Arusha Stendi Kuu,Moshi,Chalinze,Dar es Salaam,Arusha",
                    "drop_off_points": "Ubungo,Shekilango,Arusha Stendi Kuu,Moshi,Chalinze,Dar es Salaam,Arusha",
                    "departure_date": "2021-02-19 06:30:00",
                    "departure_time": "2021-02-19 06:30:00",
                    "arrival_date": "2021-02-19 06:30:00",
                    "arrival_time": "2021-02-19 06:30:00"
                },
                    {
                        "journey_id": "134",
                        "journey_endpoint_url": "https:\/\/buspoa.co.tz\/manifest\/journeys.php?idc=134",
                        "company": "AIR FORCE ONE",
                        "trip_id": "134",
                        "trip_name": "DAR - CHALINZE - ARUSHA",
                        "bus_plate_number": "T 130 DGN",
                        "amenities": ["tv", "ac"],
                        "class": "Semi Luxuly",
                        "origin": "Semi Luxuly",
                        "orirgin_search_tokens": "Ubungo,Shekilango,Arusha Stendi Kuu,Moshi,Chalinze,Dar es Salaam,Arusha",
                        "destination": "Arusha",
                        "destination_search_tokens": "Ubungo,Shekilango,Arusha Stendi Kuu,Moshi,Chalinze,Dar es Salaam,Arusha",
                        "via": "DAR - CHALINZE - ARUSHA",
                        "image": "https=>\/\/",
                        "seats": {
                            "1": "{\"label\":\"A1\",\"position_x\":\"1\",\"position_y\":1,\"available\":true}",
                            "2": "{\"label\":\"A2\",\"position_x\":\"2\",\"position_y\":1,\"available\":true}",
                            "3": "{\"label\":\"A3\",\"position_x\":\"3\",\"position_y\":1,\"available\":true}",
                            "4": "{\"label\":\"A4\",\"position_x\":\"4\",\"position_y\":1,\"available\":true}",
                            "5": "{\"label\":\"B1\",\"position_x\":\"1\",\"position_y\":2,\"available\":true}",
                            "6": "{\"label\":\"B2\",\"position_x\":\"2\",\"position_y\":2,\"available\":true}",
                            "7": "{\"label\":\"B3\",\"position_x\":\"3\",\"position_y\":2,\"available\":true}",
                            "8": "{\"label\":\"B4\",\"position_x\":\"4\",\"position_y\":2,\"available\":true}",
                            "9": "{\"label\":\"C1\",\"position_x\":\"1\",\"position_y\":3,\"available\":true}",
                            "10": "{\"label\":\"C2\",\"position_x\":\"2\",\"position_y\":3,\"available\":true}",
                            "11": "{\"label\":\"C3\",\"position_x\":\"3\",\"position_y\":3,\"available\":true}",
                            "12": "{\"label\":\"C4\",\"position_x\":\"4\",\"position_y\":3,\"available\":true}",
                            "13": "{\"label\":\"D1\",\"position_x\":\"1\",\"position_y\":4,\"available\":true}",
                            "14": "{\"label\":\"D2\",\"position_x\":\"2\",\"position_y\":4,\"available\":true}",
                            "15": "{\"label\":\"D3\",\"position_x\":\"3\",\"position_y\":4,\"available\":true}",
                            "16": "{\"label\":\"D4\",\"position_x\":\"4\",\"position_y\":4,\"available\":true}",
                            "17": "{\"label\":\"E1\",\"position_x\":\"1\",\"position_y\":5,\"available\":true}",
                            "18": "{\"label\":\"E2\",\"position_x\":\"2\",\"position_y\":5,\"available\":true}",
                            "19": "{\"label\":\"E3\",\"position_x\":\"3\",\"position_y\":5,\"available\":true}",
                            "20": "{\"label\":\"E4\",\"position_x\":\"4\",\"position_y\":5,\"available\":true}",
                            "21": "{\"label\":\"F1\",\"position_x\":\"1\",\"position_y\":6,\"available\":true}",
                            "22": "{\"label\":\"F2\",\"position_x\":\"2\",\"position_y\":6,\"available\":true}",
                            "23": "{\"label\":\"F3\",\"position_x\":\"3\",\"position_y\":6,\"available\":true}",
                            "24": "{\"label\":\"F4\",\"position_x\":\"4\",\"position_y\":6,\"available\":true}",
                            "25": "{\"label\":\"G1\",\"position_x\":\"1\",\"position_y\":7,\"available\":true}",
                            "26": "{\"label\":\"G2\",\"position_x\":\"2\",\"position_y\":7,\"available\":true}",
                            "27": "{\"label\":\"G3\",\"position_x\":\"3\",\"position_y\":7,\"available\":true}",
                            "28": "{\"label\":\"G4\",\"position_x\":\"4\",\"position_y\":7,\"available\":true}",
                            "29": "{\"label\":\"H1\",\"position_x\":\"1\",\"position_y\":8,\"available\":true}",
                            "30": "{\"label\":\"H2\",\"position_x\":\"2\",\"position_y\":8,\"available\":true}",
                            "31": "{\"label\":\"H3\",\"position_x\":\"3\",\"position_y\":8,\"available\":true}",
                            "32": "{\"label\":\"H4\",\"position_x\":\"4\",\"position_y\":8,\"available\":true}",
                            "33": "{\"label\":\"I1\",\"position_x\":\"1\",\"position_y\":9,\"available\":true}",
                            "34": "{\"label\":\"I2\",\"position_x\":\"2\",\"position_y\":9,\"available\":true}",
                            "35": "{\"label\":\"I3\",\"position_x\":\"3\",\"position_y\":9,\"available\":true}",
                            "36": "{\"label\":\"I4\",\"position_x\":\"4\",\"position_y\":9,\"available\":true}",
                            "37": "{\"label\":\"J1\",\"position_x\":\"1\",\"position_y\":10,\"available\":true}",
                            "38": "{\"label\":\"J2\",\"position_x\":\"2\",\"position_y\":10,\"available\":true}",
                            "39": "{\"label\":\"J3\",\"position_x\":\"3\",\"position_y\":10,\"available\":true}",
                            "40": "{\"label\":\"J4\",\"position_x\":\"4\",\"position_y\":10,\"available\":true}"
                        },
                        "price": "12500.00",
                        "pickup_up_points": "Ubungo,Shekilango,Arusha Stendi Kuu,Moshi,Chalinze,Dar es Salaam,Arusha",
                        "drop_off_points": "Ubungo,Shekilango,Arusha Stendi Kuu,Moshi,Chalinze,Dar es Salaam,Arusha",
                        "departure_date": "2021-02-19 21:59:00",
                        "departure_time": "2021-02-19 21:59:00",
                        "arrival_date": "2021-02-19 21:59:00",
                        "arrival_time": "2021-02-19 21:59:00"
                    }]
                if (journeys && Array.isArray(journeys) && journeys.length > 0 && validateJourneyList(journeys)) {
                    const hash = CryptoService.hash(journeys);
                    const isSent = await jobService.isJobSent(hash)
                    console.log(isSent);
                    if (isSent === true) {
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
                const result = await bfast.functions().request(ndicUrl).post(
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
            .catch(console.warn)
    });
