<script lang="ts">
  import { writable } from "svelte/store";

  const active = writable<"ticketSales" | "revenue">("revenue");

  const toggle = (type: "ticketSales" | "revenue") => {
    active.set(type);
  };
</script>

<div
  class="flex border border-gray-300 rounded-[8px] overflow-hidden shadow-sm"
>
  <button
    on:click={() => toggle("ticketSales")}
    class="flex-1 py-2 text-center text-xs whitespace-nowrap font-medium transition-colors duration-200 px-2 border-r border-gray-300"
    class:bg-blue-600={$active === "ticketSales"}
    class:text-white={$active === "ticketSales"}
    class:text-gray-500={$active !== "ticketSales"}
  >
    Ticket Sales
  </button>

  <button
    on:click={() => toggle("revenue")}
    class="flex-1 py-2 text-center text-xs font-medium transition-colors duration-200 px-2"
    class:bg-blue-600={$active === "revenue"}
    class:text-white={$active === "revenue"}
    class:text-gray-500={$active !== "revenue"}
  >
    Revenue
  </button>
</div>
