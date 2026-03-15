import { useEffect, useState } from "react";
import { createFeedback, getFeedback, getFeedbackSummary } from "./api/feedbackApi";
import { FeedbackForm } from "./components/FeedbackForm";
import { FeedbackList } from "./components/FeedbackList";
import { Filters } from "./components/Filters";
import { Header } from "./components/Header";
import { SummaryCards } from "./components/SummaryCards";

const defaultFilters = {
  search: "",
  category: "All",
  status: "All",
  priority: "All",
  sortBy: "latest"
};

function App() {
  const [filters, setFilters] = useState(defaultFilters);
  const [feedback, setFeedback] = useState([]);
  const [summary, setSummary] = useState({ statusBreakdown: [], categoryBreakdown: [] });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadData = async (activeFilters = filters) => {
    try {
      setLoading(true);
      setError("");
      const [feedbackPayload, summaryPayload] = await Promise.all([
        getFeedback(activeFilters),
        getFeedbackSummary()
      ]);

      setFeedback(feedbackPayload.items);
      setSummary(summaryPayload);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(filters);
  }, [filters]);

  const handleFilterChange = (field, value) => {
    setFilters((current) => ({
      ...current,
      [field]: value
    }));
  };

  const handleCreateFeedback = async (payload) => {
    try {
      setIsSubmitting(true);
      await createFeedback(payload);
      await loadData(filters);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-shell">
      <Header />
      <SummaryCards summary={summary} />

      <main className="main-grid">
        <section className="content-panel">
          <div className="section-heading">
            <span>Feedback board</span>
            <h2>Track signals across product areas</h2>
          </div>

          <Filters filters={filters} onFilterChange={handleFilterChange} />

          {error ? <p className="state-message state-message--error">{error}</p> : null}
          {loading ? <p className="state-message">Loading feedback...</p> : <FeedbackList items={feedback} />}
        </section>

        <aside className="sidebar">
          <FeedbackForm onSubmit={handleCreateFeedback} isSubmitting={isSubmitting} />
        </aside>
      </main>
    </div>
  );
}

export default App;
