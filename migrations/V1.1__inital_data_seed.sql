INSERT INTO public.Todo (header, description, createdOn)
VALUES ('Daily Flex development tasks', 'Daily flex tasks to complete', '2022-06-07 12:13:00');

INSERT INTO public.Task (description, completed)
VALUES ('Complete redmine time log', FALSE);

INSERT INTO public.TodoTask (todoId, taskId)
VALUES (1, 1);
