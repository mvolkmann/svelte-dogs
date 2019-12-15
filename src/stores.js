import {derived, writable} from 'svelte/store';

// The value is an object where keys are dog ids
// and values are dog objects.
// Dog objects have id, breed, name, and size properties.
export const dogStore = writable({});

export const smallDogsStore = derived(dogStore, $dogStore =>
  Object.values($dogStore).filter(dog => dog.size === 'small')
);

export const bigDogsStore = derived([dogStore], ([$dogStore]) =>
  Object.values($dogStore).filter(dog => dog.size === 'large')
);
