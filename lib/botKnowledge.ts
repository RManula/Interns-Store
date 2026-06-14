/* ──────────────────────────────────────────────────────────────────────────
   Knowledge base for the Interns AI assistant (FloatingAIBot).
   Client-side only — canned, keyword-matched responses (no backend).
   ──────────────────────────────────────────────────────────────────────── */

export const TEASERS = [
  "Need help finding an internship? 🎯",
  "Hi! I'm here whenever you're ready 👋",
  "Want me to review your CV? 📄",
  "Ask me anything about internships!",
  "Looking for remote roles? I can help 🌏",
];

export const DEFAULT_SUGGESTIONS = [
  "Find internships for my degree 🎓",
  "Review my CV 📄",
  "Help me prep for an interview 💬",
  "Show me remote internships 🌏",
  "Paid vs credit internships?",
];

export function welcomeMessage(firstName?: string) {
  const who = firstName ? ` ${firstName}` : "";
  return `Hi${who}! I'm your Interns AI assistant 🤖 I can help you find internships, polish your CV and prep for interviews. What would you like help with?`;
}

type ReplyRule = { keywords: string[]; reply: string };

const RULES: ReplyRule[] = [
  {
    keywords: ["cv", "resume", "résumé"],
    reply:
      "I'd love to help with your CV! 📄 Strong student CVs lead with a clear headline, list coursework and projects as evidence, and quantify impact where you can. In the full version I'll review your uploaded résumé line by line — for now, the Resume Builder under your dashboard is a great start.",
  },
  {
    keywords: ["interview", "prep", "prepare"],
    reply:
      "Interview prep is my favourite 💬 Practise the STAR method (Situation, Task, Action, Result), research the employer, and prepare two questions to ask them. Pro members get a full interview toolkit — want me to point you to it?",
  },
  {
    keywords: ["remote", "work from home", "anywhere"],
    reply:
      "Remote internships are growing fast 🌏 Head to Browse and tap the Remote quick-filter, or filter by mode → Remote. I can surface the newest remote roles that match your skills in the full version.",
  },
  {
    keywords: ["paid", "salary", "stipend", "credit", "unpaid"],
    reply:
      "Good question! 💸 Paid internships offer a wage or stipend, while credit-eligible ones count toward your degree. Use the Paid and Credit eligible filters in Browse to see each. Many students do one of each across their studies.",
  },
  {
    keywords: ["match", "degree", "course", "study", "recommend"],
    reply:
      "I can match roles to your field 🎓 Make sure your profile lists your degree and skills, then use the Study field filter in Browse. With Pro, I rank listings by how well they fit your course and interests automatically.",
  },
  {
    keywords: ["apply", "application", "how do i apply"],
    reply:
      "Applying is quick ✅ Open any listing, hit Apply, and your saved profile fills most of it in. You can track every application from Saved & Applications in your dashboard.",
  },
  {
    keywords: ["hello", "hi", "hey", "yo"],
    reply: "Hey there! 👋 Ask me about finding internships, your CV, or interview prep — I'm all ears.",
  },
  {
    keywords: ["thanks", "thank you", "cheers", "ty"],
    reply: "Anytime! 💙 I'm right here in the corner whenever you need a hand.",
  },
];

const FALLBACK =
  "Great question! In the full version I'll search live internships and give you a tailored answer. For now, head to Browse and try filters that match your profile — I'll be right here if you need me 🚀";

export function getReply(text: string): string {
  const t = text.toLowerCase();
  const hit = RULES.find((rule) => rule.keywords.some((k) => t.includes(k)));
  return hit ? hit.reply : FALLBACK;
}
