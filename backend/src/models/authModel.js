import db from "../config/db.js";

export const loginAdmin=(username,callback)=>{
    db.get(
        "SELECT * FROM admin WHERE username=?",
        [username],
        callback
    );
};