import 'app/styles/globals.css'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import queryClient from 'app/lib/queryClient'
import graphqlClient from 'app/lib/graphqlClient'
import { store } from 'src/app/store/graphql'

type Properties = {
  Component: any
  pageProps: any
}

store.setState({ client: graphqlClient })

function App({ Component, pageProps }: Properties) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  )
}

export default App
