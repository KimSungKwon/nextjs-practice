import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function App({ Component, pageProps }) {
  return (
    // 어플리케이션에서 페이지 간 세션이 계속 유지되도록
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
