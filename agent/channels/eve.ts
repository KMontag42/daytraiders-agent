import { eveChannel } from "eve/channels/eve";
import { localDev } from "eve/channels/auth";

export default eveChannel({
  // HTTP/TUI input is development-only. Production input must come from Discord.
  auth: localDev(),
});
