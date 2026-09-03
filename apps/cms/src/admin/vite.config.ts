import { mergeConfig, type UserConfig } from "vite";

export default (config: UserConfig) =>
  mergeConfig(config, {
    server: {
      allowedHosts: ["sam-admin.wukongshijue.com", "10.0.0.5"],
    },
  });
