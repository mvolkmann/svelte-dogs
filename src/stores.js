import {writable} from 'svelte/store';

// The value is an object where keys are dog ids
// and values are dog objects.
// Dog objects have id, breed, name, and size properties.
export const dogStore = writable({});
