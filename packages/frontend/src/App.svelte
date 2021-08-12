<script>
  import Logo from "./components/icons/Logo.svelte";
  import Modal from "./components/Modal.svelte";
  import New from "./components/New.svelte";
  import Winner from "./components/Winner.svelte";

  import { username } from "./store.js";

  export let socket;

  let activeUsers = 0;

  socket.on("user:join", (data) => {
    activeUsers = data.users_count;
  });
</script>

<main
  class="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-800 text-white font-mono"
>
  <Modal />
  <div class="flex flex-col items-center py-2 pb-8">
    <Logo />
    <h1 class="font-bold text-4xl">Games To Loose</h1>
  </div>
  <div class="py-2">
    <h2 class="text-lg text-center mb-4 ">
      Hello <b>{$username}</b>!
    </h2>
    <button
      class="bg-green-700 hover:bg-green-600 py-2 px-6 rounded-sm"
      disabled={!$username}
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
