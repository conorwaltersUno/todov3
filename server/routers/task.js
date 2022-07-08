const { Router } = require("express");
const router = Router();
const { postTask, deleteTask, updateTask } = require("../controllers/task");
const { validator } = require("../middleware/expressValidator");
const { body, param } = require("express-validator");

router.route("/:id").post(
  [
    param("id")
      .exists()
      .isNumeric()
      .withMessage("Id parameter must be a numeric value"),
    body("description")
      .exists()
      .notEmpty()
      .isString()
      .withMessage("description field cannot be null"),
    body("completed")
      .exists()
      .notEmpty()
      .withMessage("completed field cannot be null"),
    body("inprogress")
      .exists()
      .notEmpty()
      .withMessage("inprogress field cannot be null"),
  ],
  (req, res, next) => {
    validator(req, res, next);
  },
  postTask
);

router.route("/:id").delete(
  [param("id").isNumeric().withMessage("The id must be a numeric value")],
  (req, res, next) => {
    validator(req, res, next);
  },
  deleteTask
);
router.route("/:id").put(
  [
    param("id")
      .exists()
      .isNumeric()
      .withMessage("Id parameter must be a numeric value"),
    body("description")
      .exists()
      .notEmpty()
      .isString()
      .withMessage("description field cannot be null"),
    body("completed")
      .exists()
      .notEmpty()
      .withMessage("completed field cannot be null"),
    body("inprogress")
      .exists()
      .notEmpty()
      .withMessage("inprogress field cannot be null"),
  ],
  (req, res, next) => {
    validator(req, res, next);
  },
  updateTask
);

module.exports = router;
