import React, { Component } from "react"
import { connect } from "react-redux"
import { Dropdown, Grid } from "semantic-ui-react"
import { SEARCH_CONTENT } from "../../actions/types"
import { DateRangePicker } from "react-dates"

import "./ScoreboardHeader.css"

const trigger = (
  <span>
    <i className="fas fa-sort-amount-down fa-2x" />
  </span>
)

const tagOptions = [
  {
    key: "TopContent",
    text: "Top Content",
    value: "Top Content"
  },

  {
    key: "SearchKey",
    text: "Search Key",
    value: "Search Key"
  },
  {
    key: "DateRange",
    text: "Date Range",
    value: "Date Range"
  }
]

class ScoreboardHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: "",
      selectedOption: tagOptions[0],
      startDate: null,
      endDate: null,
      focusedInput: null
    }
  }

  handleInputChange = e => {
    this.setState({ searchTerm: e.target.value })
  }

  clickSearch = () => {
    this.props.filterContent(this.state.searchTerm)
  }

  handleOption = (e, data) => {
    console.log("Selected: ", { data })
    this.setState({ selectedOption: data })
  }

  renderInput = (
    <div className="ui icon input">
      <input
        placeholder="Search..."
        type="text"
        onChange={this.handleInputChange}
        style={{ height: "46px", width: "285px" }}
      />
    </div>
  )

  handleDateRangeChange = ({ startDate, endDate }) => {
    this.setState({
      startDate,
      endDate
    })

    console.log({ startDate, endDate })
  }

  render = () => {
    const { selectedOption, startDate, endDate, focusedInput } = this.state
    return (
      <Grid.Row columns={1} className="scoreboard-rankings-header-row">
        <Grid.Column width={16} className="scoreboard-rankings-header-column">
          <div className="scoreboard-rankings-header">
            <center>
              <h3>Scoreboard Rankings</h3>
            </center>
            <div className="scoreboard-rankings-icons">
              <Dropdown
                trigger={trigger}
                icon={null}
                style={{ marginRight: "5px" }}
              >
                <Dropdown.Menu>
                  <Dropdown.Header icon="tags" content="Filter By" />
                  <Dropdown.Menu scrolling>
                    {tagOptions.map(option => (
                      <Dropdown.Item
                        key={option.value}
                        {...option}
                        onClick={this.handleOption}
                      />
                    ))}
                  </Dropdown.Menu>
                </Dropdown.Menu>
              </Dropdown>
              {selectedOption.value !== "Date Range" ? (
                this.renderInput
              ) : (
                <DateRangePicker
                  isOutsideRange={() => false}
                  startDate={startDate} // momentPropTypes.momentObj or null,
                  startDateId="startDateRange" // PropTypes.string.isRequired,
                  endDate={endDate} // momentPropTypes.momentObj or null,
                  endDateId="endDateRange" // PropTypes.string.isRequired,
                  onDatesChange={this.handleDateRangeChange} // PropTypes.func.isRequired,
                  focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                  onFocusChange={focusedInput =>
                    this.setState({ focusedInput })
                  } // PropTypes.func.isRequired,
                />
              )}
              &nbsp;&nbsp;
              <i className="fas fa-search fa-2x" onClick={this.clickSearch} />
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
