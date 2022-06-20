const server = require("./src/app.js");
const { conn } = require("./src/db");

// sincronizando todos los modelos al iniciar servidor
// {force: true}
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at 3001");
  });
});
