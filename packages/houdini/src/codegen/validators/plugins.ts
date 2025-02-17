import type { Config } from '../../lib/config'
import type { Document } from '../../lib/types'

export default async function validatePlugins(config: Config, documents: Document[]) {
	let errors: unknown[] = []

	for (const plugin of config.plugins) {
		if (!plugin.validate) {
			continue
		}

		try {
			await plugin.validate({ config, documents })
		} catch (err) {
			errors.push(err)
		}
	}

	if (errors.length > 0) {
		throw errors
	}
}
