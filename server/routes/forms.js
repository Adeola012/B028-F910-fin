const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');
const { generateFormWithAI } = require('../services/aiService');
const { validateForm } = require('../middleware/validation');

// Create new form
router.post('/', validateForm, async (req, res) => {
  try {
    const { title, description, fields, settings, userId } = req.body;

    const formData = {
      title,
      description,
      fields,
      settings: settings || {},
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      version: 1,
      status: 'draft'
    };

    const { data, error } = await supabase
      .from('forms')
      .insert([formData])
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data: data[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get all forms for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const { data, error, count } = await supabase
      .from('forms')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (error) throw error;

    res.json({
      success: true,
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get specific form
router.get('/:formId', async (req, res) => {
  try {
    const { formId } = req.params;

    const { data, error } = await supabase
      .from('forms')
      .select('*')
      .eq('id', formId)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        error: 'Form not found'
      });
    }

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

// Update form
router.put('/:formId', validateForm, async (req, res) => {
  try {
    const { formId } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('forms')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', formId)
      .select();

    if (error) throw error;

    res.json({
      success: true,
      data: data[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Delete form
router.delete('/:formId', async (req, res) => {
  try {
    const { formId } = req.params;

    const { error } = await supabase
      .from('forms')
      .delete()
      .eq('id', formId);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Form deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// AI form generation endpoint
router.post('/generate', async (req, res) => {
  try {
    const { prompt, industry, type, userId } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required'
      });
    }

    const generatedForm = await generateFormWithAI(prompt, industry, type);

    const formData = {
      ...generatedForm,
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      version: 1,
      status: 'generated'
    };

    const { data, error } = await supabase
      .from('forms')
      .insert([formData])
      .select();

    if (error) throw error;

    res.json({
      success: true,
      data: data[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;