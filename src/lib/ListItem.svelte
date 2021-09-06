<script>
  export let name;
  export let content;
</script>

<div class="card">
  <h2>{name}</h2>
  <p>{content}</p>
</div>

<style>
  .card {
    position: relative;
    margin: 0.3em 0;
    padding: 0.5em 0.5em 0.5em 0.5em;
    border: 1px solid #eee;
    border-radius: 4px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    min-height: 4em;
    cursor: pointer;
    user-select: none;
  }

  .card::after {
    clear: both;
    display: block;
  }

  h2 {
    margin: 0 0 0.5em 0;
    font-size: 20px;
    font-weight: 500;
    text-align: start;
  }

  p {
    margin: auto;
    font-size: 14px;
    color: #959da5;
    text-align: justify;
  }
</style>
