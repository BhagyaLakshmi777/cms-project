import db from '../config/db.js'; 

export const getAllServices = (callback) => {
    db.all("SELECT * FROM services",[], (err,rows) =>{
        callback(err,rows);
    });
}
export const createService = (title, description, callback) => {
    const query = `
        INSERT INTO services (title, description)
        VALUES (?, ?)
    `;

    db.run(query, [title, description], function (err) {
        if (err) {
            return callback(err);
        }

        callback(null, {
            id: this.lastID,
            title,
            description
        });
    });
};
export const updateService = (id, title, description, callback) => {
    const query = `
        UPDATE services
        SET title = ?, description = ?
        WHERE id = ?
    `;

    db.run(query, [title, description, id], function (err) {
        if (err) {
            return callback(err);
        }

        callback(null, {
            id,
            title,
            description,
            changes: this.changes
        });
    });
};

export const deleteService = (id, callback) => {
    const query = "DELETE FROM services WHERE id = ?";

    db.run(query, [id], function (err) {
        if (err) {
            return callback(err);
        }

        callback(null, this.changes);
    });
};