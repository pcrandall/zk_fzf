<script>
export let tableData;
</script >

<div class="table-container">
  <table class="table is-fullwidth is-striped is-scrollable">
    <tbody>
      {#each Object.values(tableData) as row}
        <tr>
          {#each Object.values(row) as cell}
            <td>{cell}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  div {
    width: 92%;
    max-height: 72vh;
    margin: auto;
    margin-top: 5px;
    overflow-y: scroll;
  }
</style>
