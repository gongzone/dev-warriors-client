// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

// and what to do when importing types

declare namespace App {
	// interface Error {}
	// interface PageData {}
	// interface Platform {}
	interface Locals {
		user: import('$lib/types/current-user').CurrentUser;
	}
}
