Setting the Gemini API key for development

1. Create or edit the file `.env.local` in the project root.

2. Add your Gemini API key using the Vite prefix (required):

VITE_GEMINI_API_KEY=YOUR_ACTUAL_KEY_HERE

3. Restart the Vite dev server if it's running. Vite reads env vars at startup.

Notes:
- Files named `.env`, `.env.local`, `.env.development` are ignored by default in this project (see `.gitignore`).
- Never commit your API key to version control.
