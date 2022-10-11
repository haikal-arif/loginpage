const { json } = require('express');
const mariadb = require( 'mariadb' )

const path = require( 'path' );
const app = require('express')();
const pool = mariadb.createPool({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: '',
	database: 'pendaftar',
	connectionLimit: 5
})

const port = process.env.port || 8080;
const url = process.env.url || `http://localhost`

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/index.html'));
})

app.get('/login.html', (req, res) => {
	res.sendFile(path.join(__dirname, '../pages/login.html'));
})

app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, '../pages/login.html'));
})

app.get('/userlogin', (req, res) => {
	const userInput = req.query;
	console.log(userInput.username);
	res.send("Login Successful");
})

app.get('/register', (req, res) => {
	res.sendFile(path.join(__dirname, '../pages/register.html'));
})

app.get('/userregister', (req, res) => {
	const userInput = req.query;
	const status = registerUser(userInput.username, userInput.password);
	

	res.send('Register Successful')
})

app.listen(port, () =>{
	console.log(`app listening to ${url}:${port}`);
})

async function registerUser(username, password){
	try {
		conn = await pool.getConnection();
		const id = await conn.query('SELECT COUNT(*) FROM USER');
		const res = await conn.query(`INSERT INTO USER(USERNAME, PASSWORD) VALUES('${username}', '${password}')`)
		if (res.constructor.name === 'OkPacket'){
			console.log("Ok")
		}
		return 'success';	

	} catch (error) {
		return 'failed to register';
	}
	
}
