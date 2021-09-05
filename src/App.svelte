<script>
  import { Fzf } from "fzf";
  import VirtualList from "./lib/VirtualList.svelte";
  import items from "./lib/data.js";
  import ListItem from "./lib/ListItem.svelte";

  /* import { colors } from "./data-store.js"; */
  /* import Table from "./lib/Table.svelte"; */
  /* import { beforeUpdate, afterUpdate } from "svelte"; */

  let searchTerm = "";
  let start;
  let end;
  let zk_len;
  $: filteredList = items.filter(
    (item) => item.name.indexOf(searchTerm) !== -1
  );


  if(searchTerm === "") {
    zk_len = 1000
  }else{
    zk_len = filteredList.length
  }

  console.log(items);

  /* avatar: "https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&h=75"
    content: "ckrra qrh eteuqykbv ehtthdn rqa fdyvbru ropym qlf nurxqwudmtd amfvfes okdfhxfx oygmeuhgk bfbbeofhe ywxjm"
    key: "_0"
    name: "funny-goat" */

  /* console.trace(filteredList); */

  const fzf = new Fzf(items, {
    // With selector you tell FZF where it can find
    // the string that you want to query on
    selector: (item) => item.content,
    limit: 32,
    maxResultItems: 32,
  });

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
    class="input is-Medium is-primary is-hovered"
    bind:value={searchTerm}
    placeholder="Search notes here..."
    on:keydown={handleKeydown}
  />
  <div class="cont">
    <VirtualList bind:items={filteredList} bind:start bind:end let:item>
      <ListItem {...item} />
    </VirtualList>
    <p>Items {start}-{end} of {items.length}</p>
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

  .cont {
    border-bottom: 1px solid #333;
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
