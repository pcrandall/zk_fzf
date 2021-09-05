<script>
  import Table from "./lib/Table.svelte";
  import { Fzf } from "fzf";
  import { colors } from "./data-store.js";
  import { beforeUpdate, afterUpdate } from "svelte";

  let search;

  const list = [
    { id: "1", displayName: "abcd" },
    { id: "2", displayName: "bcde" },
    { id: "3", displayName: "cdef" },
    { id: "4", displayName: "defg" },
    { id: "5", displayName: "efgh" },
  ];

  const fzf = new Fzf(list, {
    // With selector you tell FZF where it can find
    // the string that you want to query on
    selector: (item) => item.displayName,
  });

  function handleKeydown(event) {
    if (event.key === "Enter") {
      const text = event.target.value;
      if (!text) return;
      search = text;
      const entries = fzf.find(search);
      const ranking = entries
        .map((entry) => {
          entry.item;
          console.log(entry.item);
        })
        .join(", ");
      console.log(text);
    }
  }
</script>

<main>
  <h1>Zettelkasten!</h1>
  <input
    class="input is-Medium is-primary is-hovered"
    bind:this={search}
    type="text"
    placeholder="Search notes here..."
    on:keydown={handleKeydown}
  />
  <Table tableData={$colors} />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    background-color: #eceff4;
    width: 100%;
    overflow: auto;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  input {
    width: 92%;
    text-align: center;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 1rem auto;
    max-width: 14rem;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }
  }
</style>
