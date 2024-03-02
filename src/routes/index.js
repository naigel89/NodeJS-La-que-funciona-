import { Router } from "express";
import { home, login, regis, curd, insertUsers, showUsers, registerUser, loginUser } from "../controllers/controllers.js";
import { pool } from "../db.js";
 
const router = Router();
 
router.get('/', home);
router.get('/login', login);
router.get('/curd', curd);
router.get('/registro', regis);
router.get('/connect', async (req, res)=> {
    const result = await pool.query('SELECT 1+1 AS RESULT')
    res.json(result[0])
});

router.post('/insertUsers', insertUsers);
router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);

router.get('/showUsers', showUsers);
 
export default router;
