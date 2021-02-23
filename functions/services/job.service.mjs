import bfastnode from 'bfastnode';
import {CryptoService} from "./crypto.service.mjs";
import {AuthorizationController} from "../controller/authorization.controller.mjs";
import {SecretsUtil} from "../utils/secrets.util.mjs";

const ndicUrl = "http://41.59.225.242/.well-known/tz-uts-server";
const busPoaJourneysApi = "https://buspoa.co.tz/manifest/utsrequest.php";
const {BFast, bfast} = bfastnode;

function validateJourneyList(body) {
    return (
        body && Array.isArray(body) &&
        body.every((journey) => {
            return (
                journey["journey_id"]
            )
        })
    );
}

export class JobService {
    /**
     *
     * @param job {{date: Date, id: string}}
     * @return {Promise<*>}
     */
    async registerJob(job) {
        // console.log(job);
        let _job = null;
        try {
            _job = await bfast.database().table('jobs').get(job.id);
        } catch (e) {
        }

        if (_job) {
            return bfast.database().collection('jobs').query().byId(job.id)
                .updateBuilder()
                .set('date', job.date)
                .update();
        } else {
            return bfast.database().collection('jobs').save(job);
        }
    }

    async isJobSent(hash) {
        try {
            const job = await bfast.database().collection('jobs').get(hash);
            return !!(job && job.date);
        } catch (e) {
            return false;
        }
    }

    async sendJourneyJob() {
        bfast.functions().request(ndicUrl).get()  // get credentials from NDIC
            .then(creds => {
                return {
                    url: creds["journeys_update_endpoint_url"],
                    jwks_uri: creds["jwks_uri"]
                }
            })
            .then(async data => {
                let journeys = await bfast.functions().request(busPoaJourneysApi).get();
                journeys = journeys.map(x => {
                    x.class = x.class.toString().replace('Luxuly', 'Luxury').trim();
                    return x;
                });
                if (journeys && Array.isArray(journeys) && journeys.length > 0 && validateJourneyList(journeys)) {
                    const hash = CryptoService.hash(journeys);
                    const isSent = await this.isJobSent(hash)
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
                return this.registerJob({
                    id: data.hash,
                    date: new Date()
                })
            })
            .catch(reason => {
                console.log(reason && reason.response ? reason.response.data : reason);
            });
        return '*****job executed*********';
    }
}
