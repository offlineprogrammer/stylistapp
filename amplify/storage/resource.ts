
import { defineStorage } from '@aws-amplify/backend'

export const storage = defineStorage({
	name: 'productsBucket',
	access: (allow) => ({
		'products/*': [allow.authenticated.to(['read', 'write'])],
	}),
})