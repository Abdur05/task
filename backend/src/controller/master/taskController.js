'use strict';

const express = require('express');
const taskModel = require('../../models/master/task')


const createTaskDetail = async (req, res, next) => {
    try {
        const taskDetail = await taskModel.findOne({ isActive: true, policyTitle: req.body.policyTitle });
        if (taskDetail) {
            return res.status(400).json({
                status: false,
                message: `Policy Ttle ${req.body.policyTitle} already exists`,
            });
        }

        const taskDataCreated = new taskModel(req.body);
        const result = await taskDataCreated.save();
        if (result) {
            return res.status(200).json({
                status: true,
                message: 'Data Created Successfully',
            });
        } else {
            return res.status(200).json({
                status: false,
                message: 'Data Creation Unsuccessful',
            });
        }
    } catch (error) {
        next(error);
    }
};

const getAlltaskDetail = async (req, res, next) => {
    try {
        const taskDetail = await taskModel.find({ isActive: true }).sort('-1').lean();
        if (taskDetail) {
            return res.status(200).json({
                status: true,
                message: 'Data processed Successfully',
                data: taskDetail,
            });
        } else {
            return res.status(200).json({
                status: false,
                message: 'Data processed Unsuccessfully',
                data: []
            });
        }
    } catch (error) {
        next(error);
    }
};

const singletaskDetail = async (req, res, next) => {
    try {
        const taskDetail = await taskModel.findById({ _id: req.params.id }).lean();
        if (taskDetail) {
            return res.status(200).json({
                status: true,
                message: 'Data Processed Successfully',
                data: taskDetail
            });
        } else {
            return res.status(200).json({
                status: false,
                message: 'Data processed Unsuccessfully'
            });
        }
    } catch (error) {
        next(error);
    }
};

const updatetaskDetail = async (req, res, next) => {
    try {
        const taskdata = await taskModel.findById({ _id: req.params.id }).lean();
        if (!taskdata) {
            return res.status(500).json({
                status: false,
                message: 'Data Data Not Found!',
            });
        }
        const AgentDetail = await taskModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
        if (AgentDetail) {
            return res.status(200).send({
                status: true,
                message: 'Data updated successfully',
            });
        } else {
            return res.status(200).send({
                status: false,
                message: 'Data updated Unsuccessfully'
            });
        }
    } catch (error) {
        next(error);
    }
};

const deletetaskDetail = async (req, res, next) => {
    try {
        // Find the Agent Data first (optional, to check if it exists)
        const taskData = await taskModel.findById(req.params.id);

        if (!taskData) {
            return res.status(404).json({
                status: false,
                message: 'Data Not Found!',
            });
        }

        // Permanently delete the document
        const taskDetail = await taskModel.findByIdAndDelete(req.params.id).exec();

        if (taskDetail) {
            return res.status(200).json({
                status: true,
                message: 'Data Deleted Successfully',
            });
        } else {
            return res.status(500).json({
                status: false,
                message: 'Data Deletion Unsuccessful',
            });
        }
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createTaskDetail,
    getAlltaskDetail,
    singletaskDetail,
    updatetaskDetail,
    deletetaskDetail
};
