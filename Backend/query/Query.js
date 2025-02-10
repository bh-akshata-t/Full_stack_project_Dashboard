const Queries={
    GET_ALL_RECORDS: `SELECT * FROM records ORDER BY id ASC`,
    UPDATE_RECORD: `
    INSERT INTO records (type,value,count)
            VALUES ($1,$2, 1)
            ON CONFLICT (type,value)
            DO UPDATE SET count=records.count + 1
            RETURNING *`,
    DELETE_RECORD: `
    UPDATE records
            SET count= count - 1 
            WHERE type = $1 AND value = $2 AND count > 0
            RETURNING *`,

   DELETE_ROW:`
   DELETE FROM records
   WHERE type = $1 AND value = $2
   RETURNING *
   `,
};
module.exports=Queries;