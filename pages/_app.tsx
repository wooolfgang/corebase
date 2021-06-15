import 'app/styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { GraphqlClientProvider } from 'src/app/context/GraphqlClient'
import { GraphQLClient } from 'graphql-request'

type Properties = {
  Component: any
  pageProps: any
}

const queryClient = new QueryClient()
const graphqlClient = new GraphQLClient('/api/graphql', {
  headers: {}
})

function App({ Component, pageProps }: Properties) {
  return (
    <QueryClientProvider client={queryClient}>
      <GraphqlClientProvider client={graphqlClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </GraphqlClientProvider>
    </QueryClientProvider>
  )
}

export default App
