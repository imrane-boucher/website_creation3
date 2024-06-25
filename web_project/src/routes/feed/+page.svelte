<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
import supabase from "../../supabase/+setup"


  let newPost = '';
  let posts = writable([]);

  onMount(async () => {
    try {
      
        let { data, error } = await supabase
          .from('publications')
          .select('*')
          
      console.log(data)
      if (error) {
        throw error;
      }

      posts.set(data);
    } catch (error) {
      console.error('Error fetching publications:', error.message);
    }
  });

  const addPost = async () => {
    try {
      const userFromCookie = await supabase.auth.getUser()
      console.log(userFromCookie)
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        throw userError;
      }

      const email = user.email;
      const { data, error } = await supabase
        .from('publications')
        .insert([{ content: newPost, email, created_at: new Date().toISOString() }]);
      
      if (error) {
        throw error;
      }

      posts.update(currentPosts => [data[0], ...currentPosts]);
      newPost = '';
    } catch (error) {
      console.error('Exception while adding post:', error.message);
    }
  };
</script>

<style>
  .post {
    @apply bg-white shadow-md rounded-lg p-4 mb-4;
  }
  .button {
    @apply bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-300;
  }
</style>

<div class="container mx-auto p-4 text-black">
  <h1 class="text-2xl mb-4">Feed</h1>
  <div>
    {#each $posts as post (post.id)}
      <div class="post">
        <p class="text-lg font-semibold">{post.email}</p>
        <p class="mb-2">{post.content}</p>
        <small class="text-gray-500">{new Date(post.created_at).toLocaleString()}</small>
      </div>
    {/each}
  </div>
  <div>
    <textarea bind:value={newPost} class="w-full p-2 mb-2 border rounded text-black" placeholder="What's on your mind?"></textarea>
    <button on:click={addPost} class="button">Post</button>
  </div>
</div>
