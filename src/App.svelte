<script>
  // @ts-nocheck

  import { Fzf } from "fzf";
  import VirtualList from "./lib/VirtualList.svelte";
  import ListItem from "./lib/ListItem.svelte";
  import items from "./lib/data.js";
  import { onMount } from "svelte";
  import "fa-icons";

  let searchTerm = "";
  let searchInput;
  let start;
  let end;
  onMount(() => searchInput.focus());

  $: filteredList = items.filter(
    (item) => item.name.indexOf(searchTerm) !== -1
  );

  $: zk_len = filteredList.length; // subscribe to filteredList

  console.log(items);

  /*
    items here

    content: "ckrra qrh eteuqykbv ehtthdn rqa fdyvbru ropym qlf nurxqwudmtd amfvfes okdfhxfx oygmeuhgk bfbbeofhe ywxjm"
    key: "_0"
    name: "funny-goat"

    console.trace(filteredList);

  */

  const fzf = new Fzf(items, {
    // With selector you tell FZF where it can find
    // the string that you want to query on
    selector: (item) => item.content,
    maxResultItems: 32,
  });

  /**
   * @param {{ key: string; target: { value: any; }; }} event
   */

  function handleKeydown(event) {
    if (event.key === "Enter") {
      const text = event.target.value;
      if (!text) return;
      searchTerm = text;
      const entries = fzf.find(searchTerm);
      const ranking = entries
        .map((entry) => {
          entry.item;
          /* console.log(entry.item); */
        })
        .join(", ");
      console.log(entries);
      console.log(filteredList);
    }
  }
</script>

<main>
  <h1>Zettelkasten!</h1>
  <input
    class="input searchbar is-Medium is-primary is-hovered has-text-weight-normal"
    bind:value={searchTerm}
    bind:this={searchInput}
    on:keydown={handleKeydown}
    placeholder="Search"
    type="text"
  />
  <div class="_container">
    <VirtualList bind:items={filteredList} bind:start bind:end let:item>
      <div class="card">
        <ListItem {...item} />
      </div>
    </VirtualList>
    <p class="" style="color: #959da5;">Items {start}-{end} of {zk_len}</p>
  </div>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    background-color: #eceff4;
    width: 100%;
    overflow: auto;
  }

  ._container {
    border-bottom: 1px solid #959da5;
    min-height: 200px;
    height: calc(100vh - 13em);
    width: 92%;
    text-align: center;
    margin: auto;
  }

  .searchbar {
    color: "#2a85cf";
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  input {
    width: 92%;
    text-align: start;
    font-size: larger;
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

  @media (max-width: 480px) {
    h1 {
      font-size: 2.1rem;
      margin: 0.5rem auto;
    }
  }

  ::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #959da5;
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #959da5;
    opacity: 1;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #959da5;
    opacity: 1;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #959da5;
  }
  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #959da5;
  }

  ::placeholder {
    /* Most modern browsers support this now. */
    color: #959da5;
  }

  .card {
    transition: all 0.2s ease-in-out;
  }
  .card:hover {
    transform: scale(0.99);
    opacity: 0.75;
  }
</style>
