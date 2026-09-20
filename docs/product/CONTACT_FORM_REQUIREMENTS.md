# Contact form requirements

**Status (v1 launch decision):**

- **V1 Contact Strategy:** Email-only contact approved for launch.
- **Web Form:** Deferred to post-launch.
- **Form Provider:** TBD — NOT SELECTED.
- **Priority:** Post-launch / P2 (unless product owner changes decision).

## Current production strategy

**Email-only contact is approved for v1 launch.** The `/contact` page shows `pathwisse@gmail.com` as a prominent `mailto:` link, explains what to include, and directs visitors to email the team. No web form is rendered, because contact through email is sufficient and a non-functional form would appear broken.

**Fallback contact:** `pathwisse@gmail.com` (approved).

The completed front-end form (`src/components/forms/DemoRequestForm.astro`) and provider-agnostic server-side validation (`src/lib/demoRequest.ts`) remain in the repository, **unused**, so enabling a provider later is a small change. If the form is rendered while `contactSubmission.endpoint` is `null` (`src/lib/contact.ts`), it never claims success; it shows the calm unavailable message with the fallback email.

## Purpose and audience

The primary contact path is a request for an initial institution conversation. It is intended for college and university representatives, including placement, faculty, and institutional leadership roles. It is not a student support, application, or account channel.

Collect only enough context to understand who is enquiring, how to respond, and what they want to discuss. Do not request student records, learner-level data, or sensitive personal information.

## Decisions

| Decision              | Value                                                                   | Status               |
| --------------------- | ----------------------------------------------------------------------- | -------------------- |
| Form / email provider | **TBD — NOT SELECTED** (Resend was evaluated and removed; not approved) | Open                 |
| Public contact email  | `pathwisse@gmail.com`                                                   | Approved             |
| Hosting               | Vercel                                                                  | Approved             |
| Live web submission   | None                                                                    | Deferred to provider |

No database, CRM, queue, authentication, or admin interface exists or is approved.

## Field decision table (for a future form)

| Field                           | Form name     | Required | Server limits                                 | Guardrail                                                                         |
| ------------------------------- | ------------- | -------- | --------------------------------------------- | --------------------------------------------------------------------------------- |
| Full name                       | `fullName`    | Yes      | 2–100 chars, single line                      | Personal information; used only to respond.                                       |
| Work email                      | `workEmail`   | Yes      | 3–254 chars, single line, syntactically valid | Reply address.                                                                    |
| Institution                     | `institution` | Yes      | 2–160 chars, single line                      | Free text.                                                                        |
| Role or designation             | `role`        | Yes      | 2–100 chars, single line                      | Free text; no authority is inferred.                                              |
| What would you like to discuss? | `context`     | Yes      | 20–2000 chars, newlines allowed               | Instructs users not to include student records or sensitive personal information. |
| (hidden honeypot)               | `website`     | No       | Must be empty                                 | Real users never see it.                                                          |

Phone number is intentionally not collected.

## Validation requirements

Client-side validation is a convenience; a server must validate independently. `src/lib/demoRequest.ts` already implements, without any provider dependency:

- `POST` only; `Content-Type: application/json`; 10,000-byte body limit.
- Strict field allow-list (five fields plus honeypot); every field a string, trimmed, length-checked, no control characters; single-line fields reject line breaks (header-injection guard); conservative email pattern.
- Plain-text email body builder (no HTML from user input), `Reply-To` = submitted email, never `From`.
- Client-side: labels, `aria-describedby`/`aria-invalid`, error summary, focus on the first invalid field, values preserved on error.

## Submission state rules (for any future provider)

- **Submitting:** disable duplicate submissions and announce progress.
- **Success:** display only after an authoritative success response from the provider or endpoint. Direction: “Thanks. We’ve received your request.” No response-time promise.
- **Failure:** keep entered values; “We couldn’t send your request. Please try again.” plus the fallback email; expose no technical detail.
- **Unavailable:** never show success. Use calm wording such as “Online demo requests are being set up.”

## Abuse protection considerations

Baseline available in `demoRequest.ts`: honeypot (silent drop), method restriction, content-type check, size limit, field allow-list, generic error responses. Not implemented: rate limiting and CAPTCHA. Add them if abuse appears; either needs an explicit decision (rate limiting needs shared state on serverless hosts; CAPTCHA adds a third-party script).

## Choosing a provider — what must be decided

1. The provider and whether it needs a server route. A hosted-form provider posting directly from the browser needs no server code and keeps the site fully static; an email API needs a Vercel serverless function (and would then justify the Vercel adapter, subject to the dependency audit).
2. Receiving destination and operational owner.
3. Data processing, retention, deletion, and access arrangements.
4. Privacy notice and any consent language (legal content is not written by engineering).
5. Spam and abuse controls.
6. A real end-to-end test: delivery, reply behavior, failure handling, accessibility.

## Privacy wording

> Please do not include student records or sensitive personal information.

Do not publish claims about encryption, confidentiality, compliance, retention, deletion, response time, or data location until verified and approved. No retention period is stated.

## Alternative paths

- Institution visitors can review `/institutions`.
- Visitors can understand the model at `/how-it-works`.
- Students should be directed to `/students` and should not send student information through this channel.
