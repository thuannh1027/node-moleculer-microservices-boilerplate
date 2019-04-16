const { Errors } = require("moleculer")

// common schema for services
module.exports = {
	actions: {
		ping() {
			return this.ok("OK");
		}
	},
	meta: {
		scalable: true
	},
	settings: {
		upperCase: true
	},
	methods: {
		ok(result) {
			return {
				code: 200,
				message: "Success",			
				status:"true",
				data: result
			}
		},
		badRequest(error) {
			return new Errors.MoleculerError("Bad Request", 400, "ERR_CRITIAL", { code: 400, message: error });
		},
		notFound(error) {
			return new Errors.MoleculerError("Not Found", 404, "WRONG_MISSING_ACTION", { code: 404, message: error });
		},
		internalServerError(error) {
			return new Errors.MoleculerError("Internal Server Error", 500, "ERR_CRITIAL", { code: 500, message: error });
		},
		authInvalid(error) {
			return new Errors.MoleculerError("Invalid Authentication", 401, "AUTH_INVALID", { code: 401, message: error });
		}
	}
};