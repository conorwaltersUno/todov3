import React from "react";

const TaskDisplay = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => {
        return (
          <div>
            <div className="task-single-container">
              {task.task.id}.{task.task.description}
              {task.task.completed ? (
                <div>Completed</div>
              ) : (
                <dv>Not completed</dv>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskDisplay;
