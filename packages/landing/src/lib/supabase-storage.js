import { createClient } from '@supabase/supabase-js';

/**
 * Create a Supabase client with the service role key for server-side storage operations.
 * This client bypasses Row Level Security (RLS).
 */
const createServiceRoleSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("Supabase service role credentials missing for storage operations.");
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

/**
 * Delete an image from Supabase Storage
 * @param {string} imageUrl - The full URL or path of the image to delete
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function deleteImageFromStorage(imageUrl) {
  if (!imageUrl) {
    return { success: true }; // No image to delete
  }

  const supabaseServiceRole = createServiceRoleSupabaseClient();
  
  if (!supabaseServiceRole) {
    return { success: false, error: "Supabase service role client is not configured for storage operations." };
  }

  try {
    // Extract the file path from the URL
    // URL format: https://[project].supabase.co/storage/v1/object/public/blog-images/filename.jpg
    const urlParts = imageUrl.split("/blog-images/");
    let fileName;

    if (urlParts.length < 2) {
      // If it's just a filename or a relative path, try to extract it
      fileName = imageUrl.includes("/") ? imageUrl.split("/").pop() : imageUrl;
    } else {
      fileName = urlParts[1].split("?")[0]; // Remove query params if any
    }

    if (!fileName) {
      console.warn("Could not extract filename from URL:", imageUrl);
      return { success: false, error: "Could not extract filename from image URL." };
    }

    const { error } = await supabaseServiceRole.storage
      .from("blog-images")
      .remove([fileName]);

    if (error) {
      console.error("Error deleting image from Supabase Storage:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error in deleteImageFromStorage:", error);
    return { success: false, error: error.message };
  }
}

