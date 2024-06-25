<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
  
	export let data
  
	let { supabase, session } = data
	$: ({ supabase, session } = data)
  
	onMount(() => {
	  const { data } = supabase.auth.onAuthStateChange((event, _session) => {
		if (_session?.expires_at !== session?.expires_at) {
		  invalidate('supabase:auth')
		}
	  })
  
	  return () => data.subscription.unsubscribe()
	})
  </script>
  
  <svelte:head>
	<title>User Management</title>
  </svelte:head>
  <!-- adding navigation for feed -->
  <nav class="p-4 bg-gray-800 text-white">
	<a href="/" class="mr-4">Home</a>
	<a href="/feed" class="mr-4">Feed</a> 
  </nav>
  
  <div class="container" style="padding: 50px 0 100px 0">
	<slot />
  </div>
  