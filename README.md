# GRE Quant Trainer

A personalized GRE Quantitative Reasoning training app — 7 progressive levels from foundation arithmetic to Harvard-level problems, with step-by-step guided solving, analytics, and progress saved to Google Drive.

## Run locally

```
npm install
npm run dev
```

The app works immediately in **demo mode**: a built-in bank of 28 guided problems (76 steps) across all 7 levels, with progress saved to this device (localStorage). No Google setup needed to start training.

## Connect Google (Sheets problem bank + Drive sync)

1. **Google Cloud Console** (console.cloud.google.com):
   - Create a project, enable the **Google Sheets API** and **Google Drive API**.
   - Create an **OAuth 2.0 Client ID** (type: Web application).
   - Add your origins to *Authorized JavaScript origins*: `http://localhost:5173` and your deployed URL.
   - Configure the OAuth consent screen with scopes: `spreadsheets.readonly`, `drive.appdata`, `profile`, `email`.
2. **Google Sheet**: create a spreadsheet with a `problems` tab using these columns:
   `id | level | topic | difficulty | question_text | answer | hint | step_count | step1_label | step1_question | step1_choices | step1_correct_index | step1_explanation | step1_why | step2_label | ...`
   - `level`: 1–7, `difficulty`: 1–5, `stepN_choices`: pipe-separated (`$120|$150|$80|$100`), `stepN_correct_index`: 0–3.
3. Copy `.env.example` to `.env` and fill in:
   ```
   VITE_GOOGLE_CLIENT_ID=<your client id>
   VITE_SPREADSHEET_ID=<your spreadsheet id>
   ```
4. Restart the dev server. The login screen now shows **Continue with Google**; progress syncs to a private Drive app folder (hidden from your Drive UI), and problems load from your sheet.

## Build & deploy

```
npm run build        # outputs dist/
```

- **Vercel**: `npx vercel` from this folder (SPA rewrites are preconfigured in `vercel.json`).
- **Netlify**: `npx netlify-cli deploy --prod`, or drag the `dist/` folder onto https://app.netlify.com/drop (`netlify.toml` included).
- Set `VITE_GOOGLE_CLIENT_ID` and `VITE_SPREADSHEET_ID` as environment variables in the host's dashboard, and add the deployed URL to the OAuth client's authorized origins.

## Scoring

- Each step answered correctly = 1 point; with a hint = 0.5 points.
- Level score = points ÷ total steps × 100. Reaching the level's pass threshold (70–85%) unlocks the next level.
- Estimated GRE score = 130 + up to 5.5 points per completed level (weighted by level score), capped at 170.

## Stack

React 18 + Vite + TypeScript · Tailwind CSS v3 · Zustand · React Router v6 · Recharts · KaTeX · Lucide icons · Google Sheets API v4 · Google Drive API v3 (appDataFolder) · `@react-oauth/google`
