<script>
  import DogForm from './DogForm.svelte';
  import DogList from './DogList.svelte';
  import {bigDogsStore, smallDogsStore} from './stores.js';

  $: console.log('small are:', $smallDogsStore);
  $: console.log('big dogs are:', $bigDogsStore);

  let dog = {};
  let mode = 'list'; // others are 'create' and 'update'

  function changeMode(event) {
    mode = event.detail;
    if (mode === 'create') dog = {};
  }

  const selectDog = event => (dog = event.detail);
</script>

<h1>Dogs</h1>
{#if mode === 'list'}
  <DogList on:mode={changeMode} on:select={selectDog} />
{:else}
  <DogForm {dog} {mode} on:mode={changeMode} />
{/if}
