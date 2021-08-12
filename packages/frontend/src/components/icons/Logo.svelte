<script>
  let hue = 155;

  setInterval(() => {
    hue++;
  }, 2000);

  import { spring } from "svelte/motion";
  import { pannable } from "./pannable.js";

  const coords = spring(
    { x: 0, y: 0 },
    {
      stiffness: 0.2,
      damping: 0.4,
    }
  );

  function handlePanStart() {
    coords.stiffness = coords.damping = 1;
  }

  function handlePanMove(event) {
    coords.update(($coords) => ({
      x: $coords.x + event.detail.dx,
      y: $coords.y + event.detail.dy,
    }));
  }

  function handlePanEnd(event) {
    coords.stiffness = 0.2;
    coords.damping = 0.4;
    coords.set({ x: 0, y: 0 });
  }
</script>

<svg
  class="w-96 h-40"
  width="96"
  height="100"
  viewBox="0 0 96 100"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  use:pannable
  on:panstart={handlePanStart}
  on:panmove={handlePanMove}
  on:panend={handlePanEnd}
  style="transform:
		translate({$coords.x}px,{$coords.y}px)
		rotate({$coords.x * 0.2}deg)"
>
  <path
    d="M1.13169 24.5L27.1938 1L41.1317 18.5L51.1317 1L91.1317 18.5L94.6317 83.5H78.4642C69.678 83.5 62.1755 89.8434 60.7147 98.5073L60.6317 99H5.13169L27.0547 63.4942C-2.39515 62.2238 1.13169 37.9788 1.13169 24.5Z"
    fill="hsl({hue}, 100%, 50%)"
  />
  <path
    d="M27.1938 63.5C-2.40624 62.3 1.13169 38 1.13169 24.5L27.1938 1L41.1317 18.5L51.1317 1L91.1317 18.5M91.1317 18.5L94.6317 83.5H78.4642C69.678 83.5 62.1755 89.8434 60.7148 98.5074L60.6317 99H5.13169L40.1636 42.2635C47.1196 30.9978 58.6839 23.3672 71.7776 21.4031L91.1317 18.5Z"
    stroke="black"
  />
</svg>
