const { Service } = require("moleculer")
const ApiGateway = require("moleculer-web");
const BaseService = require("../../mixins/base.mixin")
const { API_GATEWAY_SERVICE } = require("../../constants/service-names")
const ApiRoutes = require("./apiGateway.routes")
const { INVALID_JWT_TOKEN, REQUIRED_TOKEN } = require("../../constants/messages")
const { Errors } = require("moleculer")
const { Env } = require("../../config")

class ApiService extends Service {
	constructor(broker) {
		super(broker);

		this.parseServiceSchema({
			name: API_GATEWAY_SERVICE,
			mixins: [ApiGateway, BaseService],
			settings: {
				port: process.env.PORT || Env.port,
				cors: {
					origin: "*",
					methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
					allowedHeaders: "*"
				},
				rateLimit: {
					window: 10 * 1000,
					limit: 30,
					headers: true
				},
				etag: true,
				path: "/api",
				routes: ApiRoutes,
				assets: {
					folder: "public"
				}
			},
			events: {
				"node.broken"(node) {
					this.logger.warn(`The ${node.id} node is disconnected!`);
				}
			},
			methods: {
				/**
				 * authorize the request
				 */
				authorize(ctx, route, req) {
					if (req.$endpoint && req.$endpoint.action.ignoreAuth) return;
					if (req.$alias && req.$alias.ignoreAuth) return;

					let authValue = req.headers["authorization"];
					if (authValue && authValue.startsWith("Bearer ")) {
						let token = authValue.slice(7);

						// verify jwt token
						return ctx.call("users.verifyToken", { token })
							.then(decoded => {
								// check the user role
								// if (route.opts.roles.indexOf(decoded.role) === -1)
								// 	return this.Promise.reject(new ForbiddenError());

								// if authorization was success, we set the user entity to ctx.meta
								return ctx.call("users.getUserById", { id: decoded.scope.id }).then(user => {
									ctx.meta.curUser = user;
								});
							})
							.catch(err => {
								if (err instanceof Errors.MoleculerError)
									return this.Promise.reject(err);

								return this.Promise.reject(this.authInvalid(INVALID_JWT_TOKEN));
							});
					}

					return this.Promise.reject(this.authInvalid(REQUIRED_TOKEN));
				}
			}
		});
	}
}

module.exports = ApiService
