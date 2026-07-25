import db from "../config/db.js";

export const getAllContacts = (callback) => {
    db.all("SELECT * FROM contact", [], (err, rows) => {
        callback(err, rows);
    });
};

export const createContact = (name, email, phone, message, callback) => {
    db.run(
        "INSERT INTO contact(name, email, phone, message) VALUES(?,?,?,?)",
        [name, email, phone, message],
        function (err) {
            if (err) return callback(err);

            callback(null, {
                id: this.lastID,
                name,
                email,
                phone,
                message,
            });
        }
    );
};

export const updateContact = (
    id,
    name,
    email,
    phone,
    message,
    callback
) => {
    db.run(
        "UPDATE contact SET name=?, email=?, phone=?, message=? WHERE id=?",
        [name, email, phone, message, id],
        function (err) {
            if (err) return callback(err);

            callback(null, {
                id,
                name,
                email,
                phone,
                message,
                changes: this.changes,
            });
        }
    );
};

export const deleteContact = (id, callback) => {
    db.run(
        "DELETE FROM contact WHERE id=?",
        [id],
        function (err) {
            if (err) return callback(err);

            callback(null, this.changes);
        }
    );
};