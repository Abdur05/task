'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    policyTitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdOn: {
        type: String
    },
    changedOn: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isEditTitle:{
        type:Boolean,
        default:false
    },
    isEditDescription:{
        type:Boolean,
        default:false
    }

})

const taskMasterSchema = mongoose.model('sttm_daily_task', TaskSchema)
module.exports = taskMasterSchema