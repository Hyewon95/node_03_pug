const express = require('express');
const router = express.Router();
const {pool} = require('../modules/mysql_conn');

router.get('/create', (req, res, next) => {
	const pug = {
		title : '도서등록',
		scriptFile : ''
	};
	res.render('./book/create2.pug', pug)
});

router.post('/save', async (req, res, next) => {
	const {title, content, isbn, writer, wdate, price} = req.body;
	const sql = `INSERT INTO books SET title = ?, content = ?, isbn = ?, writer = ?, wdate = ?, price = ?`;
	const values = [title, content, isbn, writer, wdate, price];

	const connect = await pool.getConnection();
	const result = await connect.query(sql, values);
	if(result[0].serverStatus == 2){
		const sql2 = `SELECT * FROM books ORDER bY id DESC`;
		const result2 = await connect.query(sql2);
		res.json(result2[0]);
	}
	else{
		res.json({err : '데이터 저장에 실패하였습니다.'});
	}
	connect.release;
});

// list로 요청이 들어오면 pool로부터 connection 객체를 받아와서 connect 변수에 저장할 때까지 await한다
router.get('/list', async (req, res, next) => {
	const connect = await pool.getConnection(); // pool의 접속객체 10개 중 하나를 빌려온다
	const result = await connect.query('SELECT * FROM books ORDER BY id DESC');
	connect.release; // 빌려온 접속객체를 다시 되돌려준다
	res.json(result);
});

module.exports = router;