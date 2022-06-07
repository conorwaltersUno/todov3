const express = require("express");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");
const { todoRouter, taskRouter } = require("./routers");
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/todo", todoRouter);
app.use("/task", taskRouter);

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
