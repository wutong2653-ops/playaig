import { randomUUID } from "node:crypto";
import {
  MANIFEST_STATUSES,
  checkFieldPermission,
  getSource,
  loadSourceRegistry,
  validateManifest
} from "./registry.mjs";

export const CONFIDENCE_THRESHOLD = 75;
export const ENTITY_TYPES = ["card", "cards", "equipment", "skill", "skills", "monster", "monsters", "bosses", "maps"];

const now = () => new Date().toISOString();

function hasValue(value) {
  return value !== undefined && value !== null && value !== "";
}

function scoreManifest(manifest, source) {
  if (typeof manifest.confidenceScore === "number") return manifest.confidenceScore;
  const fields = Object.keys(manifest.extractedFields ?? {});
  const evidence = Object.keys(manifest.fieldEvidence ?? {});
  const authority = source?.verificationLevel === 1 ? 60 : source?.verificationLevel === 2 ? 45 : 30;
  const completeness = Math.min(20, fields.length * 4);
  const evidenceScore = Math.min(10, evidence.length * 2);
  const conflictScore = (manifest.conflicts ?? manifest.rawData?.conflicts)?.length ? 0 : 10;
  return Math.min(100, authority + completeness + evidenceScore + conflictScore);
}

export function createManifest(input = {}) {
  const extractedFields = input.extractedFields ?? {};
  return {
    manifestId: input.manifestId ?? `manifest-${randomUUID().replaceAll("-", "")}`,
    sourceId: input.sourceId ?? "",
    entityType: input.entityType ?? "cards",
    entityIdCandidate: input.entityIdCandidate ?? extractedFields.name ?? null,
    rawData: input.rawData ?? {},
    extractedFields,
    fieldEvidence: input.fieldEvidence ?? {},
    sourceLocator: input.sourceLocator ?? "",
    extractionDate: input.extractionDate ?? now(),
    operator: input.operator ?? "unknown",
    confidenceScore: input.confidenceScore ?? null,
    status: input.status ?? "draft",
    reviewNotes: input.reviewNotes ?? null,
    reviewer: input.reviewer ?? null,
    reviewDate: input.reviewDate ?? null
  };
}

function inspectManifest(manifest, registry) {
  const errors = [];
  const warnings = [];
  const source = getSource(manifest?.sourceId, registry);
  const sourceValidation = {
    sourceId: manifest?.sourceId ?? null,
    exists: Boolean(source),
    verificationLevel: source?.verificationLevel ?? null,
    sourceType: source?.sourceType ?? null,
    sourceUrl: source?.sourceUrl ?? source?.url ?? null,
    valid: Boolean(source)
  };

  if (!manifest || typeof manifest !== "object") errors.push("manifest must be an object");
  if (!hasValue(manifest?.manifestId)) errors.push("manifestId is required");
  if (!hasValue(manifest?.sourceId) || !source) errors.push("unknown sourceId: " + (manifest?.sourceId ?? ""));
  if (!ENTITY_TYPES.includes(manifest?.entityType)) errors.push("invalid entityType");
  if (!hasValue(manifest?.entityIdCandidate)) errors.push("entityIdCandidate is required");
  if (!manifest?.rawData || typeof manifest.rawData !== "object" || Array.isArray(manifest.rawData)) errors.push("rawData must be an object");
  if (!manifest?.extractedFields || typeof manifest.extractedFields !== "object" || Array.isArray(manifest.extractedFields)) errors.push("extractedFields must be an object");
  if (!manifest?.fieldEvidence || typeof manifest.fieldEvidence !== "object" || Array.isArray(manifest.fieldEvidence)) errors.push("fieldEvidence must be an object");
  if (!hasValue(manifest?.sourceLocator)) errors.push("sourceLocator is required");
  if (!manifest?.extractionDate || Number.isNaN(Date.parse(manifest.extractionDate))) errors.push("invalid extractionDate");
  if (!hasValue(manifest?.operator)) errors.push("operator is required");
  if (manifest?.status && !MANIFEST_STATUSES.includes(manifest.status)) errors.push("invalid status");

  const fieldPermissions = Object.keys(manifest?.extractedFields ?? {}).map((field) => {
    const result = checkFieldPermission(manifest.sourceId, field, registry);
    if (!result.allowed) errors.push(result.reason);
    return { field, allowed: result.allowed, reason: result.reason };
  });

  const missingFields = [];
  if (!hasValue(manifest?.extractedFields?.name)) missingFields.push("name");
  if (missingFields.length) warnings.push("missing recommended fields: " + missingFields.join(", "));

  const conflicts = manifest?.conflicts ?? manifest?.rawData?.conflicts ?? [];
  if (!Array.isArray(conflicts)) errors.push("conflicts must be an array when provided");
  if (Array.isArray(conflicts) && conflicts.length) errors.push("unresolved field conflicts: " + conflicts.join(", "));

  const confidenceScore = scoreManifest(manifest, source);
  if (confidenceScore < CONFIDENCE_THRESHOLD) warnings.push(`confidenceScore ${confidenceScore} is below approval threshold ${CONFIDENCE_THRESHOLD}`);

  const baseValidation = validateManifest({
    ...manifest,
    status: manifest?.status ?? "draft"
  }, registry);
  for (const error of baseValidation.errors) if (!errors.includes(error)) errors.push(error);

  const valid = errors.length === 0;
  const suggestedStatus = !valid ? "rejected" : confidenceScore < CONFIDENCE_THRESHOLD ? "review" : "validation";
  return {
    valid,
    errors,
    warnings,
    sourceValidation,
    fieldPermissions,
    missingFields,
    conflicts: Array.isArray(conflicts) ? conflicts : [],
    confidenceScore,
    suggestedStatus,
    approvalStatus: valid && confidenceScore >= CONFIDENCE_THRESHOLD ? "eligible_for_review" : valid ? "review_required" : "rejected"
  };
}

