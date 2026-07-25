import sqlite3 from "sqlite3";
import bcrypt from "bcryptjs";

const db = new sqlite3.Database("./database/cms.db", (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("SQLite Connected Successfully");
    }
});
db.run(`
    CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL
    )
`, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Services table created successfully");
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS about (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL
    )
`, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("About table created successfully");
    }
}); 

db.run(`
CREATE TABLE IF NOT EXISTS blog(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL
)
`, (err)=>{
    if(err){
        console.log(err.message);
    }else{
        console.log("Blog table created successfully");
    }
});


db.run(`
CREATE TABLE IF NOT EXISTS admin(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)
`);



const password = bcrypt.hashSync("admin123",10);

db.get("SELECT * FROM admin WHERE username=?",["admin"],(err,row)=>{
    if(!row){
        db.run(
            "INSERT INTO admin(username,password) VALUES(?,?)",
            ["admin",password]
        );
        console.log("Default admin created");
    }
});
export default db;