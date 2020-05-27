'use strict';

class UserDTO {

	constructor(document, name, password) {

		this.document = document,
		this.name = name,
		this.password = password;

	}

	static fromJson(json) {

		return new UserDTO(json.document, json.name, json.password);

	}

}

module.exports = UserDTO;