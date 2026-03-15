import { Feedback } from "../models/Feedback.js";

const buildFilters = ({ status, category, priority, search }) => {
  const filters = {};

  if (status && status !== "All") {
    filters.status = status;
  }

  if (category && category !== "All") {
    filters.category = category;
  }

  if (priority && priority !== "All") {
    filters.priority = priority;
  }

  if (search) {
    filters.$or = [
      { title: { $regex: search, $options: "i" } },
      { summary: { $regex: search, $options: "i" } },
      { tags: { $elemMatch: { $regex: search, $options: "i" } } }
    ];
  }

  return filters;
};

const buildSort = (sortBy) => {
  switch (sortBy) {
    case "votes":
      return { votes: -1, createdAt: -1 };
    case "oldest":
      return { createdAt: 1 };
    case "latest":
    default:
      return { createdAt: -1 };
  }
};

const priorityOrder = {
  Critical: 0,
  High: 1,
  Medium: 2,
  Low: 3
};

export const getFeedbackList = async (req, res, next) => {
  try {
    const filters = buildFilters(req.query);
    const feedback = await Feedback.find(filters).sort(buildSort(req.query.sortBy));

    if (req.query.sortBy === "priority") {
      feedback.sort((left, right) => {
        return (
          priorityOrder[left.priority] - priorityOrder[right.priority] ||
          new Date(right.createdAt) - new Date(left.createdAt)
        );
      });
    }

    res.json({
      items: feedback,
      total: feedback.length
    });
  } catch (error) {
    next(error);
  }
};

export const getFeedbackSummary = async (_req, res, next) => {
  try {
    const [statusBreakdown, categoryBreakdown] = await Promise.all([
      Feedback.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      Feedback.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ])
    ]);

    res.json({
      statusBreakdown,
      categoryBreakdown
    });
  } catch (error) {
    next(error);
  }
};

export const createFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json(feedback);
  } catch (error) {
    next(error);
  }
};

export const updateFeedbackStatus = async (req, res, next) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    return res.json(feedback);
  } catch (error) {
    next(error);
  }
};

export const addCommentToFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    feedback.comments.push(req.body);
    await feedback.save();

    return res.status(201).json(feedback);
  } catch (error) {
    next(error);
  }
};
