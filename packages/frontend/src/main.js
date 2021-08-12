import App from './App.svelte';
import socket from './socket';

const app = new App({
	target: document.body,
	name: "gtl",
	props: {
		name: 'world',
		socket: socket
	}
});

export default app;