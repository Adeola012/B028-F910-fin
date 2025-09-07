const validateForm = (req, res, next) => {
  const { title, fields } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Title is required and must be a non-empty string'
    });
  }

  if (!Array.isArray(fields)) {
    return res.status(400).json({
      success: false,
      error: 'Fields must be an array'
    });
  }

  // Validate each field
  for (const field of fields) {
    if (!field.type || !field.label) {
      return res.status(400).json({
        success: false,
        error: 'Each field must have a type and label'
      });
    }

    const validTypes = ['text', 'email', 'number', 'select', 'textarea', 'checkbox', 'radio', 'date', 'file'];
    if (!validTypes.includes(field.type)) {
      return res.status(400).json({
        success: false,
        error: `Invalid field type: ${field.type}`
      });
    }
  }

  next();
};

module.exports = { validateForm };