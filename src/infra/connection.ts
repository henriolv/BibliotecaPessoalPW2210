import { Pool } from "pg";

export const connection = new Pool ({
    host:'localhost',
    user:'postgres',
    password:'1234',
    database:'biblioteca-bd',
});