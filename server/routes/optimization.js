const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');
const { optimizeFormWithAI } = require('../services/aiService');

// Get optimization recommendations
router.get('/recommendations/:formId', async (req, res) => {
  try {
    const { formId } = req.params;

    // Get form data
    const { data: form, error: formError } = await supabase
      .from('forms')
      .select('*')
      .eq('id', formId)
      .single();

    if (formError) throw formError;

    // Get analytics data
    const { data: analytics } = await supabase
      .from('form_analytics')
      .select('*')
      .eq('form_id', formId);

    // Get interactions
    const { data: interactions } = await supabase
      .from('form_interactions')
      .select('*')
      .eq('form_id', formId);

    // Get submissions
    const { data: submissions } = await supabase
      .from('form_submissions')
      .select('*')
      .eq('form_id', formId);

    const analyticsData = {
      views: analytics?.length || 0,
      submissions: submissions?.length || 0,
      interactions: interactions || [],
      submissions: submissions || []
    };

    // Generate AI recommendations
    const recommendations = await optimizeFormWithAI(form, analyticsData);

    res.json({
      success: true,
      data: recommendations
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Apply optimization
router.post('/apply/:formId', async (req, res) => {
  try {
    const { formId } = req.params;
    const { recommendations, userId } = req.body;

    // Get current form
    const { data: currentForm, error: getError } = await supabase
      .from('forms')
      .select('*')
      .eq('id', formId)
      .single();

    if (getError) throw getError;

    // Create new version
    const newVersion = {
      ...currentForm,
      id: undefined, // Let Supabase generate new ID
      original_form_id: formId,
      version: (currentForm.version || 1) + 1,
      optimized: true,
      optimization_recommendations: recommendations,
      optimized_by: userId,
      optimized_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data: newForm, error: insertError } = await supabase
      .from('forms')
      .insert([newVersion])
      .select();

    if (insertError) throw insertError;

    // Track optimization
    await supabase
      .from('form_optimizations')
      .insert([{
        form_id: formId,
        new_form_id: newForm[0].id,
        recommendations: recommendations,
        applied_by: userId,
        applied_at: new Date().toISOString()
      }]);

    res.json({
      success: true,
      data: newForm[0],
      message: 'Optimization applied successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get optimization history
router.get('/history/:formId', async (req, res) => {
  try {
    const { formId } = req.params;

    const { data, error } = await supabase
      .from('form_optimizations')
      .select('*')
      .eq('form_id', formId)
      .order('applied_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// A/B test optimization
router.post('/ab-test/:formId', async (req, res) => {
  try {
    const { formId } = req.params;
    const { variant, trafficSplit = 50 } = req.body;

    // Get original form
    const { data: originalForm } = await supabase
      .from('forms')
      .select('*')
      .eq('id', formId)
      .single();

    // Create A/B test
    const { data: test } = await supabase
      .from('ab_tests')
      .insert([{
        form_id: formId,
        variant_form_id: variant,
        traffic_split: trafficSplit,
        status: 'active',
        created_at: new Date().toISOString()
      }])
      .select();

    res.json({
      success: true,
      data: test[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;