const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

const getEntriesByEmail = async (email) => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`
                SELECT e.title,e.content,e.date,e.category,a.name,a.surname,a.image
                FROM entries AS e
                INNER JOIN authors AS a
                ON e.id_author=a.id_author
                WHERE a.email=$1
                ORDER BY e.date;`,[email])
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}

const getAllEntries = async () => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`SELECT * FROM entries;`)
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}
// entry --> {"noticia 1","va a nevar", "fernando.alfaro@thebridgeshool.es", "sucesos"}
const createEntry = async (entry) => {
    const {title,content,email,category} = entry;
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`INSERT INTO entries(title,content,id_author,category) 
                                    VALUES ($1,$2,
                                    (SELECT id_author FROM authors WHERE email=$3),$4)`
                                    ,[title,content,email,category])
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}

const entries = {
    getEntriesByEmail,
    getAllEntries,
    createEntry
    //deteleEntry
    //updateEntry
}

module.exports = entries;


// Pruebas
/*
    getEntriesByEmail("alejandro@thebridgeschool.es")
    .then(data=>console.log(data))
*/
/*
getAllEntries()
.then(data=>console.log(data))
*/

// entry --> {"noticia 1","va a nevar","sucesos"}
// let newEntry = {title:"noticia desde Node",content:"va a triunfar esto", email: "alejandro@thebridgeschool.es",category:"sucesos"}

// createEntry(newEntry)
// .then(data=>console.log(data))