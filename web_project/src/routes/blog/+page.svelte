<script>
	export let data;
</script>

<div class="bg-slate-400 my-8"> 
	<h1 class="p-8">Blog</h1>

	<ul class="p-8">
		{#each data.posts as post}
			<li>
				<h2>
					<a href={post.path}>
						{post.meta.title}
					</a>
				</h2>
				Published {post.meta.date}
			</li>
		{/each}
	</ul>


</div>


