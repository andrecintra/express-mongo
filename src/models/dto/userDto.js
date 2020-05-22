"use strict";

class UserDTO {

    constructor(user) {

        this.document = user.document,
        this.name = user.name,
        this.password = user.password

    }

    static fromJson(json) {

        return new AdminDTO(json.document, json.name, json.password);

    }

}

module.exports = UserDTO;