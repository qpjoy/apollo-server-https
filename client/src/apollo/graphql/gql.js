const gql = require("graphql-tag");
const { GraphQLEnumType } = require("graphql");

const ClientModeEnum = new GraphQLEnumType({
  name: "ClientMode",
  values: {
    WEB: {
      value: 0,
    },
    HUB: {
      value: 0,
    },
    EDITOR: {
      value: 0,
    },
    SITE_MAIN: {
      value: 0,
    },
    FORUM: {
      value: 0,
    },
  },
});
console.log(ClientModeEnum);

export const LOGIN_MUTATION = gql`
    mutation LoginMutation($account: String!, $password: String!, $mode: ClientMode) {
        login(account: $account, password: $password, mode: $mode) {
            token
            userInfo {
                userID
                nickname
                gender
                hasAvatar
                avatarJSON
                status
                gameID
                gameName
                iconURL
            }
        }
    }
`;
