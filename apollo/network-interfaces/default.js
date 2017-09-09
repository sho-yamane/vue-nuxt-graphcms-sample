import { createNetworkInterface } from 'apollo-client'

export default (ctx) => {
  const networkInterface = createNetworkInterface({
    // GraphCMSのSimple Endpoint（Relay EndpointでもOK）を指定する
    uri: 'https://api.graphcms.com/simple/v1/blogtest'
  })
  return networkInterface
}
