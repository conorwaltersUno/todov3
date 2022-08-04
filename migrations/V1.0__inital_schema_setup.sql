CREATE TABLE IF NOT EXISTS public.Todo(
    id          serial
            primary key,
    header      VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    createdOn    TIMESTAMP NOT NULL,
    updatedAt    TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS public.Task(
    id          serial
            primary key,
    description  VARCHAR(255) NOT NULL,
    completed    boolean NOT NULL,
    inProgress   boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS public.TodoTask(
    id          serial  
                primary key,
    todoId      integer REFERENCES public.Todo (id),
    taskId      integer REFERENCES public.Task (id)
);
