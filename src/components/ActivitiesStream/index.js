import React, { Component } from "react"
import { Segment, Container, Header, Item, Label } from "semantic-ui-react"
import moment from "moment"

class ActivitiesStream extends Component {
  renderStream = () => {
    const { activities } = this.props
    return activities.map((act, index) => {
      switch (act.event) {
        case "POSTED":
          return (
            <Item key={index}>
              <Item.Content>
                <Item.Header as="h6">
                  <Label color="teal">X / -Y</Label>
                  <Label color="grey">{`New Post: [${act.data.title}]`}</Label>
                </Item.Header>
                <Item.Description>
                  <Label color="teal">
                    {`[${act.data.title}] by [${act.data.creator.name}]`}
                  </Label>
                  <Label color="teal">
                    {moment(act.data.created).format("hh:mm:ss")}
                  </Label>
                </Item.Description>
              </Item.Content>
            </Item>
          )
        case "QUOTED":
          return (
            <Item key={index}>
              <Item.Content>
                <Item.Header as="h6">
                  <Label color="grey">{`["${act.data.quote}"]`}</Label>
                </Item.Header>
                <Item.Description>
                  <Label color="teal">{`[${act.data.content.title}] by [${
                    act.data.creator.name
                  }]`}</Label>
                  <Label color="teal">
                    {moment(act.data.created).format("hh:mm:ss")}
                  </Label>
                </Item.Description>
              </Item.Content>
            </Item>
          )
        case "VOTED":
          return (
            <Item key={index}>
              <Item.Content>
                <Item.Header as="h6">
                  <Label color="teal">{act.data.points}</Label>
                  <Label color="grey">{`${act.data.type.toUpperCase()}`}</Label>
                </Item.Header>
                <Item.Description>
                  <Label color="teal">{`[${act.data.content.title}] by [${
                    act.data.creator.name
                  }]`}</Label>
                  <Label color="teal">
                    {moment(act.data.created).format("hh:mm:ss")}
                  </Label>
                </Item.Description>
              </Item.Content>
            </Item>
          )
        case "COMMENTED":
          return (
            <Item key={index}>
              <Item.Content>
                <Item.Header as="h6">
                  <Label color="grey">{`New Comment: ["${
                    act.data.text
                  }"]`}</Label>
                </Item.Header>
                <Item.Description>
                  <Label color="teal">{`[${act.data.content.title}] by [${
                    act.data.creator.name
                  }]`}</Label>
                  <Label color="teal">
                    {moment(act.data.created).format("hh:mm:ss")}
                  </Label>
                </Item.Description>
              </Item.Content>
            </Item>
          )
        default:
          break
      }
      return null
    })
  }
  render = () => {
    console.log("this.props", this.props)
    return (
      <Segment as={Container}>
        <Header as="h1" style={{ fontStyle: 24 }}>
          Activities Stream
        </Header>
        <Segment basic>
          <Item.Group divided>{this.renderStream()}</Item.Group>
        </Segment>
      </Segment>
    )
  }
}

export default ActivitiesStream
