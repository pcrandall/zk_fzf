<script>
  import Counter from "./lib/Counter.svelte";
  import { Fzf } from "fzf";
  const list = [
    "go",
    "javascript",
    "python",
    "rust",
    "swift",
    "kotlin",
    "elixir",
    "java",
    "lisp",
    "v",
    "zig",
    "nim",
    "rescript",
    "d",
    "haskell",
  ];

  const fzf = new Fzf(list);
  const entries = fzf.find("li");
  const ranking = entries.map((entry) => entry.item).join(", ");
  console.log(ranking); // Output: lisp, kotlin, elixir
</script>

<main>
  <h1>Zettelkasten!</h1>
  <input
    class="input is-large is-primary is-hovered"
    value={name}
    type="text"
    placeholder="Search notes here..."
  />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    background-color: #eceff4;
    width: 100%;
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
    margin: 2rem auto;
    max-width: 14rem;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }
  }
</style>
