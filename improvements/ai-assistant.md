# Feature — Interns AI Assistant (paid students)

A floating AI career assistant for students on the **Plus** or **Pro** plan. Demo login: `pro@demo.com` / `password`.

## What it does
- **3D character** (`components/ui/FloatingAIBot.tsx`) — a hand-built SVG recreation of the Rakata-style robot: glossy white squircle head, dark screen with cyan corner brackets, glowing cyan eyes, blue leaf-ears, detached body with a glowing core and blue "drip" collar.
- **Cursor tracking** — the eyes follow the mouse, the head tilts slightly, and the bot blinks and floats up and down.
- **Click to chat** — opens a chat panel with:
  - Popular questions tailored to the current page (`suggestionsForPath`)
  - A free-text input with an animated typing indicator
  - Keyword-aware canned replies (`lib/botKnowledge.ts`) — CV, interview, remote, paid/credit, matching, applying
  - Relative timestamps, reset button, persisted history per user
  - Personalised greeting using the student's first name
  - Plan badge and a "Powered by Interns AI" footer

## Gating
Only renders when `user.role === "student"` and `activePlan` is `Plus` or `Pro`. Free students and employers never see it. Listed as a feature in the student pricing comparison table.

## Files
- `components/ui/FloatingAIBot.tsx` — character + chat panel
- `lib/botKnowledge.ts` — suggestions, teasers, welcome, keyword replies, page-aware suggestions
- Mounted globally in `app/layout.tsx`

## Notes
Responses are simulated client-side (no backend). Chat history is stored in `localStorage` under `interns-store:chat:<userId>`.
