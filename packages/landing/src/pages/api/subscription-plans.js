import { supabaseSubscription } from "../../lib/supabase-subscription";

/**
 * Public API: returns subscription plans for the landing page Pricing section.
 * Read-only; no auth required.
 */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  if (!supabaseSubscription) {
    return res.status(500).json({
      success: false,
      error: "Subscription service unavailable.",
    });
  }

  try {
    const { data: plansData, error: plansError } = await supabaseSubscription
      .from("subscription_plans")
      .select(
        `
        id,
        code,
        name,
        price,
        priceNote,
        description,
        badgeTone,
        badgeLabel,
        primaryCtaLabel,
        primaryCtaVariant,
        isCurrentDefault,
        subscription_plan_benefits (
          id,
          sortOrder,
          label
        )
      `
      )
      .order("isCurrentDefault", { ascending: false })
      .order("name", { ascending: true });

    if (plansError) {
      throw new Error(plansError.message);
    }

    const plans = (plansData || []).map((plan) => ({
      ...plan,
      benefits: (plan.subscription_plan_benefits || []).sort(
        (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
      ),
    }));

    return res.status(200).json({ success: true, plans });
  } catch (error) {
    console.error("Subscription plans API error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Unable to load plans",
    });
  }
}
