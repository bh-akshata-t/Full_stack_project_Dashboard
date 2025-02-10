const express= require("express");
const bodyParser= require("body-parser");
const cors=require("cors");

const app=express();
const recordsRoutes=require("./routes/records");

app.use(cors());
app.use(bodyParser.json());

//Routes

app.use("/api/records",recordsRoutes);

const PORT=8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));