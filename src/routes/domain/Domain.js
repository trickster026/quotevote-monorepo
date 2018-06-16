import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {
  Card,
  Container,
  Segment,
  Image,
  Button,
  Header,
  Icon
} from "semantic-ui-react"

import * as actions from "../../actions/routing.actions"
import { domains } from "../../common/domains"
import PropTypes from "prop-types"

class Domain extends Component {
  static propTypes = {
    updateDomain: PropTypes.func
  }

  static defaultProps = {
    setDomain: () => {}
  }

  handleClick = (event, domain) => {
    this.props.updateDomain({ domain, url: "/" + domain })
  }

  render = () => {
    return (
      <Segment as={Container} basic padded="very">
        <Segment inverted color="black">
          <Segment basic textAlign="center">
            <Header as="h2" icon inverted>
              <Icon name="sitemap" />
              Domain Manager
              <Header.Subheader>
                Choose the domain you are going
              </Header.Subheader>
            </Header>
          </Segment>
          <Card.Group itemsPerRow={1}>
            {domains.map(domain => (
              <Card key={domain.key} fluid>
                <Card.Content>
                  <Image floated="left" size="tiny" src={domain.image} />
                  <Card.Header>{domain.title}</Card.Header>
                  <Card.Meta>{domain.meta}</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <Button
                    as={Link}
                    floated="right"
                    primary
                    to={"/" + domain.key}
                    onClick={e => this.handleClick(e, domain.key)}
                  >
                    Go to app
                  </Button>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Segment>
      </Segment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateDomain: domain => {
    dispatch({ type: actions.UPDATE_DOMAIN, payload: domain })
  }
})

export default connect(null, mapDispatchToProps)(Domain)
