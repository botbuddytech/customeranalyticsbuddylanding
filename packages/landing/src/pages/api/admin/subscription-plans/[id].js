import { supabaseSubscription } from "../../../../lib/supabase-subscription";
import { randomUUID } from "crypto";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ success: false, error: "Plan ID is required" });
  }

  if (!supabaseSubscription) {
    return res.status(500).json({
      success: false,
      error: "Subscription Supabase client not configured. Please check your environment variables.",
    });
  }

  try {
    if (method === "GET") {
      // GET single plan with benefits
      const { data: planData, error: planError } = await supabaseSubscription
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
        .eq("id", id)
        .single();

      if (planError) {
        if (planError.code === "PGRST116") {
          return res.status(404).json({ success: false, error: "Plan not found" });
        }
        throw new Error(planError.message);
      }

      if (!planData) {
        return res.status(404).json({ success: false, error: "Plan not found" });
      }

      const plan = {
        ...planData,
        benefits: (planData.subscription_plan_benefits || []).sort(
          (a, b) => a.sortOrder - b.sortOrder
        ),
      };

      return res.status(200).json({ success: true, plan });
    }

    if (method === "PUT") {
      // UPDATE plan
      const {
        name,
        price,
        priceNote,
        description,
        badgeTone,
        badgeLabel,
        primaryCtaLabel,
        primaryCtaVariant,
        isCurrentDefault,
        benefits,
      } = req.body;

      // Check if plan exists
      const { data: existingPlan, error: checkError } = await supabaseSubscription
        .from("subscription_plans")
        .select("id")
        .eq("id", id)
        .single();

      if (checkError || !existingPlan) {
        return res.status(404).json({ success: false, error: "Plan not found" });
      }

      // If setting as default, unset other defaults
      if (isCurrentDefault === true) {
        const { error: updateError } = await supabaseSubscription
          .from("subscription_plans")
          .update({ isCurrentDefault: false })
          .eq("isCurrentDefault", true)
          .neq("id", id);

        if (updateError) {
          console.error("Error unsetting default plans:", updateError);
        }
      }

      // Build update object (only include fields that are provided)
      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (price !== undefined) updateData.price = price;
      if (priceNote !== undefined) updateData.priceNote = priceNote || null;
      if (description !== undefined) updateData.description = description;
      if (badgeTone !== undefined) updateData.badgeTone = badgeTone || null;
      if (badgeLabel !== undefined) updateData.badgeLabel = badgeLabel || null;
      if (primaryCtaLabel !== undefined) updateData.primaryCtaLabel = primaryCtaLabel;
      if (primaryCtaVariant !== undefined) updateData.primaryCtaVariant = primaryCtaVariant;
      if (isCurrentDefault !== undefined) updateData.isCurrentDefault = isCurrentDefault;

      // Update plan
      if (Object.keys(updateData).length > 0) {
        const { error: updateError } = await supabaseSubscription
          .from("subscription_plans")
          .update(updateData)
          .eq("id", id);

        if (updateError) {
          throw new Error(updateError.message);
        }
      }

      // Handle benefits if provided
      if (benefits !== undefined) {
        // Get existing benefits
        const { data: existingBenefits, error: benefitsError } = await supabaseSubscription
          .from("subscription_plan_benefits")
          .select("id")
          .eq("planId", id);

        if (benefitsError) {
          throw new Error(benefitsError.message);
        }

        // Determine which benefits to delete, update, and create
        const benefitIdsToKeep = benefits.filter((b) => b.id).map((b) => b.id);
        const benefitsToDelete = (existingBenefits || []).filter(
          (b) => !benefitIdsToKeep.includes(b.id)
        );

        // Delete removed benefits
        if (benefitsToDelete.length > 0) {
          const { error: deleteError } = await supabaseSubscription
            .from("subscription_plan_benefits")
            .delete()
            .in("id", benefitsToDelete.map((b) => b.id));

          if (deleteError) {
            throw new Error(deleteError.message);
          }
        }

        // Update or create benefits
        for (const benefit of benefits) {
          if (benefit.id) {
            // Update existing
            const { error: updateError } = await supabaseSubscription
              .from("subscription_plan_benefits")
              .update({
                sortOrder: benefit.sortOrder,
                label: benefit.label,
              })
              .eq("id", benefit.id);

            if (updateError) {
              throw new Error(updateError.message);
            }
          } else {
            // Create new - generate UUID for the benefit
            const { error: insertError } = await supabaseSubscription
              .from("subscription_plan_benefits")
              .insert({
                id: randomUUID(), // Generate UUID for new benefit
                planId: id,
                sortOrder: benefit.sortOrder,
                label: benefit.label,
              });

            if (insertError) {
              throw new Error(insertError.message);
            }
          }
        }
      }

      // Fetch updated plan with benefits
      const { data: updatedPlan, error: fetchError } = await supabaseSubscription
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
        .eq("id", id)
        .single();

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      const plan = {
        ...updatedPlan,
        benefits: (updatedPlan.subscription_plan_benefits || []).sort(
          (a, b) => a.sortOrder - b.sortOrder
        ),
      };

      return res.status(200).json({ success: true, plan });
    }

    if (method === "DELETE") {
      // DELETE plan (benefits are automatically deleted due to cascade)
      const { data: existingPlan, error: checkError } = await supabaseSubscription
        .from("subscription_plans")
        .select("id")
        .eq("id", id)
        .single();

      if (checkError || !existingPlan) {
        return res.status(404).json({ success: false, error: "Plan not found" });
      }

      const { error: deleteError } = await supabaseSubscription
        .from("subscription_plans")
        .delete()
        .eq("id", id);

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      return res.status(200).json({
        success: true,
        message: "Plan deleted successfully",
      });
    }

    return res.status(405).json({ success: false, error: "Method not allowed" });
  } catch (error) {
    console.error("Subscription plan API error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Unable to process request",
    });
  }
}
