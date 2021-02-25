declare const allJobs: readonly ["NONE", "GLA", "PGL", "MRD", "LNC", "ARC", "CNJ", "THM", "CRP", "BSM", "ARM", "GSM", "LTW", "WVR", "ALC", "CUL", "MIN", "BTN", "FSH", "PLD", "MNK", "WAR", "DRG", "BRD", "WHM", "BLM", "ACN", "SMN", "SCH", "ROG", "NIN", "MCH", "DRK", "AST", "SAM", "RDM", "BLU", "GNB", "DNC"];
declare type Job = typeof allJobs[number];
declare const allRoles: readonly ["tank", "healer", "dps", "crafter", "gatherer", "none"];
declare type Role = typeof allRoles[number];
declare const Util: {
    readonly jobEnumToJob: (id: number) => "NONE" | "GLA" | "PGL" | "MRD" | "LNC" | "ARC" | "CNJ" | "THM" | "CRP" | "BSM" | "ARM" | "GSM" | "LTW" | "WVR" | "ALC" | "CUL" | "MIN" | "BTN" | "FSH" | "PLD" | "MNK" | "WAR" | "DRG" | "BRD" | "WHM" | "BLM" | "ACN" | "SMN" | "SCH" | "ROG" | "NIN" | "MCH" | "DRK" | "AST" | "SAM" | "RDM" | "BLU" | "GNB" | "DNC";
    readonly jobToJobEnum: (job: Job) => number;
    readonly jobToRole: (job: Job) => "tank" | "healer" | "dps" | "crafter" | "gatherer" | "none";
    readonly getAllRoles: () => readonly Role[];
    readonly isTankJob: (job: Job) => boolean;
    readonly isHealerJob: (job: Job) => boolean;
    readonly isMeleeDpsJob: (job: Job) => boolean;
    readonly isRangedDpsJob: (job: Job) => boolean;
    readonly isCasterDpsJob: (job: Job) => boolean;
    readonly isDpsJob: (job: Job) => boolean;
    readonly isCraftingJob: (job: Job) => boolean;
    readonly isGatheringJob: (job: Job) => boolean;
    readonly isCombatJob: (job: Job) => boolean;
    readonly canStun: (job: Job) => boolean;
    readonly canSilence: (job: Job) => boolean;
    readonly canSleep: (job: Job) => boolean;
    readonly canCleanse: (job: Job) => boolean;
    readonly canFeint: (job: Job) => boolean;
    readonly canAddle: (job: Job) => boolean;
};
export default Util;
//# sourceMappingURL=util.d.ts.map