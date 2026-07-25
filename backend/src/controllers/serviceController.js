import {getAllServices, createService,  updateService,  deleteService } from "../models/serviceModel.js";

export const getServices = (req, res) =>{
    getAllServices((err, services) =>{
        if (err){
            return res.status(500).json({error: err.message});
        }
        res.status(200).json(services);
    })
} 

export const addService = (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            message: "Title and description are required"
        })
    }

    createService(title, description, (err, service) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.status(201).json({
            message: "Service added successfully",
            data: service
        });
    });
};

export const editService = (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            message: "Title and description are required"
        });
    }

    updateService(id, title, description, (err, service) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (service.changes === 0) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        res.status(200).json({
            message: "Service updated successfully",
            data: service
        });
    });
};
export const removeService = (req, res) => {
    const { id } = req.params;

    deleteService(id, (err, changes) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (changes === 0) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        res.status(200).json({
            message: "Service deleted successfully"
        });
    });
};