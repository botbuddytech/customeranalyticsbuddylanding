# Environment Variables Setup

## Shopify Supabase (Subscription Plans Database)

Add these environment variables to your `.env` file for the Shopify Supabase connection:

```env
# Shopify Supabase - Supabase Client
SUBSCRIPTION_SUPABASE_URL=your_supabase_url_from_shopify_supabase
SUBSCRIPTION_SUPABASE_ANON_KEY=your_anon_key_from_shopify_supabase

# Optional: Service Role Key (for admin operations - recommended)
SUBSCRIPTION_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_from_shopify_supabase
```

## Mapping Your Shopify Supabase Env Vars

If your Shopify Supabase provides these variables:
- `SUPABASE_URL` → Use as `SUBSCRIPTION_SUPABASE_URL`
- `SUPABASE_ANON_KEY` → Use as `SUBSCRIPTION_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` → Use as `SUBSCRIPTION_SUPABASE_SERVICE_ROLE_KEY` (optional but recommended)

## Example .env File

```env
# Main/Dashboard Supabase (existing)
DATABASE_URL=postgresql://user:pass@main-db.supabase.co:5432/dbname
DIRECT_URL=postgresql://user:pass@main-db.supabase.co:5432/dbname

# Shopify Supabase (Subscription Plans) - Using Supabase Client
SUBSCRIPTION_SUPABASE_URL=https://xxxxx.supabase.co
SUBSCRIPTION_SUPABASE_ANON_KEY=your_anon_key_here
SUBSCRIPTION_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Important Notes

1. **SUBSCRIPTION_SUPABASE_URL** - Your Shopify Supabase project URL
2. **SUBSCRIPTION_SUPABASE_ANON_KEY** - Anon key from Shopify Supabase (or use SERVICE_ROLE_KEY)
3. **SUBSCRIPTION_SUPABASE_SERVICE_ROLE_KEY** - Service role key (recommended for admin operations, bypasses RLS)
4. The subscription plans API uses Supabase client directly (no Prisma)
5. Make sure your Shopify Supabase has the tables: `subscription_plans` and `subscription_plan_benefits`
