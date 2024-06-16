const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();
const tasksController = require("../controllers/tasks");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", tasksController.getAllTasks);

router.get(
  "/:id",
  ensureAuth,
  [param("id").isMongoId().withMessage("Invalid task ID")],
  tasksController.getTaskById
);

router.post(
  "/",
  ensureAuth,
  [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isString()
      .withMessage("Title must be a string"),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string"),
    body("status")
      .notEmpty()
      .withMessage("Status is required")
      .isIn(["pending", "in-progress", "completed"])
      .withMessage(
        'Status must be one of "pending", "in-progress", or "completed"'
      ),
  ],
  tasksController.createTask
);

router.put(
  "/:id",
  ensureAuth,
  [
    param("id").isMongoId().withMessage("Invalid task ID"),
    body("title").optional().isString().withMessage("Title must be a string"),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string"),
    body("status")
      .optional()
      .isIn(["pending", "in-progress", "completed"])
      .withMessage(
        'Status must be one of "pending", "in-progress", or "completed"'
      ),
  ],
  tasksController.updateTask
);

router.delete(
  "/:id",
  ensureAuth,
  [param("id").isMongoId().withMessage("Invalid task ID")],
  tasksController.deleteTask
);

module.exports = router;
