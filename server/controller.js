const { client } = require("./config");
const SQL = require('sql-template-strings')

const createTodo = async (req, res, next) => {
    const title = req.body.title;

    const query = SQL`insert into todo (title, created_on, completed) values(${title}, current_timestamp, false);`;
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
    const id = parseInt(req.params.id);
    const query = "SELECT * FROM todo WHERE id=$1";
    const value = [id];

    try {
        const data = await client.query;

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
    console.log("here's req", req)
    const { title, id } = req.body;

    const query = SQL`INSERT INTO todo (id, title)
    VALUES (${id}, ${title})
    ON CONFLICT (id)
    DO UPDATE SET title = EXCLUDED.title;`;

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

        const query = SQL`DELETE FROM todo WHERE ID = ${id};`;
        try {
            const data = await client.query(query);
            // if (data.rowCount == 0) return res.status(404).send("todo does not exist");

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