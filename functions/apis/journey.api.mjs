
import bfastnode from "bfastnode";
import {JourneyService} from "../services/journey.service.mjs";

const {bfast, BFast} = bfastnode;
const journeyService = new JourneyService();

export const reserveAJourney = bfast.functions().onHttpRequest(
    '/journey/reserve',
    (request, response) => {
        const body = request.body;
        journeyService.reserveJourney(body).then(value => {
            response.status(200).json(value);
        }).catch(reason => {
            response.status(400).json(reason);
        });
    }
);

