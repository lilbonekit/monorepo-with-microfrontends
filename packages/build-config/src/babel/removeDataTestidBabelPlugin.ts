import { PluginItem } from '@babel/core'

export function removeDataTestidBabelPlugin(): PluginItem {
	return {
		visitor: {
			Program(path, state) {
				const propToRemove = state.opts.props || []

				path.traverse({
					JSXIdentifier(current) {
						const nodeName = current.node.name
						if (propToRemove.includes(nodeName)) {
							current.parentPath.remove()
						}
					},
				})
			},
		},
	}
}
