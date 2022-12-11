const express = require('express');
const app = express();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

require('dotenv').config();  //env(환경변수)파일 불러오기

const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT || 3001;
const cors = require('cors');

const homeRouter = require('./routes/home');
const cctvRouter = require('./routes/cctv');
const weatherRouter = require('./routes/weather/weather');
const userRouter = require('./routes/User/user');
const senRouter = require('./routes/Sensor/sensor');
//const testRouter = require('./routes/test/test')

app.use(bodyParser.json());
app.use(cors({
	origin: true,
	methods: ['GET', 'POST', 'OPTIONS'],
	credentials: true,
}));



app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		httpOnly : true,
        sameSite : 'none',
        maxAge : 5300000,
        secure : true,
	},
	store: new MySQLStore({
		host: '127.0.0.1',
		port: 3306,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: 'test'
	})
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', homeRouter);
app.use('/Cctv', cctvRouter);
app.use('/Weather', weatherRouter);
app.use('/User', userRouter);
app.use('/Sensor', senRouter);
//app.use('/Test',testRouter);
app.listen(port, () => {
	console.log(`듣고있어용 ${port}`);
})
