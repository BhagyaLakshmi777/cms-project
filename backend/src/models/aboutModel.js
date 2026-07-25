import db from "../config/db.js";

// Get all about records
export const getAllAbout = (callback) => {
    db.all("SELECT * FROM about", [], (err, rows) => {
        callback(err, rows);
    });
};

// Create about
export const createAbout = (title, description, callback) => {
    const query = `
        INSERT INTO about (title, description)
        VALUES (?, ?)
    `;

    db.run(query, [title, description], function (err) {
        if (err) {
            return callback(err);
        }

        callback(null, {
            id: this.lastID,
            title,
            description,
        });
    });
};

// Update about
export const updateAbout = (id, title, description, callback) => {
    const query = `
        UPDATE about
        SET title=?, description=?
        WHERE id=?
    `;

    db.run(query, [title, description, id], function (err) {
        if (err) {
            return callback(err);
        }

        callback(null, {
            id,
            title,
            description,
            changes: this.changes,
        });
    });
};

// Delete about
export const deleteAbout = (id, callback) => {
    db.run("DELETE FROM about WHERE id=?", [id], function (err) {
        if (err) {
            return callback(err);
        }

        callback(null, this.changes);
    });
};