import {
    getAllAbout,
    createAbout,
    updateAbout,
    deleteAbout,
} from "../models/aboutModel.js";

// GET
export const getAbout = (req, res) => {
    getAllAbout((err, about) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json(about);
    });
};

// POST
export const addAbout = (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            message: "Title and description are required",
        });
    }

    createAbout(title, description, (err, about) => {
        if (err) {
            return res.status(500).json({
                error: err.message,
            });
        }

        res.status(201).json({
            message: "About created successfully",
            data: about,
        });
    });
};

// PUT
export const editAbout = (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    updateAbout(id, title, description, (err, about) => {
        if (err) {
            return res.status(500).json({
                error: err.message,
            });
        }

        if (about.changes === 0) {
            return res.status(404).json({
                message: "About not found",
            });
        }

        res.status(200).json({
            message: "About updated successfully",
            data: about,
        });
    });
};

// DELETE
export const removeAbout = (req, res) => {
    const { id } = req.params;

    deleteAbout(id, (err, changes) => {
        if (err) {
            return res.status(500).json({
                error: err.message,
            });
        }

        if (changes === 0) {
            return res.status(404).json({
                message: "About not found",
            });
        }

        res.status(200).json({
            message: "About deleted successfully",
        });
    });
};