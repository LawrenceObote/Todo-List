
//create read update/patch delete
const { client } = require("./config");
const SQL = require('sql-template-strings')

const createTodo = async (req, res, next) => {
    console.log(req.query.title);
    const title = req.query.title;

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
    const id = parseInt(req.params.id);
    const { title, todo } = req.body;

    const query = "UPSERT todo SET text=$1, todo=$2 WHERE id=$3 RETURNING *;"
    const value = [text, todo, id];

    try {
        const data = await client.query(query, value);

        if(data.rowCount == 0) return res.status(
            404).send("Todo does not exist");

            return res.status(200).json({
                status:200,
                message: "Todo updated successfully",
                data: data.rows 
             });
    }   catch(error) {
        return nexr(error);
    }
};

    const deleteTodo = async (req, res, next) => {
        const id = parseInt(req.params.id);
        const value = [id];
        const query = "DELETE FROM todo WHERE id=&1;";

        try {
            const data = await client.query(query, value);

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