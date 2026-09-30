/**
 * Flaky-test analyzer used by the TTA custom reporter's Flaky tab.
 * Compares per-test statuses between two builds; the optional LLM summary is
 * omitted because no provider is configured in this project.
 */
export interface BuildSummary {
    runId: string;
    tests: Record<string, 'passed' | 'failed' | 'skipped' | 'timedOut'>;
}

export interface FlakyResult {
    counts: { flaky: number; failing: number; total: number };
    flaky: string[];
    summary?: string;
}

export async function analyzeFlaky(
    prev: BuildSummary,
    curr: BuildSummary,
    _useLlm = false,
): Promise<FlakyResult> {
    const names = new Set([...Object.keys(prev.tests), ...Object.keys(curr.tests)]);
    const flaky: string[] = [];
    let failing = 0;

    for (const name of names) {
        const before = prev.tests[name];
        const after = curr.tests[name];
        if (!before || !after) continue;
        if (after === 'failed' || after === 'timedOut') failing++;
        if (before !== after) flaky.push(name);
    }

    return { counts: { flaky: flaky.length, failing, total: names.size }, flaky };
}
