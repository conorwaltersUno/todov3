INSERT INTO public.Todo (header, description, createdOn)
VALUES ('Daily Flex development tasks', 'Daily flex tasks to complete', '2022-06-07 12:13:00');

INSERT INTO public.Task (description, completed, inProgress)
VALUES ('Task 1', FALSE, TRUE);
INSERT INTO public.Task (description, completed, inProgress)
VALUES ('Task 2', FALSE, FALSE);
INSERT INTO public.Task (description, completed, inProgress)
VALUES ('Task 3', TRUE, FALSE);

INSERT INTO public.TodoTask (todoId, taskId)
VALUES (1, 1);
INSERT INTO public.TodoTask (todoId, taskId)
VALUES (1, 2);
INSERT INTO public.TodoTask (todoId, taskId)
VALUES (1, 3);
