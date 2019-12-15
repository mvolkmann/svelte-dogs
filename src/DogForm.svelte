<script>
  import {createEventDispatcher} from 'svelte';
  import {dogStore} from './stores';
  import {getGuid} from './util';

  const dispatch = createEventDispatcher();
  export let dog;
  export let mode;

  $: canSave = dog.name && dog.breed && dog.size;

  function save() {
    if (!dog.id) dog.id = getGuid();
    dogStore.update(dogMap => {
      dogMap[dog.id] = dog;
      return dogMap;
    });

    dispatch('mode', 'list');
  }
</script>

<form on:submit|preventDefault={save}>
  <div>
    <label for="name">Name</label>
    <input autofocus id="name" bind:value={dog.name} />
  </div>
  <div>
    <label for="breed">Breed</label>
    <input id="breed" bind:value={dog.breed} />
  </div>
  <div>
    <label>Size</label>
    <span class="radios">
      <label>
        <input type="radio" value="small" bind:group={dog.size} />
        Small
      </label>
      <label>
        <input type="radio" value="medium" bind:group={dog.size} />
        Medium
      </label>
      <label>
        <input type="radio" value="large" bind:group={dog.size} />
        Large
      </label>
    </span>
  </div>
  <div>
    <label />
    <button disabled={!canSave} on:click={save}>
      {mode === 'create' ? 'Save' : 'Update'}
    </button>
    <button on:click={() => dispatch('mode', 'list')}>Cancel</button>
  </div>
</form>

<style>
  /* TODO: Move some of these styles to global.css. */
  div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  form {
    display: inline-block;
  }

  input {
    border: solid lightgray 1px;
    border-radius: 4px;
    font-size: 18px;
    margin: 0;
    padding: 4px;
  }

  input[type='radio'] {
    height: 16px;
  }

  label {
    display: inline-block;
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
    text-align: right;
    width: 60px;
  }

  .radios > label {
    font-weight: normal;
    width: auto;
  }
</style>
