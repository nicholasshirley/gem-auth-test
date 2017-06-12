//client code
export const UNABLE_INITIALIZE = 1
export const UNABLE_PARSE_JSON = 2
export const WAITING_LIMIT     = 3

//http code
export const HTTP_OK                    = 200
export const HTTP_CREATED               = 201
export const HTTP_NO_CONTENT            = 204
export const HTTP_BAD_REQUEST           = 400
export const HTTP_UNAUTHORIZED          = 401
export const HTTP_FORBIDDEN             = 403
export const HTTP_NOT_FOUND             = 404
export const HTTP_METHOD_NOT_ALLOWED    = 405

export const HTTP_UNPROCESSABLE_ENTITY  = 422

export const HTTP_INTERNAL_SERVER_ERROR = 500
export const HTTP_BAD_GATEWAY           = 502
export const HTTP_SERVICE_UNAVAILABLE   = 503

export const isHttpSuccessCode = code => {
	return (parseInt(code/100, 10) === 2) // radix 10
}


export const HTTP_MESSAGE = {
	1:{
		message    : 'Unable connect to server.',
		message_dev: 'Connection unable initialize. Network have some problem'
	},
	2:{
		message    : 'System have error. Please contact to Admin Website',
		message_dev: 'Json parse error. APIs system have a bug'
	},
	3:{
		message    : 'Connect initialize too long. Could server too busy or you internet too slow. Please come back after some minutes',
		message_dev: 'Ability server too overload or had a error.'
	},
	200: {
		message: 'Success',
		message_dev: 'Completed request'
	},
	201: {
		message: 'not defined',
		message_dev: 'Completed request'
	},
	204: {
		message: 'not defined',
		message_dev: 'Completed request'
	},
	400: {
		message: 'not defined',
		message_dev: 'Completed request'
	},
	401: {
		message: 'Username and password incorrect.',
		message_dev: ''
	},
	403: {
		message: 'not defined',
		message_dev: 'Completed request'
	},
	404: {
		message: 'not defined',
		message_dev: 'Completed request'
	},
	405: {
		message: 'not defined',
		message_dev: 'Completed request'
	},
	422: {
		message: 'Validation error.',
		message_dev: 'Validation error.'
	},
	500: {
		message: 'not defined',
		message_dev: 'Completed request'
	},
	402: {
		message: 'not defined',
		message_dev: 'Completed request'
	},
	503: {
		message: 'not defined',
		message_dev: 'Completed request'
	}
}