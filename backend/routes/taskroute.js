const {
  CreateTask,
  GetAllTask,
  DeleteTask,
  UpdateTask,
  UpdateImpTask,
  UpdateCompleteTask,
  GetImpTask,
  GetCompleteTask,
  GetIncompleteTask,
} = require("../controllers/taskcontroller");
const authenticateToken = require("../middleware/auth");
const Task = require("../models/task");
const User = require("../models/user");
const router = require("express").Router();

// Create task
router.post("/create-task", authenticateToken, CreateTask);

//get all tasks
router.get("/get-all-tasks", authenticateToken,GetAllTask );

//get all impotant task
router.get("/get-imp-tasks", authenticateToken, GetImpTask);

//get all complete task
router.get("/get-complete-tasks", authenticateToken, GetCompleteTask);

//get all incomplete task
router.get("/get-incomplete-tasks", authenticateToken,GetIncompleteTask);

//delete tasks
router.delete("/delete-task/:id", authenticateToken,DeleteTask);

//update task
router.put("/update-task/:id", authenticateToken, UpdateTask);

//important mark updation
router.put("/update-imp-task/:id", authenticateToken, UpdateImpTask);

//complete mark updation for task
router.put("/update-complete-task/:id", authenticateToken, UpdateCompleteTask);

module.exports = router;
