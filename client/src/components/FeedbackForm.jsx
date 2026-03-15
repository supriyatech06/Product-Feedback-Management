import { useState } from "react";

const initialState = {
  title: "",
  summary: "",
  category: "Feature",
  status: "Open",
  priority: "Medium",
  authorName: "",
  tags: ""
};

export const FeedbackForm = ({ onSubmit, isSubmitting }) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSubmit({
      ...form,
      tags: form.tags
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    });

    setForm(initialState);
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <div className="section-heading">
        <span>New feedback</span>
        <h2>Log product signals fast</h2>
      </div>

      <label>
        Title
        <input
          required
          value={form.title}
          onChange={(event) => handleChange("title", event.target.value)}
          placeholder="Add export to CSV"
        />
      </label>

      <label>
        Summary
        <textarea
          required
          rows="4"
          value={form.summary}
          onChange={(event) => handleChange("summary", event.target.value)}
          placeholder="Explain the user pain point and business value"
        />
      </label>

      <div className="form-grid">
        <label>
          Category
          <select value={form.category} onChange={(event) => handleChange("category", event.target.value)}>
            <option>UI</option>
            <option>UX</option>
            <option>Enhancement</option>
            <option>Bug</option>
            <option>Feature</option>
          </select>
        </label>

        <label>
          Priority
          <select value={form.priority} onChange={(event) => handleChange("priority", event.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </label>
      </div>

      <label>
        Author
        <input
          required
          value={form.authorName}
          onChange={(event) => handleChange("authorName", event.target.value)}
          placeholder="Your name"
        />
      </label>

      <label>
        Tags
        <input
          value={form.tags}
          onChange={(event) => handleChange("tags", event.target.value)}
          placeholder="analytics, export, reporting"
        />
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Create feedback"}
      </button>
    </form>
  );
};

