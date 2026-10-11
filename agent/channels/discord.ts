import { connectDiscordCredentials } from "@vercel/connect/eve";
import {
  defaultDiscordAuth,
  discordChannel,
  type DiscordContext,
  type DiscordInteractionBase,
} from "eve/channels/discord";

const requiredRoleId = "1558977000428011630";

export function authorizeDiscordInteraction(
  _ctx: DiscordContext,
  interaction: DiscordInteractionBase,
) {
  if (
    !interaction.guildId ||
    interaction.user.isBot ||
    !interaction.member?.roles.includes(requiredRoleId)
  ) {
    return null;
  }

  return { auth: defaultDiscordAuth(interaction) };
}

export default discordChannel({
  credentials: connectDiscordCredentials("discord/wow-guild-agent"),
  onCommand: authorizeDiscordInteraction,
  onInputResponse: authorizeDiscordInteraction,
});
