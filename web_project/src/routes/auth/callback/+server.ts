import { redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, locals: { supabase }, cookies }) => {
  const code = url.searchParams.get("code");

  if (code) {
    try {
      const { error, data } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        throw error;
      }
      console.log(data);

      // Store the session data in cookies
      supabase.auth.setSession(data.session);

      // Redirect to the account page or any other desired page
      return redirect(303, "/account");
    } catch (error) {
      console.error("Error exchanging code for session:", error);
    }
  }
  return redirect(303, "/account");
};
