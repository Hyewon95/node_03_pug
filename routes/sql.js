const express = require('express');
const router = express.Router();

/* mysql */
const mysql = require('mysql');
const connection = mysql.createConnection({
	host : 'localhost', // 127.0.0.1 가능
	user : '',
	port : 3306,
	password : '',
	database : ''
});

router.get('/create', (req, res, next) => {
	const pug = {
		title : '도서등록',
		scriptFile : ''
	};
	res.render('./book/create.pug', pug)
});

router.post('/save', (req, res, next) => {
	const {title, content, isbn, writer, wdate, price} = req.body;
	const sql = `
		INSERT INTO books SET 
			title = '${title}',
			content = '${content}',
			isbn = '${isbn}',
			writer = '${writer}',
			wdate = '${wdate}',
			price = '${price}'
	`;
	connection.connect(); // 데이터베이스 접근
	connection.query(sql, (err, result, field) => {
		res.json(result); // 쿼리의 결과가 오면, respond 해줌
	});
	connection.end(); // 데이터베이스 접근 해제

});

module.exports = router;