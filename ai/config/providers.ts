/**
 * LLM provider configuration for the TTA custom reporter.
 *
 * This project does not wire up a live LLM gateway, so `hasApiKey()` reports
 * false and the reporter skips its AI RCA / flaky-summary steps.
 */
export function hasApiKey(): boolean {
    return false;
}
