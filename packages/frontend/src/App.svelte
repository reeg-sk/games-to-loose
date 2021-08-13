<script>
  import Logo from "./components/icons/Logo.svelte";
  import Modal from "./components/Modal.svelte";
  import New from "./components/New.svelte";
  import Winner from "./components/Winner.svelte";

  import { username } from "./store.js";

  export let socket;

  let activeUsers = 0;

  socket.on("user:join", (data) => {
    activeUsers = data.usersCount;
  });

  socket.on("user:left", (data) => {
    activeUsers = data.usersCount;
  });

  socket.on("room:join", (data) => {
    // nothing yet
  });

  socket.on("room:failed", () => {
    console.log("unallowed");
  });

  const createRoom = () => {
    socket.emit("room:create", {
      username,
    });
  };
</script>

<div class="z-0 absolute w-full h-full">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 800 800"
  >
    <rect fill="#000000" width="800" height="800" />
    <g>
      <circle fill="#000000" cx="400" cy="400" r="600" />
      <circle fill="#180d1c" cx="400" cy="400" r="500" />
      <circle fill="#261431" cx="400" cy="400" r="400" />
      <circle fill="#351947" cx="400" cy="400" r="300" />
      <circle fill="#451e5e" cx="400" cy="400" r="200" />
      <circle fill="#552277" cx="400" cy="400" r="100" />
    </g>
  </svg>
</div>
<main
  class="z-10 flex flex-col items-center justify-center min-h-screen py-2 bg-gray-800 opacity-95 text-white font-mono"
>
  <Modal />
  <div class="flex flex-col items-center py-2 pb-8">
    <Logo />
    <h1 class="font-bold text-4xl">Games To L<s>oo</s>se</h1>
  </div>
  <div class="py-2">
    <h2 class="text-lg text-center mb-4 ">
      👋 Hello <b>{$username}</b>!
    </h2>
    <button
      class="bg-green-700 hover:bg-green-600 py-2 px-6 rounded-sm"
      disabled={!$username}
      on:click={createRoom}
    >
      Create room <New />
    </button>
    <p class="text-center mt-2 text-sm">
      {activeUsers} active {activeUsers == 1 ? "user" : "users"}
    </p>
  </div>
</main>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
