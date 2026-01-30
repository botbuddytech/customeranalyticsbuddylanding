import { createClient } from '@supabase/supabase-js'

// Separate Supabase instance for subscription plans (Shopify Supabase)
const subscriptionSupabaseUrl = process.env.SUBSCRIPTION_SUPABASE_URL
// Use Service Role Key if provided, otherwise fallback to Anon Key
const subscriptionSupabaseKey = process.env.SUBSCRIPTION_SUPABASE_SERVICE_ROLE_KEY || process.env.SUBSCRIPTION_SUPABASE_ANON_KEY

let subscriptionSupabaseInstance = null

if (subscriptionSupabaseUrl && subscriptionSupabaseKey) {
  subscriptionSupabaseInstance = createClient(subscriptionSupabaseUrl, subscriptionSupabaseKey)
} else {
  console.warn('Subscription Supabase URL or Key is missing. Please add them to your .env file.')
  console.warn('Required env vars: SUBSCRIPTION_SUPABASE_URL')
  console.warn('Required env vars: SUBSCRIPTION_SUPABASE_ANON_KEY (or SUBSCRIPTION_SUPABASE_SERVICE_ROLE_KEY)')
}

export const supabaseSubscription = subscriptionSupabaseInstance

