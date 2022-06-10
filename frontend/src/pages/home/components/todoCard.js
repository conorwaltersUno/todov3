import { Card, Typography, CardContent } from "@material-ui/core";
import React from "react";

const TodoCard = ({ todo }) => {
  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {todo.header}
          </Typography>
          <Typography variant="body2">{todo.description}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoCard;
