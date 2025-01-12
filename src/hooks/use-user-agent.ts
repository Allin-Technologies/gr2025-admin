import { headers } from "next/headers";
import { userAgent } from "next/server";

const FALLBACK_USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
] as const;

/**
 * Get a random user agent from the fallback list
 */
const getRandomUserAgent = () =>
  FALLBACK_USER_AGENTS[Math.floor(Math.random() * FALLBACK_USER_AGENTS.length)];

let cachedUserAgent: string | null = null;

/**
 * Server-side user agent detection
 */
export const getServerUserAgent = async () => {
  // Return cached value if available
  if (cachedUserAgent) return cachedUserAgent;

  try {
    const headersList = await headers();
    const userAgentData = userAgent({ headers: headersList });
    cachedUserAgent = userAgentData.ua ?? getRandomUserAgent();
    return cachedUserAgent;
  } catch (error) {
    console.warn("Failed to get server user agent:", error);
    cachedUserAgent = getRandomUserAgent() ?? null;
    return cachedUserAgent;
  }
};

/**
 * Client-side user agent detection
 */
export const getClientUserAgent = () => {
  if (typeof window === "undefined") return null;
  return window.navigator.userAgent;
};

/**
 * Universal user agent hook that works in both client and server components
 * @returns {string} User agent string
 */
export async function useUserAgent(): Promise<string> {
  // Client-side
  if (typeof window !== "undefined") {
    return (
      getClientUserAgent() ?? getRandomUserAgent() ?? FALLBACK_USER_AGENTS[0]
    );
  }

  // Server-side
  return await getServerUserAgent() ?? FALLBACK_USER_AGENTS[0];
}

/**
 * Types for parsed user agent data
 */
export type UserAgentData = ReturnType<typeof userAgent>;
