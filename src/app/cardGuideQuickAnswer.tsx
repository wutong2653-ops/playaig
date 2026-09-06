import "./cardGuideQuickAnswer.css";

export function CardGuideQuickAnswer() {
  return (
    <section className="card-guide-quick-answer" aria-labelledby="card-guide-quick-answer-title">
      <p className="card-guide-quick-answer__eyebrow">Quick answer</p>
      <h2 id="card-guide-quick-answer-title">What are SpiritVale Cards?</h2>
      <p>
        SpiritVale&apos;s official Steam listing places cards among the character-customization systems discussed alongside equipment, artifacts, skills and loot. Cards therefore belong to the game&apos;s documented customization vocabulary, but the official listing does not publish a complete card rulebook.
      </p>
      <p>
        The current verified boundary is simple: the high-level purpose is documented, while exact slots, effect conditions, acquisition routes and rankings are not yet confirmed by a first-party source. Use this guide for the explanation, then browse the{" "}
        <a className="sv-focusable" href="/database/cards/">SpiritVale Cards Database</a>
        {" "}for source-backed community records and the verification label attached to each field.
      </p>
    </section>
  );
}
