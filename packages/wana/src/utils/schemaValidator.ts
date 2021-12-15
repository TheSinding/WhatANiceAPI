import addFormats from 'ajv-formats'
import Ajv from 'ajv/dist/2019'

const ajv = new Ajv();

addFormats(ajv, [
	'date-time',
	'time',
	'date',
	'email',
	'hostname',
	'ipv4',
	'ipv6',
	'uri',
	'uri-reference',
	'uuid',
	'uri-template',
	'json-pointer',
	'relative-json-pointer',
	'regex'
]).addKeyword('kind')
	.addKeyword('modifier')

const { validate } = ajv

export { validate, ajv }