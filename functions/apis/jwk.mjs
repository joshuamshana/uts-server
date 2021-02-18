import bfastnode from "bfastnode";
import {SecretsUtil} from "../utils/secrets.util.mjs";

const {bfast} = bfastnode;

export const jwkUrl = bfast.functions().onHttpRequest(
    '/auth/jwk',
    (request, response) => {
        response.json(SecretsUtil.publicKey);
    }
)
