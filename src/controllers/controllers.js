import { pool } from "../db.js";

export const home = (req, res) => res.render('home', { title: 'Home'});
export const login = (req, res) => res.render('login', { title: 'Login' });
export const regis = (req, res) => res.render('regis', { title: 'Registro' })

export const showUsers = async(req, res)=>{
    const [rows] = await pool.query('SELECT * FROM USERS')
    res.json(rows)
}

export const insertUsers = async(req, res)=>{
    const {nameuser, password} = req.body;
    const [rows] = await pool.query('INSERT INTO users (nameuser, password) VALUES (?, ?)', [nameuser, password])
    res.send('ok')
}

export const deleteUsers = async(req, res)=>{
    const {nameuser} = req.body;
    const [rows] = await pool.query('DELETE FROM users WHERE nameuser=nameuser VALUES (?)', [nameuser])
    res.send('ok')
}