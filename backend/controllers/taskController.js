const Task = require("../models/task");
const User = require("../models/user");

exports.CreateTask = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { id } = req.headers;

    if (!title || !desc) {
      return res
        .status(400)
        .json({ message: "Title, description are required." });
    }

    const newTask = await Task.create({ title, desc });
    console.log(newTask);

    console.log(User);
    await User.findByIdAndUpdate(id, { $push: { tasks: newTask._id } });

    res.status(201).json({ message: "New task created successfully!" });
  } catch (err) {
    console.error("Error in creating task:", err);
    res
      .status(500)
      .json({ message: "Error during creating task", error: err.message });
  }
};

exports.GetAllTask = async (req, res) => {
  try {
    const { id } = req.headers;
    console.log("id is  :", id);
    const userData = await User.findById(id).populate({
      path: "tasks",
      options: { sort: { createdAt: -1 } },
    });

    res.status(201).json({ message: "task fetching done!", data: userData });
  } catch (err) {
    console.error("Error in fetching task:", err);
    res
      .status(500)
      .json({ message: "Error during fetching task", error: err.message });
  }
};

exports.DeleteTask = async (req, res) => {
  try {
    const { id } = req.params; //task id which deleteing

    if (!id) {
      return res
        .status(400)
        .json({ message: "not proovided any delted task id" });
    }
    console.log("id is  :", id);
    const userId = req.headers.id;
    await Task.findByIdAndDelete(id); //delete that task form task model
    await User.findByIdAndUpdate(userId, { $pull: { tasks: id } }); //pull/delete that task form user model also

    res.status(201).json({ message: "task is deleted " });
  } catch (err) {
    console.error("Error in fetching task:", err);
    res
      .status(500)
      .json({ message: "Error during fetching task", error: err.message });
  }
};

exports.UpdateTask = async (req, res) => {
  try {
    const { id } = req.params; //task id which deleteing
    const { title, desc } = req.body;
    console.log("update id is  :", id);

    //   await Task.findByIdAndDelete(id);//delete that task form task model
    await Task.findByIdAndUpdate(id, { title: title, desc: desc }); //pull/delete that task form user model also

    res.status(201).json({ message: "task is updated " });
  } catch (err) {
    console.error("Error in task updation:", err);
    res
      .status(500)
      .json({ message: "Error during task updation : ", error: err.message });
  }
};

exports.UpdateImpTask = async (req, res) => {
  try {
    const { id } = req.params; //task id which deleteing
    const TaskData = await Task.findById(id);
    await Task.findByIdAndUpdate(id, { important: !TaskData.important });
    res.status(201).json({ message: "task Imporatnt is updated " });
  } catch (err) {
    console.error("Error in task updation:", err);
    res
      .status(500)
      .json({ message: "Error during task updation : ", error: err.message });
  }
};

exports.UpdateCompleteTask = async (req, res) => {
  try {
    const { id } = req.params; //task id which deleteing
    const TaskData = await Task.findById(id);
    await Task.findByIdAndUpdate(id, { complete: !TaskData.complete });
    res.status(201).json({ message: "task compelete/incomplete is updated " });
  } catch (err) {
    console.error("Error in task updation:", err);
    res
      .status(500)
      .json({ message: "Error during task updation : ", error: err.message });
  }
};

exports.GetImpTask = async (req, res) => {
  try {
    const { id } = req.headers;
    // console.log("id is  :", id);
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { important: true },
      options: { sort: { createdAt: -1 } },
    });
    // console.log("pura : ",Data);

    const impTaskData = Data.tasks; //provide only tasks data form User model
    // console.log("imp : ",impTaskData);

    res
      .status(201)
      .json({ message: "Immportant task fetching done!", data: impTaskData });
  } catch (err) {
    console.error("Error in fetching task:", err);
    res.status(500).json({
      message: "Error during fetching important task",
      error: err.message,
    });
  }
};

exports.GetCompleteTask = async (req, res) => {
  try {
    const { id } = req.headers;
    // console.log("id is  :", id);
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { complete: true },
      options: { sort: { createdAt: -1 } },
    });
    // console.log("sara : ",Data);

    const completeTaskData = Data.tasks; //provide only tasks data form User model
    console.log("complete : ", completeTaskData);

    res
      .status(201)
      .json({ message: "task fetching done!", data: completeTaskData });
  } catch (err) {
    console.error("Error in fetching task:", err);
    res.status(500).json({
      message: "Error during fetching complete task",
      error: err.message,
    });
  }
};

exports.GetIncompleteTask = async (req, res) => {
  try {
    const { id } = req.headers;
    // console.log("id is  :", id);
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { complete: false },
      options: { sort: { createdAt: -1 } },
    });
    // console.log("sara : ",Data);

    const incompleteTaskData = Data.tasks; //provide only tasks data form User model
    console.log("complete : ", incompleteTaskData);

    res
      .status(201)
      .json({ message: "task fetching done!", data: incompleteTaskData });
  } catch (err) {
    console.error("Error in fetching task:", err);
    res.status(500).json({
      message: "Error during fetching complete task",
      error: err.message,
    });
  }
};
