/**
 * Shape of the `self-heal` attachment consumed by the TTA custom reporter's
 * Self-Heal tab. Nothing in this project produces these attachments yet.
 */
export interface HealCandidate {
    selector: string;
    strategy: string;
    matchCount: number;
    visible: boolean;
    reasoning: string;
}

export interface HealReport {
    failedSelector: string;
    intent: string;
    verified: HealCandidate[];
    rejected: { selector: string; reason: string }[];
    unavailableReason?: string;
}
