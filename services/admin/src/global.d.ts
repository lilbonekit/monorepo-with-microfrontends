declare module '*.module.scss' {
	interface IClassNames {
		[className: string]: string
	}

	const classNames: IClassNames
	export = classNames
}

declare module '*.png'
declare module '*.jpg'

declare module '*.svg' {
	import * as React from 'react'

	const ReactComponent: React.FunctionComponent<
		React.SVGProps<SVGSVGElement> & { title?: string }
	>

	export default ReactComponent
}

declare const __PLATFORM__: 'desktop' | 'mobile'
declare const __ENV__: 'production' | 'development'
