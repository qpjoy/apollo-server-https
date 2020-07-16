const { ApolloClient } = require('apollo-client');
const { InMemoryCache, defaultDataIdFromObject } = require('apollo-cache-inmemory');
const { HttpLink } = require('apollo-link-http');
const { onError } = require('apollo-link-error');
const { ApolloLink } = require('apollo-link');
const { setContext } = require('apollo-link-context');
// const { RetryLink } = require("apollo-link-retry");

// const nodeFetch = require("node-fetch");

const cache = new InMemoryCache({
  dataIdFromObject: (object) => {
    switch (object.__typename) {
      case 'DisplayUserInfo':
        return object['userID']; // use `key` as the primary key
      case 'DeveloperGameDisplayItem':
        return object['version'];
      case 'TeamMember':
        return object['userID'];
      // case 'bar':
      //   return `bar:${object.blah}`; // use `bar` prefix and `blah` as the primary key
      default:
        return defaultDataIdFromObject(object) || `${object.__typename}:${object._id}`; // fall back to default handling
    }
  }
});


export function setClient(options) {
  const client = new ApolloClient({
    cache,
    link: ApolloLink.from([
      onError((error) => {
        const { graphQLErrors, networkError } = error;
        console.log(error, '-  -- this is error');
        if (graphQLErrors) {
          graphQLErrors.map((err) => {
            if(err && err.extensions && err.extensions.errcode) {
              console.log(err.extensions.errcode, ' - - -this is errcode');
            }
          })
        }

        if (networkError) {
          // document.dispatchEvent(networkErrorEvent)
          // remove cached token on 401 from the server
          console.log(JSON.stringify(networkError), ' - - - - - resolving network error!', options);
          // console.log(networkError.name, ' - - - -  -- -- this is network name!');

          // if (networkError.name === 'ServerError' && networkError.statusCode === 401) {
          //   localStorage.removeItem(AUTH_TOKEN)
          // }
        }
      }),
      // auth
      setContext((_, { headers }) => {
        let token = '';
        // let token = _isInLocalStorage(AUTH_TOKEN);
        // let _phoneInfo = _isInLocalStorage(PHONE_INFO);
        // let phoneInfo = {};
        // if (_phoneInfo) {
        //   phoneInfo = JSON.parse(_phoneInfo);
        // }
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
            // "m-a-model": phoneInfo.model ? phoneInfo.model : "",
            // "m-a-s_v": phoneInfo.s_v ? phoneInfo.s_v : "",
            // "m-a-device": phoneInfo.device ? phoneInfo.device : "",
            // "m-a-app_v": phoneInfo.app_v ? phoneInfo.app_v : "",
            // "m-a-g_aid": phoneInfo.aid ? phoneInfo.aid : ""
          },
        }
      }),
      new HttpLink({
        // uri: options.api ? options.api : ''
        uri: options.api ? options.api : '',
        // fetch: nodeFetch
        // credentials: 'include'
      })
    ]),
  });
  return client;
}

// module.exports = {
//   setClient
// }
