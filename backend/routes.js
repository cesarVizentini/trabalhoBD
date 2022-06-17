const express = require("express");
const database = require('./db');

const router = express.Router();
const { QueryTypes } = require('sequelize');

async function saveLog (query) {
    const log = await database.query(
        "INSERT into Logs (requisicao) VALUES (\"" + query + "\")",
        {
            type: QueryTypes.INSERT
        }
    );
};

// C
router.post("/todos", async (request, response) => {
    const { nome } = request.body;
    const sql = await database.query(
        "INSERT into Todos (nome) VALUES ('" + nome + "')", 
        {
            type: QueryTypes.INSERT,
            logging: (sql) => {
                saveLog(sql)
            }
        }
    );

    return response.status(201).json(sql);
});

// R
router.get("/todos", async (resquest, response) => {
    const sql = await database.query(
        "SELECT * FROM Todos", 
        {
            type: QueryTypes.SELECT,
            logging: (sql) => {
                saveLog(sql)
            }
        }
    );

    return response.status(200).json(sql);
});

// U
router.put("/todos", async (request, response) => {
    const {nome, id, status} = request.body;

    var sql = null;
    const intID = parseInt(id);

    if (!id) {
        return response.status(400).json("Id is mandatory!");
    }

    if (nome == undefined) {
        const sqlExiste = await database.query(
            "SELECT * FROM Todos WHERE id = '" + intID + "'", 
            {
                type: QueryTypes.SELECT,
                logging: (sql) => {
                    saveLog(sql)
                }
            }
        );
    
        // ARRUMAR VALIDAÇÃO
        if (!sqlExiste) {
            return response.status(404).json("Todo don't exist");
        };
    
        sql = await database.query(
            "UPDATE Todos SET " +
            // "nome = '" + nome + "'," +
            "status = '" + (status ? 1 : 0) + 
            "' WHERE id = '" + intID + "'", 
            {
                type: QueryTypes.UPDATE,
                logging: (sql) => {
                    saveLog(sql)
                }
            }
        );
    } else {
        sql = await database.query(
            "UPDATE Todos SET " +
            "nome = '" + nome +
            "' WHERE id = '" + intID + "'", 
            {
                type: QueryTypes.UPDATE,
                logging: (sql) => {
                    saveLog(sql)
                }
            }
        );
    };

    return response.status(200).json(sql);
});

// D
router.delete("/todos/:id", async (request, response) => {
    const { id } = request.params;

    const intID = parseInt(id);

    if (!intID) {
        return response.status(400).json("Id is mandatory!");
    }

    const sqlExiste = await database.query(
        "SELECT * FROM Todos WHERE id = '" + intID + "'", 
        {
            type: QueryTypes.SELECT
        }
    );

    if (!sqlExiste) {
        return response.status(404).json("Todo don't exist");
    };

    const sql = await database.query(
        "DELETE FROM Todos WHERE id = '" + intID + "'", 
        {
            type: QueryTypes.DELETE,
            logging: (sql) => {
                saveLog(sql)
            }
        }
    );

    return response.status(200).send();
})

// Call Stored Procedure
router.get("/logs", async (resquest, response) => {
    const sql = await database.query(
        "CALL show_logs();", 
        {
            raw: true
        }
    );

    return response.status(200).json(sql);
});

module.exports = router;