import app from "./app";
import 'dotenv/config'
import sequelize from "./database";

const PORT = process.env.PORT || 3000;

sequelize.authenticate().then(() => {
    console.log("Database running");
    app.listen(PORT);
}).catch(err => {
    console.log(err)
})
