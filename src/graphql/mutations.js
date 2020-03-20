import gql from "graphql-tag";

export const CREATE_DOMAIN = gql`
  mutation createDomain($domain: DomainInput!) {
    createDomain(domain: $domain) {
      _id
      title
      description
      url
      key
      created
    }
  }`