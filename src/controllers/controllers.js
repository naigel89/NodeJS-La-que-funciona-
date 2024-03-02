import { pool } from "../db.js";

export const home = (req, res) => res.render('home', { title: 'Home'});
export const login = (req, res) => res.render('login', { title: 'Login' });
export const regis = (req, res) => res.render('regis', { title: 'Registro' });
export const curd = (req, res) => res.render('curd', { title: 'Curd' })

// En tu controlador showUsers
export const showUsers = async (req, res) => {
    try {
        // Realiza una consulta para obtener los usuarios de la base de datos
        const [rows] = await pool.query('SELECT * FROM users');

        // Verifica si se encontraron usuarios
        if (rows.length === 0) {
            // No se encontraron usuarios, enviar un mensaje
            res.status(404).send('No se encontraron usuarios en la base de datos.');
            return;
        }

        // Renderiza la vista 'curd.ejs' y pasa los datos de los usuarios y el título a la vista
        res.render('curd', { title: 'Usuarios Registrados', users: rows }); // Asegúrate de que "rows" contiene los datos de los usuarios
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).send('Error interno del servidor');
    }
};




export const registerUser = async (req, res) => {
    try {
        // Obtenemos el nuevo nombre de usuario y contraseña del cuerpo de la solicitud
        const { newUsername, newPassword } = req.body;

        // Consulta para verificar si el nombre de usuario ya existe en la base de datos
        const [existingUsers] = await pool.query('SELECT * FROM users WHERE nameuser = ?', [newUsername]);

        // Verificamos si el nombre de usuario ya existe en la base de datos
        if (existingUsers.length > 0) {
            // El nombre de usuario ya existe en la base de datos
            res.status(409).json({ message: 'El nombre de usuario ya existe en la base de datos. Por favor, elige otro.' });
            return;
        }

        // Insertamos el nuevo usuario en la base de datos
        await pool.query('INSERT INTO users (nameuser, password) VALUES (?, ?)', [newUsername, newPassword]);

        // Enviamos una respuesta indicando que el usuario ha sido registrado exitosamente
        res.status(200).json({ username: newUsername });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Define la función del controlador para manejar el inicio de sesión
export const loginUser = async (req, res) => {
    try {
        // Obtenemos el nombre de usuario y la contraseña del cuerpo de la solicitud
        const { username, password } = req.body;

        // Consulta para verificar si el usuario existe en la base de datos y si la contraseña es correcta
        const [rows] = await pool.query('SELECT * FROM users WHERE nameuser = ?', [username]);

        // Verificamos si se encontró el usuario en la base de datos
        if (rows.length === 0) {
            // El usuario no existe en la base de datos
            res.status(404).json({ message: 'El usuario no existe en la base de datos.', register: true });
        } else {
            // El usuario existe en la base de datos
            const user = rows[0];

            // Verificamos si la contraseña es correcta
            if (user.password === password) {
                // Contraseña correcta, enviar mensaje de bienvenida
                res.status(200).json({ message: `¡Bienvenido, ${username}!` });
            } else {
                // Contraseña incorrecta, pedir que escriba de nuevo la contraseña
                res.status(401).json({ message: 'Contraseña incorrecta. Por favor, intenta de nuevo.' });
            }
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


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