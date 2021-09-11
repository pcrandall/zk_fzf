<script>
  import { onMount } from "svelte";
  export let title;
  export let content;
  onMount(() => {
    /* (function () { */
    document.querySelector("div").addEventListener("click", function (event) {
      event.preventDefault();
      var modal = document.querySelector(".modal"); // assuming you have only 1
      var html = document.querySelector("html");
      modal.classList.add("is-active");
      html.classList.add("is-clipped");

      modal.querySelector(".delete").addEventListener("click", function (e) {
        console.log(e);
        e.preventDefault();
      });
    });
  });
</script>

<div class="modal">
  <div class="modal-background" />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{title}</p>
      <button class="delete" aria-label="close" />
    </header>
    <section class="modal-card-body">
      {content}
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success">Save changes</button>
      <button class="button">Cancel</button>
    </footer>
  </div>
</div>
