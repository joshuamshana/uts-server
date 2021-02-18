import bfastnode from "bfastnode";
const {bfast, BFast} = bfastnode;

export const serviceDiscoveryApi = BFast.functions().onHttpRequest('/.well-known/tz-e-ticketing-server', (request, response) => {
    const hostPath = "https" + '://' + request.get('host') ;
    const result = {
        reserve_endpoint_url: `${hostPath}/journey/reserve`,
        jwks_uri: `${hostPath}/jwks`,
        vendor_name: `BUS POA`
    }

    response.json(result);
});