export function validateManifestWorkflow(manifest, registry = loadSourceRegistry()) {
  const normalized = createManifest(manifest);
  const report = inspectManifest(normalized, registry);
  return {
    manifest: { ...normalized, confidenceScore: report.confidenceScore, status: report.suggestedStatus },
    report,
    valid: report.valid,
    status: report.suggestedStatus
  };
}

export function reviewManifest(manifest, reviewer, reviewNotes = "") {
  const validation = validateManifestWorkflow(manifest);
  if (!validation.valid) return { ...validation, manifest: { ...validation.manifest, status: "rejected", reviewer, reviewDate: now(), reviewNotes } };
  return {
    ...validation,
    manifest: { ...validation.manifest, status: "review", reviewer, reviewDate: now(), reviewNotes }
  };
}

export function approveManifest(manifest, reviewer, reviewNotes = "") {
  const validation = validateManifestWorkflow(manifest);
  const isReviewable = manifest?.status === "review";
  if (!validation.valid || !isReviewable || validation.report.confidenceScore < CONFIDENCE_THRESHOLD) {
    return {
      ...validation,
      manifest: { ...validation.manifest, status: "review", reviewer, reviewDate: now(), reviewNotes },
      approved: false,
      entityReady: false
    };
  }
  return {
    ...validation,
    manifest: { ...validation.manifest, status: "approved", reviewer, reviewDate: now(), reviewNotes },
    approved: true,
    entityReady: true
  };
}

export function rejectManifest(manifest, reviewer, reviewNotes = "") {
  const normalized = createManifest(manifest);
  return {
    manifest: { ...normalized, status: "rejected", reviewer, reviewDate: now(), reviewNotes },
    rejected: true,
    entityReady: false
  };
}

export function isEntityReady(manifest) {
  return manifest?.status === "approved" && typeof manifest.confidenceScore === "number" && manifest.confidenceScore >= CONFIDENCE_THRESHOLD;
}

export function getReviewQueue(manifests = [], registry = loadSourceRegistry()) {
  return manifests
    .filter((manifest) => manifest.status === "review")
    .map((manifest) => {
      const result = validateManifestWorkflow(manifest, registry);
      return {
        manifestId: manifest.manifestId,
        entityType: manifest.entityType,
        source: getSource(manifest.sourceId, registry)?.name ?? manifest.sourceId,
        sourceId: manifest.sourceId,
        confidenceScore: result.report.confidenceScore,
        validationResult: result.valid ? "PASS" : "FAIL",
        createdDate: manifest.extractionDate
      };
    });
}

export function buildValidationReport(manifest, registry = loadSourceRegistry()) {
  const result = validateManifestWorkflow(manifest, registry);
  return {
    manifestId: result.manifest.manifestId,
    sourceValidation: result.report.sourceValidation,
    fieldPermission: result.report.fieldPermissions,
    missingFields: result.report.missingFields,
    conflicts: result.report.conflicts,
    confidenceScore: result.report.confidenceScore,
    approvalStatus: manifest?.status === "approved" ? "approved" : result.report.approvalStatus,
    errors: result.report.errors,
    warnings: result.report.warnings
  };
}

export function dryRunWorkflow(manifest, registry = loadSourceRegistry()) {
  const validation = validateManifestWorkflow(manifest, registry);
  return { ...validation, writes: [], entityWrites: 0 };
}
