import { useEffect } from "react";
import { Badge, EmptyState, PageHeader, Section } from "../design-system";
import { getClassBySlug, getClasses, getGuidesRelatedToSkill, getSource, type SpiritValeSkill, type SpiritValeSource } from "../data";
import { DatabaseDisclaimer, DatabaseLayout, DatabaseSources, RelatedGuides, SkillEntityBreadcrumb } from "../components";
import { applySkillMetadata } from "./site";

const pendingText = "Not verified / unavailable.";

function SkillField({ label, value }: { label: string; value: string | number | null }) {
  return <div className="card-detail__field"><dt>{label}</dt><dd>{value === null || value === "" ? pendingText : String(value)}</dd></div>;
}

export function SkillDetailPage({ skill }: { skill: SpiritValeSkill }) {
  const relatedGuides = getGuidesRelatedToSkill(skill);
  const sources = skill.sourceIds.map(getSource).filter((source): source is SpiritValeSource => Boolean(source));
  const classNames = skill.classIds.map((id) => getClassBySlug(id.replace(/^class-/, "")) ?? getClasses().find((gameClass) => gameClass.id === id)).filter(Boolean).map((gameClass) => gameClass!.name);

  useEffect(() => { applySkillMetadata(skill); }, [skill]);

  return (
    <main id="main-content">
      <div className="sv-container database-page skill-detail-page">
        <Section className="database-page__breadcrumb"><SkillEntityBreadcrumb skill={skill} /></Section>
        <DatabaseLayout>
          <header className="card-detail__header">
            <div className="database-header__meta"><Badge tone="warning">Partially Verified</Badge><Badge>Skill</Badge></div>
            <h1>{skill.name}</h1>
            <p>{skill.description ?? pendingText}</p>
          </header>
          <section className="database-section" id="overview">
            <h2>Overview</h2>
            <p>{skill.description ?? pendingText}</p>
            <dl className="card-detail__fields"><SkillField label="Verification Status" value="Partially verified community record" /><SkillField label="Verified at" value={skill.lastVerifiedAt} /></dl>
          </section>
          <section className="database-section" id="class-relation">
            <h2>Class Relation</h2>
            {classNames.length ? <ul>{classNames.map((name) => <li key={name}><a className="sv-focusable" href={"/classes/" + name.toLowerCase() + "/"}>{name}</a></li>)}</ul> : <p>{pendingText}</p>}
          </section>
          <section className="database-section" id="effect-evidence"><h2>Effect Evidence</h2><p>{skill.effectText ?? pendingText}</p></section>
          <section className="database-section" id="level-information"><h2>Level Information</h2><dl className="card-detail__fields"><SkillField label="Maximum Level" value={skill.maxLevel} /><SkillField label="Cooldown" value={skill.cooldownSeconds === null ? null : skill.cooldownSeconds + " seconds"} /><SkillField label="Resource Cost" value={skill.resourceCost === null ? null : String(skill.resourceCost)} /></dl></section>
          <section className="database-section" id="field-safety">
            <h2>Not Verified / Unavailable</h2>
            <p>Only fields supported by the registered source are shown. Comparative rankings, build recommendations, damage output, tiers, and scaling claims are not published for this record.</p>
            <ul><li>Damage output: {pendingText}</li><li>Comparative ranking: {pendingText}</li><li>Build recommendation and scaling: {pendingText}</li></ul>
          </section>
          <section className="database-section" id="related-guides">
            <h2>Related Guides</h2>
            <ul>
              <li><a className="sv-focusable" href="/database/skills/">Skills Database</a></li>
              <li><a className="sv-focusable" href="/guides/class-guide/">Class Guide</a></li>
              <li><a className="sv-focusable" href="/guides/beginner-guide/">Beginner Guide</a></li>
              <li><a className="sv-focusable" href="/guides/leveling-guide/">Leveling Guide</a></li>
              <li><a className="sv-focusable" href="/classes/">Classes</a></li>
              <li><a className="sv-focusable" href="/guides/">Build Guides</a></li>
            </ul>
            <RelatedGuides guides={relatedGuides} />
          </section>
          <DatabaseSources sources={sources} />
          <DatabaseDisclaimer />
        </DatabaseLayout>
      </div>
    </main>
  );
}

export function SkillNotFoundPage() {
  return <main id="main-content"><div className="sv-container site-safe-route"><PageHeader description="The requested skill is not part of the source-backed SpiritVale Skills collection." title="Skill not found" /><EmptyState action={<a className="sv-button sv-button--outline sv-focusable" href="/database/skills/">Browse Skills Database</a>} description={pendingText} title="This skill is unavailable" /></div></main>;
}
