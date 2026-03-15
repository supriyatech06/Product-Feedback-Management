const categories = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];
const statuses = ["All", "Open", "Planned", "In Progress", "Released"];
const priorities = ["All", "Low", "Medium", "High", "Critical"];

export const Filters = ({ filters, onFilterChange }) => {
  return (
    <section className="filters">
      <input
        type="search"
        value={filters.search}
        onChange={(event) => onFilterChange("search", event.target.value)}
        placeholder="Search by title, summary, or tag"
      />

      <select value={filters.category} onChange={(event) => onFilterChange("category", event.target.value)}>
        {categories.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select value={filters.status} onChange={(event) => onFilterChange("status", event.target.value)}>
        {statuses.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select value={filters.priority} onChange={(event) => onFilterChange("priority", event.target.value)}>
        {priorities.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select value={filters.sortBy} onChange={(event) => onFilterChange("sortBy", event.target.value)}>
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
        <option value="votes">Most voted</option>
        <option value="priority">Priority</option>
      </select>
    </section>
  );
};

