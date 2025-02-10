const express = require("express");
const router= express.Router();

const {
    getAllRecords,
    updateRecord,
    DeleteRecord,
    deleteRow,
} = require("../controllers/recordsController");

//get All records
router.get("/",getAllRecords);

//Update count for a record (add or increment)
router.post("/create",updateRecord);

//Decrement count for Reord (delete)
router.delete("/delete",DeleteRecord);

//Delete entire row
router.delete("/delete-row",deleteRow);

module.exports=router;

