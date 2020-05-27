"use strict";

class LoginDTO {

    constructor(document, tokens) {

        this.document = document,
        this.tokens = tokens;

    }

    static fromJson(json) {

        return new LoginDTO(json.document, json.tokens);

    }

}

module.exports = LoginDTO;