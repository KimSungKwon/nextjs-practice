import { ThemeProvider } from 'next-themes';
import TopBar from '../components/TopBar'
import 'tailwindcss/tailwind.css';

export default function App({ Component, pageProps }) {
  return (
    // attribute="class" 를 지정해서 메인 <html>태그에 "dark" CSS 클래스를 적용
    // 다크모드는 dark:bg-gray-900, 밝은모드는 bg-gray-50, <div>의 width 값을 100%, 
    // 최소 높이 값을 전체 화면의 높이 값으로 (min-height: 100vh)
    <ThemeProvider attribute="class">
      <div className="dark:bg-gray-900 bg-gray-50 w-full min-h-screen">
        <TopBar />
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  )
}
