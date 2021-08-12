<script>
import { fade } from "svelte/transition";

  import Planet from "../components/icons/Planet.svelte";
  import { username } from "../store.js";
  import Continue from "./icons/Continue.svelte";

  let openModal = false;

  if (!$username) openModal = true;

  function toggle() {
    openModal = !openModal;
  }

  let hereBlink = false;

  const handleMouseenter = () => (hereBlink = true);
  const handleMouseleave = () => (hereBlink = false);
</script>

<svelte:body
  on:mouseenter={handleMouseenter}
  on:mouseleave={handleMouseleave} />
{#if openModal}
  <div
    class="absolute bg-black opacity-80 inset-0 z-0"
    out:fade={{ duration: 300 }}
  />
  <div
    class="absolute w-full max-w-lg p-5 py-8 mx-auto my-auto rounded-lg shadow-lg bg-gray-800 text-center z-10"
    out:fade={{ duration: 300 }}
  >
    <form on:submit|preventDefault={toggle}>
      <Planet />
      <h2 class="text-3xl mb-3">What's your name?</h2>
      <input
        type="text"
        placeholder="LazyCat332"
        bind:value={$username}
        class="block m-auto text-black py-1 px-2 rounded-sm border-2"
        class:curious={!hereBlink}
        maxLength="12"
        minLength="3"
        required
      />
      <button
        type="submit"
        class="mt-3 my-2 py-2 px-6 rounded-sm bg-red-700 hover:bg-red-600"
      >
        Continue <Continue />
      </button>
    </form>
  </div>
{/if}

<style>
  .curious {
    border-color: red;
  }
</style>
