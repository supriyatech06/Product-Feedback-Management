const API_URL = import.meta.env.VITE_API_URL || "/api";

const parseResponse = async (response) => {
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || "Request failed");
  }

  return payload;
};

export const getFeedback = async (filters) => {
  const searchParams = new URLSearchParams(filters);
  const response = await fetch(`${API_URL}/feedback?${searchParams.toString()}`);
  return parseResponse(response);
};

export const getFeedbackSummary = async () => {
  const response = await fetch(`${API_URL}/feedback/summary`);
  return parseResponse(response);
};

export const createFeedback = async (payload) => {
  const response = await fetch(`${API_URL}/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return parseResponse(response);
};

