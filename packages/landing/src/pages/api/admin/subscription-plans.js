import { supabaseSubscription } from "../../../lib/supabase-subscription";
import { randomUUID } from "crypto";

export default async function handler(req, res) {
  const { method } = req;

  if (!supabaseSubscription) {
    return res.status(500).json({
      success: false,
      error: "Subscription Supabase client not configured. Please check your environment variables.",
    });
  }

  try {
    if (method === "GET") {
      // GET all plans with benefits
      const { data: plansData, error: plansError } = await supabaseSubscription
        .from("subscription_plans")
        .select(`
          *,
          subscription_plan_benefits (
            id,
            planId,
            sortOrder,
            label
          )
        `)
        .order("isCurrentDefault", { ascending: false })
        .order("name", { ascending: true });

      if (plansError) {
        throw new Error(plansError.message);
      }

      // Sort benefits for each plan
      const plans = (plansData || []).map((plan) => ({
        ...plan,
        benefits: (plan.subscription_plan_benefits || []).sort(
          (a, b) => a.sortOrder - b.sortOrder
        ),
      }));

      return res.status(200).json({ success: true, plans });
    }

    if (method === "POST") {
      // CREATE new plan
      const {
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
        benefits = [],
      } = req.body;

      // Validate required fields
      if (!code || !name || !price || !description || !primaryCtaLabel || !primaryCtaVariant) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields: code, name, price, description, primaryCtaLabel, primaryCtaVariant",
        });
      }

      // If setting as default, unset other defaults
      if (isCurrentDefault) {
        const { error: updateError } = await supabaseSubscription
          .from("subscription_plans")
          .update({ isCurrentDefault: false })
          .eq("isCurrentDefault", true);

        if (updateError) {
          console.error("Error unsetting default plans:", updateError);
        }
      }

      // Generate UUID for the plan
      const planId = randomUUID();

      // Insert plan with generated ID
      const { data: planData, error: planError } = await supabaseSubscription
        .from("subscription_plans")
        .insert({
          id: planId, // IMPORTANT: Generate UUID before inserting
          code,
          name,
          price,
          priceNote: priceNote || null,
          description,
          badgeTone: badgeTone || null,
          badgeLabel: badgeLabel || null,
          primaryCtaLabel,
          primaryCtaVariant,
          isCurrentDefault: isCurrentDefault || false,
        })
        .select()
        .single();

      if (planError) {
        // Handle unique constraint violation
        if (planError.code === "23505") {
          return res.status(400).json({
            success: false,
            error: "A plan with this code already exists",
          });
        }
        throw new Error(planError.message);
      }

      // Insert benefits if any
      if (benefits.length > 0) {
        const benefitsToInsert = benefits.map((b, index) => ({
          id: randomUUID(), // Generate UUID for each benefit
          planId: planData.id,
          sortOrder: b.sortOrder !== undefined ? b.sortOrder : index + 1,
          label: b.label,
        }));

        const { error: benefitsError } = await supabaseSubscription
          .from("subscription_plan_benefits")
          .insert(benefitsToInsert);

        if (benefitsError) {
          // Rollback: delete the plan if benefits insertion fails
          await supabaseSubscription
            .from("subscription_plans")
            .delete()
            .eq("id", planData.id);
          throw new Error(benefitsError.message);
        }
      }

      // Fetch complete plan with benefits
      const { data: completePlan, error: fetchError } = await supabaseSubscription
        .from("subscription_plans")
        .select(`
          *,
          subscription_plan_benefits (
            id,
            planId,
            sortOrder,
            label
          )
        `)
        .eq("id", planData.id)
        .single();

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      const plan = {
        ...completePlan,
        benefits: (completePlan.subscription_plan_benefits || []).sort(
          (a, b) => a.sortOrder - b.sortOrder
        ),
      };

      return res.status(200).json({ success: true, plan });
    }

    return res.status(405).json({ success: false, error: "Method not allowed" });
  } catch (error) {
    console.error("Subscription plans API error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Unable to process request",
    });
  }
}
