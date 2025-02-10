const {
    getAllRecordsService,
    UpdateRecordsService,
    DeleteRecordsService,
    deleteEntireRowService
}= require("../service/service");

//Get all records
const getAllRecords=async(req,res)=>{
    try{
        const records=await getAllRecordsService();
        res.status(200).json(records);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

//Update count for a record
const updateRecord=async(req,res)=>{
    const {type,value}=req.body;
    try{
        const updateRecord=await UpdateRecordsService(type,value);
        res.status(200).json(updateRecord);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};


//Delete count for a record
const DeleteRecord=async(req,res)=>{
    const {type,value}=req.body;
    try{
        const updateRecord=await DeleteRecordsService(type,value);
        res.status(200).json(updateRecord);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

const deleteRow=async (req,res)=>{
    const{type,value}=req.body;
    try{
        const deleteRecord=await deleteEntireRowService(type,value);
        res.status(200).json(deleteRecord);
    }catch(err){
        res.status(404).json({error: err.message});
    }
};

module.exports={getAllRecords,updateRecord,DeleteRecord,deleteRow};