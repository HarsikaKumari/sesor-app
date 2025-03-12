import { randomBytes } from "crypto";

/**
 * Generates a random API key.
 * @param length The length of the API key (default is 32).
 * @returns A randomly generated API key as a string.
 */
export function generateApiKey(length: number = 16): string {
  return randomBytes(length).toString("hex");
}
