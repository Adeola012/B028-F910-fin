const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');

// Track form view
router.post('/track/view', async (req, res) => {
  try {
    const { formId, userAgent, ipAddress, referrer, device } = req.body;

    const viewData = {
      form_id: formId,
      user_agent: userAgent,
      ip_address: ipAddress,
      referrer,
      device,
      viewed_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('form_views')
      .insert([viewData]);

    if (error) throw error;

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Track form interaction
router.post('/track/interaction', async (req, res) => {
  try {
    const { formId, fieldId, interactionType, value, duration } = req.body;

    const interactionData = {
      form_id: formId,
      field_id: fieldId,
      interaction_type: interactionType,
      value,
      duration,
      timestamp: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('form_interactions')
      .insert([interactionData]);

    if (error) throw error;

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Track form submission
router.post('/track/submission', async (req, res) => {
  try {
    const { formId, submissionData, completionTime, device, location } = req.body;

    const submission = {
      form_id: formId,
      submission_data: submissionData,
      completion_time: completionTime,
      device,
      location,
      submitted_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('form_submissions')
      .insert([submission]);

    if (error) throw error;

    res.json({ success: true, data: data[0] });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get analytics for a form
router.get('/:formId', async (req, res) => {
  try {
    const { formId } = req.params;
    const { period = '30d' } = req.query;

    // Get views
    const { data: views } = await supabase
      .from('form_views')
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

    // Calculate metrics
    const totalViews = views?.length || 0;
    const totalSubmissions = submissions?.length || 0;
    const completionRate = totalViews > 0 ? (totalSubmissions / totalViews) * 100 : 0;

    // Calculate drop-off points
    const dropOffPoints = calculateDropOffPoints(interactions || []);

    // Device analytics
    const deviceAnalytics = calculateDeviceAnalytics(submissions || []);

    res.json({
      success: true,
      data: {
        totalViews,
        totalSubmissions,
        completionRate,
        dropOffPoints,
        deviceAnalytics,
        averageCompletionTime: calculateAverageCompletionTime(submissions || []),
        interactions: interactions || [],
        submissions: submissions || []
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Helper functions
function calculateDropOffPoints(interactions) {
  const fieldInteractions = {};
  
  interactions.forEach(interaction => {
    if (!fieldInteractions[interaction.field_id]) {
      fieldInteractions[interaction.field_id] = 0;
    }
    fieldInteractions[interaction.field_id]++;
  });

  return fieldInteractions;
}

function calculateDeviceAnalytics(submissions) {
  const devices = {};
  
  submissions.forEach(submission => {
    const device = submission.device || 'unknown';
    devices[device] = (devices[device] || 0) + 1;
  });

  return devices;
}

function calculateAverageCompletionTime(submissions) {
  if (submissions.length === 0) return 0;
  
  const totalTime = submissions.reduce((sum, submission) => {
    return sum + (submission.completion_time || 0);
  }, 0);

  return Math.round(totalTime / submissions.length);
}

module.exports = router;