<script>
	import Header from '$lib/components/Header.svelte';
    import '../../app.css';
</script>


<Header/>

<main class="bg-gray-100 text-gray-700">
	<slot />
</main>
