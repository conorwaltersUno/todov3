const { Router } = require("express");
const router = Router();
const {
  getAllTodos,
  postTodo,
  deleteTodo,
  updateTodo,
  getTodoByID,
} = require("../controllers/todo");
const { validator } = require("../middleware/expressValidator");
const { body, param } = require("express-validator");

router.route("/").get(getAllTodos);
router.route("/").post(
  [
    body("header")
      .exists()
      .notEmpty()
      .isString()
      .withMessage("header field cannot be null"),
    body("description")
      .exists()
      .notEmpty()
      .isString()
      .withMessage("description field cannot be null"),
  ],
  (req, res, next) => {
    validator(req, res, next);
  },
  postTodo
);

router.route("/:id").delete(
  [param("id").isNumeric().withMessage("The id must be a numeric value")],
  (req, res, next) => {
    validator(req, res, next);
  },
  deleteTodo
);
router.route("/:id").put(
  [
    param("id")
      .exists()
      .isNumeric()
      .withMessage("Id parameter must be a numeric value"),
    body("header")
      .exists()
      .notEmpty()
      .isString()
      .withMessage("header field cannot be null"),
    body("description")
      .exists()
      .notEmpty()
      .isString()
      .withMessage("description field cannot be null"),
  ],
  (req, res, next) => {
    validator(req, res, next);
  },
  updateTodo
);
router.route("/:id").get(
  [
    param("id")
      .isNumeric()
      .withMessage("Id in parameter must be a numeric value"),
  ],
  (req, res, next) => {
    validator(req, res, next);
  },
  getTodoByID
);

module.exports = router;
