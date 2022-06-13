import React from "react";

const TaskDisplay = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task, index) => {
        return (
          <div key={index}>
            <div className="task-single-container">
              {task.task.id}.{task.task.description}
              {task.task.completed ? (
                <div>Completed</div>
              ) : (
                <div>Not completed</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskDisplay;
