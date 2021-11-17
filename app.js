const express = require("express");
const Agenda = require("agenda");

const dbUrl = "mongodb://localhost/Agenda_db";

// const agenda = new Agenda({
//     db:{address: dbUrl},
//     useUnifiedTopology: true
// });

const agenda = new Agenda({
    db: {address: dbUrl, collection: 'Agenda'},
    processEvery: '20 seconds',
    useUnifiedTopology: true
});

agenda.define("log Hello world", async(job) =>{
    const {name} = job.attrs;
    console.log(`Hello ${name}`);
})

// (async function() {
//     await agenda.start(); // Start Agenda instance
//     await agenda.every("3 minutes", "log Hello world");
//     // await agenda.schedule('in 2 minutes', 'log Hello world', {name: 'Yhomi'}); // Run the dummy job in 10 minutes and passing data.
// })();
agenda.define("delete old users", async (job) => {
    console.log("Test agenda log");
  });
  
  (async function () {
    // IIFE to give access to async/await
    await agenda.start();
  
    await agenda.every("3 minutes", "delete old users");
  
    // Alternatively, you could also do:
    await agenda.every("*/3 * * * *", "log Hello world");
  })();

const app = express();

const PORT = process.env.PORT || 3002
app.listen(PORT, ()=> console.log(`Server Started on ${PORT}`))