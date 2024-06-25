<!-- src/routes/+page.svelte -->
<script lang="ts">
		import '../app.css'
	import { Auth } from '@supabase/auth-ui-svelte'
	import { ThemeSupa } from '@supabase/auth-ui-shared'

	export let data
</script>

<svelte:head>
	<title>Welcome to Schoolify</title>
</svelte:head>

<div class="row flex-center flex">
	<div class="col-6 form-widget">
		<Auth
			supabaseClient={data.supabase}
			view="magic_link"
			redirectTo={`${data.url}/auth/callback`}
			showLinks={false}
			appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
		/>
		<a href="/blog">
			<button class="hover:bg-cyan-400 transition-opacity">Post</button>
		</a>
	</div>
	
</div>


