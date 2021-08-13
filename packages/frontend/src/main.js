import App from './App.svelte';
import socket from './socket';

const app = new App({
	target: document.body,
	props: {
		socket: socket
	}
});

export default app;