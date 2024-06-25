<script>
	export let data;
</script>

<article class="bg-slate-600 p-8 my-8">

        <h1 >{data.title}</h1>
        <p>Published: {data.date}</p>
        <svelte:component this={data.content} />
	
</article>

