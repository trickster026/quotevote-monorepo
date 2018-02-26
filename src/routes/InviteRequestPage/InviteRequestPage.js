import React, { PureComponent } from "react"
import nl2br from "react-newline-to-break"
import "./InviteRequestPage.css"
import bgImage from "../../assets/invite_background.png"

class InviteRequest extends PureComponent {
  render() {
    return (
      <div>
        <img src={bgImage} alt="Hiphop Background" className="bgImage" />
        <div className="LR-announcement-bar LR-announcement-bg-color-container">
          <h4 className="LR-announcement">
            Have an idea? Email => hello@hiphopscoreboard.com
          </h4>
        </div>

        <div className="LR-box-wrapper">
          <div className="LR-box">
            <div className="LR-box-container">
              <h1 className="LR-site-title">Hip Hop Score Board</h1>
              <div className="LR-box-inner">
                <div className="LR-sign-up">
                  <div className="LR-site-tagline rokkitt LR-clearfix">
                    <p>Rate Lyrics.</p>
                    <div className="LR-clearfix" />
                  </div>
                  <div className="LR-site-description rokkitt">
                    <p>
                      {nl2br(
                        "\n\nWho is on your top 10 list?\nEvery rapper says they are the best, but there is no data behind their claims. \nUntil now..."
                      )}
                    </p>
                  </div>
                  <div className="LR-sign-up-container">
                    <span className="LR-sign-up-label rokkitt">
                      Request an invitation:
                    </span>
                    <div className="LR-sign-up-container-inner LR-clearfix">
                      <input
                        type="email"
                        className="LR-sign-up-input"
                        placeholder="e-mail address"
                      />
                      <input
                        type="submit"
                        name="submit"
                        title="GO"
                        value="GO"
                        className="LR-sign-up-submit"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default InviteRequest
