interface Config {
  app: {
    name: string;
    version: string;
  };
  auth: {
    enabled: boolean;
    tokenExpiry: string;
  };
  api: {
    url: string;
    rateLimit: number;
  };
  logging: {
    level: string;
  };
}

const config: Config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "ERP Admin System",
    version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
  },
  auth: {
    enabled: process.env.NEXT_PUBLIC_AUTH_ENABLED === "true",
    tokenExpiry: process.env.AUTH_TOKEN_EXPIRY || "24h",
  },
  api: {
    url: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
    rateLimit: parseInt(process.env.API_RATE_LIMIT || "100"),
  },
  logging: {
    level: process.env.LOG_LEVEL || "info",
  },
};

export default config;
