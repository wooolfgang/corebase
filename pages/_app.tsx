import 'tailwindcss/tailwind.css'

type Props = {
  Component: any
  pageProps: any
}

function App({ Component, pageProps }: Props) {
    return <Component {...pageProps} />
}


export default App