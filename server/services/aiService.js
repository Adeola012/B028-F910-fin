const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function generateFormWithAI(prompt, industry = 'general', type = 'contact') {
  try {
    const systemPrompt = `You are an expert form builder AI. Create a comprehensive, user-friendly form based on the user's requirements.
    
    Guidelines:
    - Create forms that are intuitive and easy to complete
    - Include appropriate validation rules
    - Consider accessibility (WCAG 2.1 compliance)
    - Use clear, concise language
    - Structure questions logically
    - Include helpful descriptions and placeholders
    
    Industry: ${industry}
    Form Type: ${type}`;

    const userPrompt = `Create a form for: ${prompt}
    
    Return the response in JSON format with the following structure:
    {
      "title": "Form title",
      "description": "Brief description of the form",
      "fields": [
        {
          "id": "unique-id",
          "type": "text|email|number|select|textarea|checkbox|radio|date|file",
          "label": "Field label",
          "placeholder": "Placeholder text",
          "required": true/false,
          "options": ["option1", "option2"] (for select/radio/checkbox),
          "validation": {
            "pattern": "regex pattern",
            "minLength": number,
            "maxLength": number,
            "min": number,
            "max": number
          },
          "description": "Help text or description"
        }
      ],
      "settings": {
        "theme": "light|dark|auto",
        "showProgressBar": true/false,
        "allowMultipleSubmissions": true/false,
        "redirectUrl": "url-after-completion"
      }
    }`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    });

    const response = completion.choices[0]?.message?.content;
    return JSON.parse(response);

  } catch (error) {
    console.error('AI Service Error:', error);
    throw new Error('Failed to generate form with AI');
  }
}

async function optimizeFormWithAI(formData, analyticsData) {
  try {
    const systemPrompt = `You are an expert form optimization AI. Analyze form performance data and provide actionable recommendations to improve completion rates and user experience.
    
    Consider:
    - Drop-off points and abandonment rates
    - Field completion times
    - User interaction patterns
    - Device-specific issues
    - Accessibility improvements
    - Question clarity and flow`;

    const userPrompt = `Analyze this form performance data and provide optimization recommendations:
    
    Form Data: ${JSON.stringify(formData)}
    Analytics Data: ${JSON.stringify(analyticsData)}
    
    Return optimization recommendations in JSON format:
    {
      "recommendations": [
        {
          "type": "field-optimization|flow-improvement|validation-update|ui-enhancement",
          "description": "Clear description of the issue",
          "action": "Specific action to take",
          "expectedImpact": "Expected improvement in completion rate",
          "fieldId": "specific field id (if applicable)",
          "priority": "high|medium|low"
        }
      ],
      "summary": {
        "currentCompletionRate": "current rate",
        "projectedImprovement": "projected improvement",
        "keyIssues": ["list of main issues"]
      }
    }`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.3,
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    });

    const response = completion.choices[0]?.message?.content;
    return JSON.parse(response);

  } catch (error) {
    console.error('AI Optimization Error:', error);
    throw new Error('Failed to optimize form with AI');
  }
}

module.exports = {
  generateFormWithAI,
  optimizeFormWithAI
};