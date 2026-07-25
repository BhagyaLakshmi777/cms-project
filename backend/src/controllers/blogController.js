import {
    getAllBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
} from "../models/blogModel.js";

export const getBlogs = (req, res) => {
    getAllBlogs((err, blogs) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json(blogs);
    });
};

export const addBlog = (req, res) => {
    const { title, description } = req.body;

    createBlog(title, description, (err, blog) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({
            message: "Blog created successfully",
            data: blog,
        });
    });
};

export const editBlog = (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    updateBlog(id, title, description, (err, blog) => {
        if (err) return res.status(500).json({ error: err.message });

        if (blog.changes === 0)
            return res.status(404).json({
                message: "Blog not found",
            });

        res.status(200).json({
            message: "Blog updated successfully",
            data: blog,
        });
    });
};

export const removeBlog = (req, res) => {
    const { id } = req.params;

    deleteBlog(id, (err, changes) => {
        if (err) return res.status(500).json({ error: err.message });

        if (changes === 0)
            return res.status(404).json({
                message: "Blog not found",
            });

        res.status(200).json({
            message: "Blog deleted successfully",
        });
    });
};