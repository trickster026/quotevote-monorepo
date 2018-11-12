import React, { Component } from "react"
import { connect } from "react-redux"
import { Grid } from "semantic-ui-react"
import { SEARCH_CONTENT } from "../../actions/types"

import "./ScoreboardHeader.css"

class ScoreboardHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: ""
    }
  }

  handleInputChange = e => {
    this.setState({ searchTerm: e.target.value })
  }

  clickSearch = () => {
    this.props.filterContent(this.state.searchTerm)
  }

  render = () => {
    return (
      <Grid.Row columns={1} className="scoreboard-rankings-header-row">
        <Grid.Column width={16} className="scoreboard-rankings-header-column">
          <div className="scoreboard-rankings-header">
            <center>
              <h3>Scoreboard Rankings</h3>
            </center>
            <div className="scoreboard-rankings-icons">
              <i className="fas fa-sort-amount-down fa-2x" />
              &nbsp;&nbsp;
              <i className="fas fa-search fa-2x" onClick={this.clickSearch} />
              &nbsp;&nbsp;
              <div className="ui icon input">
                <input type="text" onChange={this.handleInputChange} />
              </div>
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  filterContent: searchTerm => {
    dispatch({
      type: SEARCH_CONTENT,
      payload: {
        searchTerm
      }
    })
  }
})

export default connect(
  null,
  mapDispatchToProps
)(ScoreboardHeader)
