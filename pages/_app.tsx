import 'tailwindcss/tailwind.css'

type Properties = {
  Component: any
  pageProps: any
}

function App({ Component, pageProps }: Properties) {
  return <Component {...pageProps} />
}

export default App
