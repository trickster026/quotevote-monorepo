import gql from "graphql-tag";

export const DOMAIN_QUERY = gql`
query domains($limit: Int!) {
  domains(limit: $limit) {
    _id
    adminIds
    allowedUserIds
    key
    privacy
    title
    url
    description
  }
}
`