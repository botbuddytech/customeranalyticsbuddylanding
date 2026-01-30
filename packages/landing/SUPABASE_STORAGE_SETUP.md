# Supabase Storage Setup Guide for Blog Images

This guide will help you set up a Supabase Storage bucket for storing blog images.

## Step 1: Create the Storage Bucket

1. **Log in to your Supabase Dashboard**

   - Go to https://app.supabase.com
   - Select your project

2. **Navigate to Storage**

   - Click on "Storage" in the left sidebar
   - Click "New bucket" button

3. **Create the Bucket**
   - **Bucket name**: `blog-images` (must match exactly)
   - **Public bucket**: ✅ **Enable this** (check the box)
     - This allows public access to images via URL
   - **File size limit**: 5 MB (recommended)
   - **Allowed MIME types**:
     - `image/jpeg`
     - `image/jpg`
     - `image/png`
     - `image/webp`
     - `image/gif`
   - Click "Create bucket"

## Step 2: Set Up Bucket Policies (Optional but Recommended)

For better security, you can set up Row Level Security (RLS) policies:

1. **Go to Storage Policies**

   - Click on your `blog-images` bucket
   - Go to the "Policies" tab

2. **Create Upload Policy** (for authenticated users only)

   ```sql
   -- Allow authenticated users to upload
   CREATE POLICY "Allow authenticated uploads"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (bucket_id = 'blog-images');
   ```

3. **Create Public Read Policy** (for public access)

   ```sql
   -- Allow public read access
   CREATE POLICY "Public read access"
   ON storage.objects FOR SELECT
   TO public
   USING (bucket_id = 'blog-images');
   ```

4. **Create Delete Policy** (for authenticated users only)
   ```sql
   -- Allow authenticated users to delete
   CREATE POLICY "Allow authenticated deletes"
   ON storage.objects FOR DELETE
   TO authenticated
   USING (bucket_id = 'blog-images');
   ```

## Step 3: Verify Environment Variables

Make sure your `.env` file has the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
# OR
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

**Important**: For server-side operations (upload/delete), use `SUPABASE_SERVICE_ROLE_KEY` as it bypasses RLS policies.

## Step 4: Run Database Migration

After updating the Prisma schema, run the migration:

```bash
npx prisma migrate dev --name add_image_url_to_blog
```

Or if you prefer to push without creating a migration:

```bash
npx prisma db push
```

## Step 5: Test the Setup

1. Go to `/admin/blogs`
2. Create or edit a blog
3. Upload an image
4. Verify the image appears in the blog card
5. Check that the image is accessible via the public URL

## Troubleshooting

### Images not uploading

- Check that the bucket name is exactly `blog-images`
- Verify the bucket is set to **public**
- Check your Supabase credentials in `.env`
- Check browser console for errors

### Images not displaying

- Verify the bucket is public
- Check that the image URL is correct
- Ensure CORS is enabled (should be by default for public buckets)

### Permission errors

- Make sure you're using `SUPABASE_SERVICE_ROLE_KEY` for server-side operations
- Check that RLS policies are set correctly (or disable RLS if using service role key)

## Notes

- Images are stored with unique filenames: `blog-{id}-{timestamp}.{ext}`
- Old images are automatically deleted when:
  - A blog is deleted
  - An image is replaced with a new one
- Maximum file size: 5MB
- Supported formats: JPEG, PNG, WEBP, GIF
