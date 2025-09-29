// Vercel Serverless function to evaluate student code via Gemini.
// Expects POST JSON: { task, expectedOutput, code }
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  const GEMINI_MODEL = 'gemini-2.5-flash';

  if (!GEMINI_API_KEY) {
    res.status(500).json({ error: 'Server not configured with GEMINI_API_KEY. Set it in Vercel project settings.' });
    return;
  }

  const { task, expectedOutput, code } = req.body || {};

  const systemPrompt = `You are an expert, strict Python code evaluator for a learning platform called PyLingo. Your primary goal is to determine if the student's code fully and correctly satisfies the task requirements, specifically focusing on the required output and the underlying conceptual logic (e.g., using a loop if a loop is required). The student's environment cannot handle user input functions like input() and is only evaluating the print output and code structure.\n\nRespond ONLY with a single JSON object. Do not include any markdown or explanatory text outside of the JSON block.\n\nJSON Structure:\n{\n  "correct": true/false,\n  "feedback": "brief explanation of why it's correct or what's wrong (max 2 sentences)",\n  "suggestion": "optional hint/correction if incorrect (max 1 sentence) or the explanation from the level if no specific hint is necessary"\n}`;

  const userQuery = `Task: ${task}\nExpected Output/Requirement: ${expectedOutput}\n\nStudent's Code:\n${code}`;

  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'OBJECT',
        properties: {
          correct: { type: 'BOOLEAN' },
          feedback: { type: 'STRING' },
          suggestion: { type: 'STRING' }
        },
        propertyOrdering: ['correct', 'feedback', 'suggestion']
      },
      temperature: 0.1
    }
  };

  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    const r = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    // Always read raw text first so we can produce helpful errors for non-JSON responses
    const raw = await r.text();

    if (!raw) {
      res.status(500).json({ error: 'Empty response from Gemini API' });
      return;
    }

    // Try parsing as JSON first (API may wrap data)
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (jsonErr) {
      // If not pure JSON, try to extract JSON substring from text
      const trimmed = raw.trim();
      const firstBrace = trimmed.indexOf('{');
      const lastBrace = trimmed.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        const jsonText = trimmed.slice(firstBrace, lastBrace + 1);
        try {
          parsed = JSON.parse(jsonText);
        } catch (innerErr) {
          // fall through to extracting from generativelanguage structure
        }
      }
    }

    // If parsed is still undefined, check for the usual generativelanguage structure
    if (!parsed) {
      try {
        const obj = JSON.parse(raw);
        parsed = obj;
      } catch (_) {
        // try to parse candidates structure manually
        try {
          const obj = JSON.parse(raw);
          const candidate = obj.candidates?.[0];
          if (candidate && candidate.content && candidate.content.parts) {
            const text = candidate.content.parts.map(p => p.text).join('');
            // attempt to extract JSON from text
            const first = text.indexOf('{');
            const last = text.lastIndexOf('}');
            if (first !== -1 && last !== -1) {
              parsed = JSON.parse(text.slice(first, last + 1));
            } else {
              // fallback: return the raw text so client can show debugging info
              res.status(200).json({ error: 'model_text', rawText: text });
              return;
            }
          }
        } catch (err) {
          // nothing else to try
        }
      }
    }

    if (parsed && parsed.error) {
      res.status(500).json({ error: parsed.error.message || parsed.error });
      return;
    }

    if (!parsed) {
      // Give the caller the raw text to help with debugging
      res.status(500).json({ error: 'Failed to parse JSON from model response', raw: raw });
      return;
    }

    // If the model returned a nested 'candidates' object with text, try to extract the JSON inside it
    if (!parsed.correct && parsed.candidates) {
      const candidate = parsed.candidates?.[0];
      if (candidate && candidate.content && candidate.content.parts) {
        const text = candidate.content.parts.map(p => p.text).join('');
        const first = text.indexOf('{');
        const last = text.lastIndexOf('}');
        if (first !== -1 && last !== -1) {
          try {
            const inner = JSON.parse(text.slice(first, last + 1));
            res.status(200).json(inner);
            return;
          } catch (e) {
            // ignore
          }
        }
      }
    }

    res.status(200).json(parsed);
  } catch (err) {
    console.error('evaluate error', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
