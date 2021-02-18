import bfastnode from "bfastnode";
const {bfast, BFast} = bfastnode;

export const serviceDiscoveryApi = BFast.functions().onHttpRequest('/.well-known/tz-UTS-server', (request, response) => {
    const hostPath = "https" + '://' + request.get('host') ;
    const result = {
        journeys_update_endpoint_url: `${hostPath}/journey/update`,
        search_endpoint_url: `${hostPath}/journey/search`,
        jwks_uri: `${hostPath}/jwks`
    }

    response.json(result);
});
