import React, { Component } from "react"
import { connect } from "react-redux"
import { Dropdown, Grid } from "semantic-ui-react"
import { SEARCH_CONTENT } from "../../actions/types"
import { DateRangePicker } from "react-dates"
import moment from "moment"

import "./ScoreboardHeader.css"
import PropTypes from "prop-types"

const trigger = (
  <span>
    <i className="fas fa-sort-amount-up fa-2x" />
  </span>
)

const tagOptions = [
  {
    key: "TopContent",
    text: "Top Content",
    value: "Top Content"
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
      startDate: moment(),
      endDate: moment(),
      focusedInput: null
    }
  }

  handleInputChange = e => {
    this.setState({ searchTerm: e.target.value })
  }

  clickSearch = () => {
    // this.props.filterContent(this.state.searchTerm);
    const { startDate, endDate, selectedOption } = this.state
    const { value } = selectedOption
    const isDateRange = value === "Date Range"
    const searchTerm = isDateRange ? "" : this.state.searchTerm
    const searchBy = isDateRange ? "date_range" : ""

    const dateRange = isDateRange
      ? {
          from: startDate.format("YYYY-MM-DD").toString(),
          to: endDate.format("YYYY-MM-DD").toString()
        }
      : {}
    const pageFilter = { searchTerm, searchBy, dateRange }
    this.props.handleFilterChange(pageFilter)
  }

  handleOption = (e, data) => {
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

ScoreboardHeader.propTypes = {
  handleFilterChange: PropTypes.func.isRequired
}

export default connect(
  null,
  mapDispatchToProps
)(ScoreboardHeader)
