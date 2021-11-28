declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.gif';
declare module '*.svg';
declare module '*.bmp';
declare module '*.ttf';
declare module '*.woff';
declare module '*.woff2';

declare module '*.less' {
	const resource: {[key: string]: string};
	export = resource;
}

declare module '*.scss' {
	const resource: {[key: string]: string};
	export = resource;
}

declare module '*.styl' {
	const resource: {[key: string]: string};
	export = resource;
}
