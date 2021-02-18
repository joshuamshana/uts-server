import nodeJwk from 'node-jwk';
import njwt from 'njwt';

const keyPair = {
    "p": "wvdUbwdmAxabksyuH2j5B2-8MXtR6ve0eT2yoDP_X8_9uHYM9my-xuSJftXLtiX1coJpiOKFKhUXuw1RQnllNQk8kg5cJVR3YLmkB3wURGo3O-uE1jz8wN8W9hRLBgmLOfkTeVWH5Rszj2OxtPfQqptSIelOl5oemYMdzpFrTZs",
    "kty": "RSA",
    "q": "sy0_uQexo9UQMAqFDPDhP-gD5WldUm0AEIFM-y1uBYRajnrnJRDr1_XynoypxOzvlhbLKtx7shEctXIdYe9lCSYYzWvrvl8VP3RKZAyxgAWXZ11n9DppgGlMLkUgjnt1F2wCa7NqD46P-yv8rk0DW-BDNmZoKQyMDhhcWVIWNr0",
    "d": "FKA6JmV76m6fyWXc8Sops1J-HAyX2FfGJMYWeQG1R33UawZPm1pQedHw10bkgHMp5RaUGboS7_OMVTYHyVUsOucMlLWgegYhDocUQ2CwaGer-D6VZxZ52elbJ1G4C9YBEbEWYEO32uxKxGAvRxhq_jfWu36k5cBlDX_pWQBCAFGkveJv4wITEWJIo7XOeS78Rem-gJ7HlOQTbuZ7rpUNiPYk8zKiHrzc961mewcWoSSm6vyLkEZh0ES_rytr6_wnO1Cl5B8-rb-9x53bMMGaGlkFpAfJiTRkBf6c2wcsUR1BF9oRVVaQTnZwHz8eD6gWeWI10Qeco107bcER-TrCsQ",
    "e": "AQAB",
    "use": "enc",
    "kid": "HZ0bjyqLyaG7F9KlVox84lMOJBchEdnMCdxwf4m0iYI",
    "qi": "H9DRvCXM-wLuwVEF3qFeklTUTHfJafpYKqZnVk3BPkh0T14ES2OWe4EAGpkJJXGSJAWazwZWrZwwvLdbH6Q28I7m1okkkRQ-nHXtiuB4MJGIls8vlWg6bIV55rvdV3S7uDRXqmOhsVCFXINUfyF0dcAqOnj2sSlVPV6PsNKaico",
    "dp": "NsPUws9YN1vdXXIDIy2QbidTvK6ARzlHR5suFtQkUtyQz4TRhVLsj9_YQ3l4nHSzKnQ5gsrmTvjXzqIiBkMlS62JhxljhtTgJ5pd2gBfjQws8bbpfGhrMx43S-5NWKfLpQAzGS0OXCu04v1FCKlnwtSYUJBBlFIlcEelUsYEVys",
    "alg": "RSA1_5",
    "dq": "kTnov1FEI1VrdHTiWJXZDJJCrixTjp54geg7fA7bcS9QstFdDkcD0ZwwlV_PrqSYoJ9C9y-UNsT17v9aX2nJC7xMOBv0DO5Ga5MXRLahG_HsQMSNoH_DyWgPbiVrePEJ-_z4jVDzcz6K5vtFKAWV5l8EO1CPtk3MKxSFrYQCK0U",
    "n": "iHVmC0IQBTv2E67p5688xO2VzLGxdjIYndrER4myz_X4edemUP1cDlPnOOYz-p2z0lJq_2JgFas-GCWMuV7H0cYzrfrcsIXXs7cXeiiEIyX_sA5pRoxMtjlLokOxKuaK0gDunecXK_0Lv_xffzDlqBqXUaXEQuo1mHJMnzvgy_Lp2vT1SgNkpTTVIyNPeKS31ZsX1UN65Bob8Fs1lkTtx81_kmjL4OCFcB_2hyUMeNouXxjbkL49O2kbKY8T1CS5fluoelyi3H7QOwzVCnkJOrQE8lYdjRsIO0aHriJTCn6kvbR_WoCz7WNedw8gM1y83lIvM5T-O-6XJSElT-j9bw"
}
const publicKey = {
    "kty": "RSA",
    "e": "AQAB",
    "use": "enc",
    "kid": "HZ0bjyqLyaG7F9KlVox84lMOJBchEdnMCdxwf4m0iYI",
    "alg": "RSA1_5",
    "n": "iHVmC0IQBTv2E67p5688xO2VzLGxdjIYndrER4myz_X4edemUP1cDlPnOOYz-p2z0lJq_2JgFas-GCWMuV7H0cYzrfrcsIXXs7cXeiiEIyX_sA5pRoxMtjlLokOxKuaK0gDunecXK_0Lv_xffzDlqBqXUaXEQuo1mHJMnzvgy_Lp2vT1SgNkpTTVIyNPeKS31ZsX1UN65Bob8Fs1lkTtx81_kmjL4OCFcB_2hyUMeNouXxjbkL49O2kbKY8T1CS5fluoelyi3H7QOwzVCnkJOrQE8lYdjRsIO0aHriJTCn6kvbR_WoCz7WNedw8gM1y83lIvM5T-O-6XJSElT-j9bw"
}

export class AuthorizationController {
    getToken(host) {
        const time = Math.floor(new Date().getTime() / 1000);
        const claims = {
            iss: host,
            aud: host,
            iat: time,
            exp: time + 3600
        };

        const keyPEM = this.getKeySet().key.toPrivateKeyPEM();
        const jwt = njwt.create(claims, keyPEM, 'RS256');
        return jwt.compact();
    }

    getKeySet() {
        const jwk = nodeJwk.JWK.fromObject(keyPair);
        if (!jwk) {
            throw new Error('Huh, my key is not there...');
        }
        return jwk;
    }
}

