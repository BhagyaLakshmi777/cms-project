import db from "../config/db.js";

export const getAllBlogs = (callback) => {
    db.all("SELECT * FROM blog", [], (err, rows) => {
        callback(err, rows);
    });
};

export const createBlog = (title, description, callback) => {
    db.run(
        "INSERT INTO blog(title,description) VALUES(?,?)",
        [title, description],
        function (err) {
            if (err) return callback(err);

            callback(null, {
                id: this.lastID,
                title,
                description,
            });
        }
    );
};

export const updateBlog = (id, title, description, callback) => {
    db.run(
        "UPDATE blog SET title=?, description=? WHERE id=?",
        [title, description, id],
        function (err) {
            if (err) return callback(err);

            callback(null, {
                id,
                title,
                description,
                changes: this.changes,
            });
        }
    );
};

export const deleteBlog = (id, callback) => {
    db.run(
        "DELETE FROM blog WHERE id=?",
        [id],
        function (err) {
            if (err) return callback(err);

            callback(null, this.changes);
        }
    );
};