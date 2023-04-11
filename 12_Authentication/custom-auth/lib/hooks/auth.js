import { useState, useEffect } from "react";

export function useAuth() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 로딩 시작
        setLoading(true);
        // /api/get-session에 요청
        fetch('/api/get-session')
            // 성공하면 data.user 정보 얻어옴
            .then((res) => res.json())
            .then((data) => {
                if (data.loggedIn) {
                    setLoggedIn(true);
                    setUser(data.user);
                }
            })
            // 실패하면 에러값 리턴
            .catch((err) => setError(err))
            // 로딩 끝. UI 리렌더링
            .finally(() => setLoading(false));
    }, [])

    return {
        user,
        loggedIn,
        loading,
        error,
    };
}