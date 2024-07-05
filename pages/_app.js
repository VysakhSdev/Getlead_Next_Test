import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css'; // Assuming this is where your global styles are imported

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
