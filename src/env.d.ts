/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type PortfolioEmail = {
  send(message: EmailMessageBuilder): Promise<unknown>;
};

type PortfolioEnv = {
  EMAIL: PortfolioEmail;
  TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_EXPECTED_HOSTNAME: string;
  CONTACT_FROM: string;
  CONTACT_RECIPIENT: string;
};

declare namespace Cloudflare {
  interface Env {
    TURNSTILE_SECRET_KEY?: string;
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
