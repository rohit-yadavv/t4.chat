import { Buffer } from 'buffer';

function base64urlEncode(buffer: ArrayBuffer): string {
  // Convert ArrayBuffer to base64
  const base64 = Buffer.from(buffer).toString('base64');
  // Convert base64 to base64url by replacing characters and removing padding
  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

async function createSHA256CodeChallenge(input: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return base64urlEncode(hash);
}

export const codeVerifier = process.env.CODE_VERIFIER as string;

// Export function to generate code challenge instead of top-level await
export async function getGeneratedCodeChallenge() {
  return await createSHA256CodeChallenge(codeVerifier);
}