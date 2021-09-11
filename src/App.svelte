<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import Fuse from "fuse.js";

  import VirtualList from "./lib/VirtualList.svelte";
  import ListItem from "./lib/ListItem.svelte";
  import items from "./lib/Data.js";


  let filteredList = items;
  let searchTerm = "";
  let searchInput;
  let searchTimeout = 150;
  let start;
  let end;
  let timer;

  const options = {
    includeScore: true,
    keys: [
      {
        name: "content",
        weight: 0.3,
      },
      {
        name: "name",
        weight: 0.4,
      },
    ],
  };

  const fuse = new Fuse(items, options);

  onMount(() => searchInput.focus());

  $: zk_len = filteredList === undefined ? 1000 : filteredList.length; // subscribe to filteredList

  const debounceFuzzySearch = (val, t=searchTimeout) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      filteredList = fuzzySearch(val);
    }, t);
  };

  const fuzzySearch = (val) => {
    if (!val) return items;
    let entries = fuse.search(val);
    let filtered = [];
    entries.map((entry) => filtered.push(entry.item));
    return filtered;
  };

  /**
   * @param {{ key: string; target: { value: any; }; }} event
   */

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      clearTimeout(timer);
      let text = e.target.value;
      if (!text) return;
      debounceFuzzySearch(text, 0)
    }
  };

  const handleClick = (e) => {
    console.log(e);
  };
</script>

<main>
  <h1>Zettelkasten!</h1>
  <input
    class="input is-Medium is-primary"
    bind:this={searchInput}
    bind:value={searchTerm}
    on:keydown={handleKeydown}
    on:keyup={(filteredList = ({ target: { value } }) => debounceFuzzySearch(value))}
    placeholder="Search"
    type="text"
  />
  <div class="_container">
    <VirtualList bind:items={filteredList} bind:start bind:end let:item>
      <div class="card" on:click={handleClick} id="listItemDiv">
        <ListItem {...item} bind:formatted={filteredList} />
      </div>
    </VirtualList>
    <p>Items {start}-{end} of {zk_len}</p>
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

  p {
    color: #959da5;
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
    transition: all 0.1s ease-in-out;
  }

  .card:hover {
    transform: scale(0.99);
    opacity: 0.8;
  }
</style>
