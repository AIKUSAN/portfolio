/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type PortfolioEmail = {
  send(message: {
    from: string | { email: string; name?: string };
    to: string | { email: string; name?: string };
    replyTo?: string | { email: string; name?: string };
    subject: string;
    text: string;
    html: string;
  }): Promise<unknown>;
};

type PortfolioEnv = {
  EMAIL: PortfolioEmail;
  TURNSTILE_SECRET_KEY: string;
  TURNSTILE_EXPECTED_HOSTNAME: string;
  CONTACT_FROM: string;
  CONTACT_RECIPIENT: string;
};

declare namespace App {
  interface Locals {
    runtime: {
      env: PortfolioEnv;
      ctx: ExecutionContext;
      cf: IncomingRequestCfProperties;
      caches: CacheStorage;
    };
  }
}

interface Window {
  turnstile?: {
    render(container: HTMLElement, options: {
      sitekey?: string;
      action: string;
      theme: 'light' | 'dark';
    }): string;
    reset(container?: HTMLElement | null): void;
  };
}
