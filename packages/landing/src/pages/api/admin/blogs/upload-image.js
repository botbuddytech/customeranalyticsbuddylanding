import { createClient } from '@supabase/supabase-js';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/auth";

// Configure API route for large body size
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  // Set timeout for large uploads
  req.setTimeout(60000); // 60 seconds

  // Check authentication
  let session;
  try {
    session = await getServerSession(req, res, authOptions);
  } catch (authError) {
    return res.status(500).json({ message: "Authentication error", error: authError.message });
  }

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Create Supabase client with service role key for storage operations
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ 
        message: "Supabase is not configured. Please check your environment variables.",
        hint: "Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your .env file"
      });
    }

    // Create client with service role key (bypasses RLS)
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });


    // Parse request body
    const { imageBase64, fileName, blogId } = req.body || {};

    if (!imageBase64) {
      return res.status(400).json({ message: "No image provided" });
    }

    // Validate base64 string size
    if (imageBase64.length > 10 * 1024 * 1024) { // 10MB base64 string limit
      return res.status(400).json({ message: "Image data too large. Please use a smaller image." });
    }

    // Check if bucket exists
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    if (bucketError) {
      return res.status(500).json({ 
        message: "Error accessing storage. Please ensure Supabase Storage is configured.",
        error: bucketError.message 
      });
    }

    const blogImagesBucket = buckets?.find(b => b.name === "blog-images");
    if (!blogImagesBucket) {
      return res.status(500).json({ 
        message: "Storage bucket 'blog-images' not found. Please create it in your Supabase dashboard. See SUPABASE_STORAGE_SETUP.md for instructions.",
        availableBuckets: buckets?.map(b => b.name) || []
      });
    }

    // Extract base64 data and mime type
    const base64Data = imageBase64.includes(",") 
      ? imageBase64.split(",")[1] 
      : imageBase64;
    
    const mimeMatch = imageBase64.match(/data:([^;]+);base64/);
    const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
    
    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(mimeType)) {
      return res.status(400).json({ 
        message: "Invalid file type. Only JPEG, PNG, WEBP, and GIF are allowed." 
      });
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data, "base64");

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (buffer.length > maxSize) {
      return res.status(400).json({ message: "File size exceeds 5MB limit" });
    }

    // Generate unique filename
    const fileExt = fileName 
      ? fileName.split(".").pop() 
      : mimeType.split("/")[1] || "jpg";
    const uniqueFileName = blogId 
      ? `blog-${blogId}-${Date.now()}.${fileExt}`
      : `blog-${Date.now()}.${fileExt}`;
    const filePath = `${uniqueFileName}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(filePath, buffer, {
        contentType: mimeType,
        upsert: false, // Don't overwrite existing files
        cacheControl: '3600',
      });

    if (uploadError) {
      // Provide more helpful error messages
      let errorMessage = "Failed to upload image";
      if (uploadError.message?.includes("duplicate")) {
        errorMessage = "A file with this name already exists. Please try again.";
      } else if (uploadError.message?.includes("permission") || uploadError.message?.includes("policy")) {
        errorMessage = "Permission denied. Please check your Supabase Storage policies and ensure you're using SUPABASE_SERVICE_ROLE_KEY.";
      } else if (uploadError.message) {
        errorMessage = uploadError.message;
      }

      return res.status(500).json({ 
        message: errorMessage,
        error: uploadError.message,
        errorCode: uploadError.statusCode,
        details: uploadError 
      });
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(filePath);

    return res.status(200).json({
      url: urlData.publicUrl,
      path: filePath,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "An error occurred while uploading the image",
      error: error.message 
    });
  }
}

