# Internship Marketplace — Gap Analysis

Comparison of the current Interns Store build against the LinkedIn-style structure spec
(`Linkedin Structure/*.md`) and member ideas. Drives this round of work.

## Already complete
- Homepage, hero, featured internships, newsletter
- Browse/search with filters, side-panel preview, recent searches
- Internship detail + apply wizard
- Student & employer dashboards
- Auth (login/register) with password policy
- Pricing (student + employer), checkout, invoice, billing
- Post internship wizard (employer)
- AI assistant (paid students)
- Blog, about, contact, privacy

## Missing — added this round
| Area | Page / feature | Status |
| --- | --- | --- |
| Student | `/profile` + edit profile | **added** |
| Legal | `/terms` | **added** |
| Legal | `/cookie-policy` | **added** |
| Legal | `/collection-notice` | **added** |
| Legal | `/community-guidelines` | **added** |
| Trust | `/security` (safe searching) | **added** |
| Trust | `/report-listing` | **added** |
| Support | `/help` | **added** |
| Legal | `/cancellation-policy` | **added** |
| Legal | `/refund-policy` | **added** |
| Legal | `/accessibility` | **added** |
| Companies | `/companies` directory + profile | **added** |
| Advice | `/career-advice` hub | **added** |
| Student | saved searches page | **added** |
| Detail | Share + Report actions | **added** |

## Improved
- Mobile header: role-aware CTA, sign-in/account section, spacing, dark readability
- Footer: legal/trust/safety link column wired to all new routes

## Still future work (noted, not built)
- Real backend / persistence beyond localStorage
- Admin moderation dashboard (`/admin/*`)
- Employer talent search, market insights
- Community discussions

## From member ideas (VANSHIL / Member 3)
- AI candidate "Top List" screening — noted for employer dashboard (future)
- B2B vs B2C checkout split — already covered by employer/student checkout
- Invoice PDF download — already covered by the invoice/print flow
