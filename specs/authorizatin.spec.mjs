import {AuthorizationController} from "../functions/controller/authorization.controller.mjs";

describe('Authorization Integration Test', function () {
    it('should return signed jwt', function () {
        const jwt = new AuthorizationController().getToken();
        console.log(jwt);
    });
    it('should return jwk', function () {
        const jwk = new AuthorizationController().getKeySet();
        console.log(jwk);
    });
});
