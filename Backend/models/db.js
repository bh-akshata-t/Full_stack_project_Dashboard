const { text } = require("body-parser");
const { query } = require("express");
const {Pool}= require("pg");
// const { param } = require("../routes/records");

const pool=new Pool({
    user: "postgres",
    host: "localhost",
    database: "test2",
    password: "",
    port: 5432,
});

module.exports= {
    query: (text, params)=> pool.query(text,params), 
};