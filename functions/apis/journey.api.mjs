import bfastnode from "bfastnode";

const {bfast, BFast} = bfastnode;

function validateJourneyList(body) {
    return (
        body && Array.isArray(body) &&
        body.every((journey) => {
            return (
                journey["journey_id"] &&
                journey["journey_endpoint_url"] &&
                journey["company"] &&
                journey["trip_id"] &&
                journey["bus_plate_number"] &&
                journey["origin"] &&
                journey["seats"] &&
                journey["pickup_up_points"] &&
                journey["departure_date"] &&
                journey["departure_time"] &&
                journey["arrival_date"] &&
                journey["arrival_time"]
            )
        }))
}

export const updateJourneyApi = BFast.functions().onPostHttpRequest(
    '/journey/update',
    (request, response) => {
        const body = request.body;

        if (validateJourneyList(body)) {

        }

        response.json([]);
    });

export const searchJourneyApi = BFast.functions().onHttpRequest('/journey/search', (request, response) => {
    const hostPath = "https" + '://' + request.get('host');
    const result = {
        journeys_update_endpoint_url: `${hostPath}/journey/update`,
        search_endpoint_url: `${hostPath}/journey/search`,
        jwks_uri: `${hostPath}/jwks`
    }

    response.json(result);
});
