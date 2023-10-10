
//create read update/patch delete
const { client } = require("./config");
const SQL = require('sql-template-strings')

const createTodo = async (req, res, next) => {
    console.log(req.query.title);
    const body = req.query.body;
    const title = req.query.title;
    // const { text, id, completed } = req.body;
    const query = SQL`INSERT INTO todo (title, body, created_on, completed) VALUES(${title}, ${body}, CURRENT_TIMESTAMP, FALSE);`;
    try {
        const data = await client.query(query);

        return res.status(201).json({
            status: 201,
            message: "ToDo added successfuly",
            data: data.news
        });
    } catch (error) {
        return next(error);
    }
};

const getTodos = async (req, res, next) => {

    if(req.query.id) return getTodoById(req, res, next);

    try {
        const data = await client.query(
            "SELECT * FROM todo ORDER BY created_on DESC;"
        );

        if (data.rowCount == 0) return res.status(404).send("No Todo exists");

        return res.status(200).json({
            status: 200,
            message: "All Todos:",
            data: data.rows
        });
    } catch (error) {
        return next(error);
    }
};


const getTodoById = async (req, res, next) => {
    const id = req.query.id;
    const query = SQL`SELECT * FROM todo WHERE id = ${id}`


    try {
        const data = await client.query(query);

        if (data.rowCount == 0) return res.status(404).send("No article exists");

        return res.status(200).json({
            status: 200,
            message: "Todo",
            data: data.rows
        })

    } catch (error) {
        return next(error);
    }
};

const upsertTodos = async (req, res, next) => {
  
    const { id, title, body, completed,} = req.query;
    console.log(id, title, body, completed);

    const query = SQL`INSERT INTO todo (id, title, body, completed) VALUES (${id}, ${title}, ${body}, ${completed}) ON CONFLICT (id) DO UPDATE 
    SET title = EXCLUDED.title, body = EXCLUDED.body, completed = EXCLUDED.completed;`

    try {
        const data = await client.query(query);

        if(data.rowCount == 0) return res.status(
            404).send("Todo does not exist");

            return res.status(200).json({
                status:200,
                message: "Todo updated successfully",
                data: data.rows 
             });
    }   catch(error) {
        return next(error);
    }
};

    const deleteTodo = async (req, res, next) => {
        const id = req.query.id;
        const query = SQL`DELETE FROM todo WHERE id = ${id};`;

        try {
            const data = await client.query(query);

            if (data.rowCount == 0) return res.status(404).send("todo does not exist");

            return res.status(200).json({
                status:200,
                message: "Todo deleted succesfully",
            })
        }   catch (error) {
            return next(error);
        }
    }


module.exports = {
    createTodo,
    getTodoById,
    getTodos,
    upsertTodos,
    deleteTodo,
};