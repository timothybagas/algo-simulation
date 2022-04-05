import '../styles/globals.css'
import { useEffect } from 'react'
import { toast, Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (window.innerWidth <= 800) {
      toast(() => (
        <p className='ml-1'>
          {"Please reopen this window on your laptop/desktop if you are currently using a"}
          <b>{" mobile device"}</b>
        </p>
      ), { duration: 6000, });
    }
  }, []);
  return (
    <>
      <Component {...pageProps} />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}

export default MyApp
