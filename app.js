const express = require('express')
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const app = express()

const dbPath = path.join(__dirname, 'cricketTeam.db')

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

initializeDBAndServer()

app.get('/players/', async (request, response) => {
  const getBooksQuery = `
    SELECT
      *
    FROM
      cricketTeam;
    `
  const booksArray = await db.all(getBooksQuery)
  response.send(booksArray)
})

app.post("/players/", async (request, response) => {
  const bookDetails = request.body;
  const {
    player_id,
  player_name ,
  jersey_number,
  role
  } = bookDetails;
  const addBookQuery = `
    INSERT INTO
      book (player_id,
  player_name ,
  jersey_number,
  role)
    VALUES
      (
        '${PlayerName}',
         ${jerseyNumber},
         ${role},
      );`;

  const dbResponse = await db.run(addBookQuery);
  response.send({`Player Added to Team`);
});
module.exports=app;