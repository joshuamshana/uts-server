import bfastnode from "bfastnode";
import {JourneyService} from "../services/journey.service.mjs";

const {bfast, BFast} = bfastnode;

export const reserveApi = BFast.functions().onPostHttpRequest(
    '/update',
    (request, response) => {
        const body = request.body;

//         if () {
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
        response.status(200).json(body);

    });
