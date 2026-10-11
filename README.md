# Daytraiders Guild Assistant

An AI assistant for the leadership of **Daytraiders**, a **World of Warcraft
Forever** guild. Built with [eve](https://eve.dev), it uses Discord as its primary
communication surface and helps officers handle the busywork of running a guild.

All WoW-related requests are treated as Forever-specific. The assistant should
not substitute Retail or Classic mechanics when Forever details are unknown.

## What it helps with

- Raid planning, sign-up coordination, and attendance follow-up.
- Roster planning, recruitment, and onboarding.
- Draft announcements, reminders, agendas, and summaries.
- Turning leadership requests into plans, checklists, and next steps.

Leadership retains decision-making authority. The assistant distinguishes drafts
from completed actions and asks for approval before sensitive changes or
guild-wide announcements unless the details are already approved.

**Current scope:** Discord conversations and drafting/planning assistance are
configured. Live game-data access, automated roster updates, scheduled reminders,
and other guild-management integrations have not been added yet.

## Using the bot in Discord

Use the `/ask` command with a required `message` and an optional `file` attachment:

```text
/ask message:Introduce yourself and explain how you can help Daytraiders leadership.
/ask message:Draft a raid sign-up reminder. Ask me for any missing details.
```

Only server members with role **`1558977000428011630`** can interact with the bot.
The role check applies to commands, approval buttons, selects, and modals. DMs,
bot accounts, and interactions without the role are rejected before reaching the
agent. Administrators do not bypass this check.

The native Discord channel handles HTTP Interactions, not ordinary chat messages
or @mentions. eve handles replies, attachments, and approval controls.

## Local development

Use **Node.js 24.x** and **Bun**. From the project root:

```bash
bun install
bun run dev
```

The eve development TUI opens a local session, and eve reloads authored changes
as you work. Local TUI access is separate from Discord and is not subject to the
Discord role check.

Available checks and build commands:

```bash
bun run typecheck
bun run build
```

## Project structure

| File | Purpose |
| --- | --- |
| `agent/instructions.md` | Daytraiders identity, Forever context, and behavior guidelines. |
| `agent/agent.ts` | Model and reasoning configuration. |
| `agent/channels/discord.ts` | Discord integration and required-role authorization. |
| `agent/channels/eve.ts` | HTTP/TUI channel and authentication configuration. |

Add future capabilities under `agent/` using eve's tools, connections, skills,
and schedules. Consult the installed `node_modules/eve/docs/README.md` before
authoring framework integrations.

## Discord configuration

Discord is already configured for this project:

- **Connector:** `discord/wow-guild-agent` in Vercel Connect.
- **Agent route:** `POST /eve/v1/discord`.
- **Command:** `/ask` with `message` and optional `file`.
- **Credentials and inbound verification:** managed through Vercel Connect.

The local `DISCORD_BOT_TOKEN` in `.env.local` is used for setup; it is not needed
as a production environment variable. Never commit tokens or paste them into
chat. Environment files are ignored by Git.

For a fresh Discord application or connector, follow the
[eve Discord setup guide](https://eve.dev/docs/channels/discord). The setup CLI
does not automatically load `.env.local`; use Node's `--env-file` option when
supplying credentials from that file. Do not blindly rerun setup over the
existing channel: preserve its role checks if the generated file is replaced.
Global commands can take up to an hour to appear after registration.

## Deployment

The agent is deployed to **https://wow-guild-agent.vercel.app** in the Vercel
project `wow-guild-agent`.

Deploy changes from the project root:

```bash
./node_modules/.bin/eve deploy --non-interactive --yes --project wow-guild-agent
```

eve builds and deploys the agent, then pulls the Vercel development environment
into `.env.local`. After changing Discord authorization, test `/ask` with users
both with and without the required role. A successful build alone does not
verify an end-to-end Discord reply.

## Resources

- [eve documentation](https://eve.dev/docs)
- [Discord channel](https://eve.dev/docs/channels/discord)
- [Vercel deployment](https://eve.dev/docs/guides/deployment/vercel)
