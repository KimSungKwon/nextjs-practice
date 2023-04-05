
import 'tailwindcss/tailwind.css';

export default function App({ Component, pageProps }) {
  return (
      <div className="bg-gray-50 w-full min-hscreen">
        <Component {...pageProps} />
      </div>
  )
}
