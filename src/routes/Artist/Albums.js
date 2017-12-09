import React, { PureComponent } from "react"
import {
  Accordion,
  Icon,
  Menu,
  Segment,
  Dimmer,
  Loader,
  List
} from "semantic-ui-react"
import { bool, arrayOf, shape, string, number } from "prop-types"

class Albums extends PureComponent {
  state = { activeIndex: -1 }

  static propTypes = {
    loading: bool,
    albums: arrayOf(
      shape({
        name: string,
        id: number,
        songs: arrayOf(
          shape({
            title: string,
            albumId: number,
            songId: number
          })
        )
      })
    )
  }

  static defaultProps = {
    loading: true,
    albums: [{ name: "Not Available", songs: [{ title: "Not Available" }] }]
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  renderLoader = () => (
    <Segment style={{ minHeight: "100px" }}>
      <Dimmer active>
        <Loader size="small">Loading Albums</Loader>
      </Dimmer>
    </Segment>
  )

  renderComponent = () => {
    const { activeIndex } = this.state
    const { albums } = this.props
    return (
      <Accordion as={Menu} vertical fluid>
        {albums.map(album => (
          <Menu.Item key={album.id}>
            <Accordion.Title
              key={album.id}
              active={activeIndex === album.id}
              index={album.id}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />
              <strong>{album.name}</strong>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === album.id}>
              <List>
                {album.songs &&
                  album.songs.map((song, index) => (
                    <List.Item key={index}>
                      <List.Icon name="music" />
                      <List.Content>{song.title}</List.Content>
                    </List.Item>
                  ))}
              </List>
            </Accordion.Content>
          </Menu.Item>
        ))}
      </Accordion>
    )
  }

  render = () => {
    return (
      <div>
        {this.props.loading ? this.renderLoader() : this.renderComponent()}
      </div>
    )
  }
}

export default Albums
