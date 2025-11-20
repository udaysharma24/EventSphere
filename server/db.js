import {Pool} from "pg"

const isProduction= process.env.NODE_ENV

const pool= new Pool({
    user: "postgres",
    host: "localhost",
    database: "eventcanvas",
    password: "uday@24022004",
    port: 5432
})

pool.on('error', (err)=>{
    console.log("Unexpected Error on Idle Client", err)
})

async function conn(){
    try{
        await pool.connect()
        console.log("Connected to PostgreSQL")
    }
    catch(err){
        console.log(err)
    }
}

conn()
export default pool