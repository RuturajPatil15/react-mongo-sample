const express = require("express");
const Router = express.Router();
const Adddata = require("../Models/Adddata");
const { body, validationResult } = require("express-validator");

//Create Data
Router.post('/createdata', [
    body("title").isLength({min: 1}),
    body("body").isLength({min: 1}),
    body("image").isLength({min: 5}),

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    try {
        console.log(req.body);
        const newData = new Adddata(req.body);
        const saveData = newData.save();

        res.json({
            success: true,
            message: "Data added successfully",
            data: saveData,

        })
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})

// Read Data
Router.get('/ListAllData', async (req, res) => {
    const displayData = await Adddata.find({});
    res.json({
        success: true,
        message: "Data Display successfully",
        data: displayData,
    })
})


//Update Data
Router.put('/updateData', async (req, res) => {
    console.log(req.body);
    const { _id, ...rest } = req.body;
    console.log(rest)

    // const updateData = await Adddata.updateOne({_id: req.body}, {title: "Ruturaj Patil"})
    const updateData = await Adddata.updateOne({ _id: _id }, rest)
    res.json({
        success: true,
        message: "Data Update successfully",
        data: updateData,
    })
})

//Delete Data
Router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)

    const deleteData = await Adddata.deleteOne({ _id: id })
    res.json({
        success: true,
        message: "Data Deleted successfully",
        data: deleteData,
    })
})


module.exports = Router;