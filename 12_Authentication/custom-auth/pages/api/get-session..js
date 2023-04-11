import { parse } from "cookie";
import { decode } from "jsonwebtoken";

/*
    쿠키 내용 분석, 사용자 세션에 관한 최소한의 정보 제공
*/

export default (req, res) => {
    if (req.method !== 'GET') {
        return res.status(404).end();
    }

    // 쿠키 내용 분석
    const { my_auth } = parse(req.headers.cookie || '');

    if (!my_auth) {
        return res.json({ loggedIn: false });
    }

    // 사용자 세션에 관한 최소한의 정보 제공
    return res.json({
        loggedIn: true,
        user: decode(my_auth),
    });
};