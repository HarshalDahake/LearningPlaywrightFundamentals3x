/**
 * Root-cause analysis agent used by the TTA custom reporter's AI Verdict tab.
 * No LLM gateway is configured in this project; the reporter only calls this
 * when `hasApiKey()` is true, which it never is here.
 */
export interface RcaVerdict {
    severity: 'critical' | 'high' | 'medium' | 'low';
    priority: string;
    rootCause: string;
    fixes: string[];
}

export interface RcaInput {
    title: string;
    file: string;
    error: string;
    stack?: string;
}

export async function analyzeFailure(_input: RcaInput): Promise<RcaVerdict> {
    throw new Error('RCA agent is not configured in this project.');
}
