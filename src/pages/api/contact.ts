import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { handleContact } from '@/lib/contact-handler';
import { securityHeaders } from '@/lib/security-headers';

export const prerender = false;

export const POST: APIRoute = ({ request }) => handleContact(request, env);

export const ALL: APIRoute = async () => new Response(null, {
  status: 405,
  headers: { ...securityHeaders, allow: 'POST', 'cache-control': 'no-store' }
});
