const priorityTone = {
  Low: "muted",
  Medium: "calm",
  High: "alert",
  Critical: "critical"
};

export const FeedbackList = ({ items }) => {
  return (
    <section className="feedback-list">
      {items.map((item) => (
        <article className="feedback-card" key={item._id}>
          <div className="feedback-card__top">
            <div>
              <div className="feedback-card__meta">
                <span>{item.category}</span>
                <span>{item.status}</span>
              </div>
              <h3>{item.title}</h3>
            </div>
            <span className={`priority-pill priority-pill--${priorityTone[item.priority]}`}>
              {item.priority}
            </span>
          </div>
          <p>{item.summary}</p>
          <div className="feedback-card__footer">
            <div className="tag-row">
              {item.tags?.map((tag) => (
                <span className="tag" key={tag}>
                  #{tag}
                </span>
              ))}
            </div>
            <div className="feedback-card__stats">
              <span>{item.votes} votes</span>
              <span>{item.comments?.length || 0} comments</span>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

