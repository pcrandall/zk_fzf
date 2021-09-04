<script>
  import Counter from './lib/Counter.svelte'

import { Fzf } from 'fzf'

const list = ['go', 'javascript', 'python', 'rust',
              'swift', 'kotlin', 'elixir', 'java',
              'lisp', 'v', 'zig', 'nim', 'rescript',
              'd', 'haskell']

const fzf = new Fzf(list)

const entries = fzf.find('li')
const ranking = entries.map(entry => entry.item).join(', ')
console.log(ranking) // Output: lisp, kotlin, elixir

</script>

<main>
  <h1>Hello world!</h1>

  <input value={name}>

</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  img {
    height: 16rem;
    width: 16rem;
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

  p {
    max-width: 14rem;
    margin: 1rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>
