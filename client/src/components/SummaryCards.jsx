const getCount = (items, label) => items.find((item) => item._id === label)?.count || 0;

export const SummaryCards = ({ summary }) => {
  const cards = [
    { label: "Open", value: getCount(summary.statusBreakdown, "Open") },
    { label: "In Progress", value: getCount(summary.statusBreakdown, "In Progress") },
    { label: "Released", value: getCount(summary.statusBreakdown, "Released") },
    { label: "Top Category", value: summary.categoryBreakdown[0]?._id || "None" }
  ];

  return (
    <section className="summary-grid">
      {cards.map((card) => (
        <article className="summary-card" key={card.label}>
          <span>{card.label}</span>
          <strong>{card.value}</strong>
        </article>
      ))}
    </section>
  );
};

