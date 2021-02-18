// import bfastnode from "bfastnode";
// import {JourneyService} from "../services/journey.service.mjs";
//
// const {bfast, BFast} = bfastnode;
// const journeyService = new JourneyService();
//
// function validateJourneyList(body) {
//     return (
//         body && Array.isArray(body) &&
//         body.every((journey) => {
//             return (
//                 journey["journey_id"]
//                 // &&
//                 // journey["journey_endpoint_url"] &&
//                 // journey["company_name"] &&
//                 // journey["brand_name"] &&
//                 // journey["schedule_id"] &&
//                 // journey["schedule_name"] &&
//                 // journey["schedule_bus_plate_number"] &&
//                 // journey["amenities"] &&
//                 // journey["class"] &&
//                 // journey["origin"] &&
//                 // journey["destination"] &&
//                 // journey["destination_search_token"] &&
//                 // journey["origin_search_tokens"] &&
//                 // journey["trip_id"] &&
//                 // journey["bus_plate_number"] &&
//                 // journey["origin"] &&
//                 // journey["seats"] &&
//                 // journey["price"] &&
//                 // journey["pickup_up_points"] &&
//                 // journey["drop_off_points"] &&
//                 // journey["departure_date"] &&
//                 // journey["departure_time"] &&
//                 // journey["arrival_date"] &&
//                 // journey["arrival_time"] &&
//                 // journey["last_modified"]
//         )
//         }))
// }
//
// export const updateJourneyApi = BFast.functions().onPostHttpRequest(
//     '/journey/update',
//     (request, response) => {
//         const body = request.body;
//
//         if (validateJourneyList(body)) {
//             const journeys = body.map(journey => {
//                 return {
//                     id: journey['journey_id'],
//                     ...journey
//                 }
//             });
//
//             journeyService.saveJourneys(journeys).then(
//                 result => {
//                     response.status(200).json(result);
//                 }
//
//             ).catch(err => {
//                 console.warn({message: err})
//                 response.status(404).json({message: "Failed to save journies"})
//             });
//         } else{
//
//             response.status(404).json({message: "Failed to save journies"})
//         }
//
//
//     });
//
// export const searchJourneyApi = BFast.functions().onHttpRequest('/journey/search', (request, response) => {
//     const hostPath = "https" + '://' + request.get('host');
//     const result = {
//         journeys_update_endpoint_url: `${hostPath}/journey/update`,
//         search_endpoint_url: `${hostPath}/journey/search`,
//         jwks_uri: `${hostPath}/jwks`
//     }
//
//     response.json(result);
// });
