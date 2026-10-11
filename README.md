# wow-guild-agent

This is an [eve](https://eve.dev) agent bootstrapped with [`eve init`](https://eve.dev/docs/reference/cli#eve-init).

## Getting started

First, run the development server:

```bash
eve dev
```

The development TUI opens an interactive session where you can send messages to your agent.

Start by editing `agent/instructions.md` to define the agent's identity, purpose, tone, and response guidelines. Configure its model and runtime behavior in `agent/agent.ts`.

Add capabilities under `agent/`, including tools, connections, channels, skills, subagents, and schedules. eve reloads your changes as you work.

## Discord communications

The native Discord channel lives in `agent/channels/discord.ts` and exposes
`POST /eve/v1/discord`. Guild members interact through slash commands (default:
`/ask message:...`), with optional file attachments. Replies and approval buttons
are handled by eve. Ordinary chat messages and @mentions are not handled by this
HTTP Interactions channel.

Only server members with role `1558977000428011630` can invoke commands or
respond to approval buttons, selects, and modals. DMs, bot accounts, and
interactions without that role are rejected before reaching the agent.

### Finish guided setup

1. Create or open a bot application in the
   [Discord Developer Portal](https://discord.com/developers/applications).
2. Under **Bot**, obtain its token. Supply it as `DISCORD_BOT_TOKEN` in your local
   terminal environment; never commit it or paste it into chat.
3. Resume setup from the project root:

   ```bash
   node --env-file=.env.local ./node_modules/.bin/eve add channel/discord --non-interactive --skip-install
   ```

   If setup exits with code `2`, follow the final event's prerequisite and
   `next` command. Non-secret questions can be answered with `--answer`; never
   use that flag for a token. If a project link is required, run
   `./node_modules/.bin/eve link --non-interactive --project <name-or-id>`.
4. Guided setup replaces the initial environment-based channel definition with
   Connect-managed credentials, registers the slash command, configures the
   interaction endpoint, and prints the bot installation URL. Use that URL to
   install the bot in your guild's server. Run the deployment command reported
   by setup if it says deployment is required.
5. Test `/ask message:Introduce yourself` in Discord. Global commands can take
   up to an hour to appear.

The channel uses the `discord/wow-guild-agent` Vercel Connect connector for
credentials and inbound verification. The bot token in `.env.local` is needed
for setup, not as a production environment variable.

## Learn more

To learn more about eve, explore these resources:

- [eve documentation](https://eve.dev/docs) — learn about eve's features and authoring APIs.
- [Build an Agent tutorial](https://eve.dev/docs/tutorial/first-agent) — build and deploy an agent step by step.
- [eve on GitHub](https://github.com/vercel/eve) — view the source and contribute.

## Deploy on Vercel

Deploy your agent to [Vercel](https://vercel.com) from the project root:

```bash
eve deploy
```

`eve deploy` links a Vercel project if needed and deploys the agent to production. See the [eve deployment documentation](https://eve.dev/docs/guides/deployment/vercel) for authentication, environment variables, and deployment options.
