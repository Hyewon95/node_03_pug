const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next) => {
	const pug = {
		title : '로그인 페이지',
		scriptFile : '../f_member.js'
	}
	res.render('./member/login.pug', pug);
});

router.get('/join', (req, res, next) => {
	const pug = {
		title : '회원가입 페이지',
		scriptFile : '../f_join.js'
	}
	res.render('./member/join.pug', pug);
});

module.exports = router;