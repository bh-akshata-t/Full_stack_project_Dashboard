const db=require("../models/db");
const Queries=require("../query/Query");

//Service to fetch all records
const getAllRecordsService = async () =>{
    try{
        const result=await db.query(Queries.GET_ALL_RECORDS);
        return result.rows;

    }catch(err){
        throw new Error(err.message);
    }
};

//Service to update thee records
const UpdateRecordsService = async (type,value) =>{
    try{
        const result=await db.query(Queries.UPDATE_RECORD,[type,value]);
        return result.rows[0];

    }catch(err){
        throw new Error(err.message);
    }
};

//Service to delete the records
const DeleteRecordsService = async (type,value) =>{
    try{
        const result=await db.query(Queries.DELETE_RECORD,[type,value]);
        if (result.rowCount === 0){
            throw new Error("Record not found or count is already 0");
        }
        return result.rows[0];
    }catch(err){
        throw new Error(err.message);
    }
};

//service to delete entire row

const deleteEntireRowService=async(type,value)=>{
    try{
        const result=await db.query(Queries.DELETE_ROW,[type,value]);
        if (result.rowCount===0){
            throw new Error("Record Not Found.");
        }
        return result.rows[0];
    } catch(err){
        throw new Error(err.message);
    }
}

module.exports={
    getAllRecordsService,
    UpdateRecordsService,
    DeleteRecordsService,
    deleteEntireRowService,
};