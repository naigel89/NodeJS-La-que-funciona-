import { Router } from "express";
import { home, login, regis, insertUsers, showUsers } from "../controllers/controllers.js";
import { pool } from "../db.js";
 
//inicio de enrutador y almaceno en una constante
const router = Router();
 
//rutas
router.get('/', home);
router.get('/login', login);
router.get('/registro', regis);
router.get('/connect', async (req, res)=> {
    const result = await pool.query('SELECT 1+1 AS RESULT')
    res.json(result[0])
});

router.post('/insertUsers', insertUsers)

router.get('/showUsers', showUsers)
 
export default router;