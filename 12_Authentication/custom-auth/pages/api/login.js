import { serialize } from 'cookie';
import { encode } from '../../lib/jwt';

export default (req, res) => {
    const { method } = req;
    const { email, password } = req.body

    // 요청이 POST가 아닌경우 무시
    if (method !== 'POST') {
        return res.status(404).end();
    }
    // 요청의 body가 이메일과 비밀번호를 가지고 있는가
    if (!email || !password) {
        return res.status(400).json({
            error: 'Missing required params',
        });
    }
    
    const user = authenticateUser(email, password);

    if (user) {
        // my_auth라는 쿠키를 만들고 그 안에 사용자 JWT를 저장. (클라이언트 측에 직접 제공X = 위험성 차단)
        res.setHeader('Set-Cookie',
            serialize('my_auth', user, { path: '/', httpOnly: true})
        );
        return res.json({ success: true });
    } else {
        return res.status(401).json({
            success: false,
            error: 'Wrong email or password',
        });
    }
};

function authenticateUser(email, password) {
    const validEmail = 'johndoe@somecopany.com';
    const validPassword = 'strongpassword';

    if (email === validEmail && password === validPassword) {
        // jwt를 이용한 암호화
        return encode({
            id: 'f678f078-fcfe-43ca-9d20-e8c9a95209b6',
            name: 'John Doe',
            emai: 'johndoe@somecompany.com',
        });
    }

    return null;
}