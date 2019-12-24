// import { getThemeProps } from '@material-ui/styles';
// import Accordion from "components/Accordion/Accordion.js";
// import Badge from "components/Badge/Badge.js";
// import Box from '@material-ui/core/Box';
// import Button from "components/CustomButtons/Button.js"
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Divider from "@material-ui/core/Divider";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// import NavPills from "components/NavPills/NavPills.js";
import VotingBoard from "hhsbComponents/VotingComponents/VotingBoard.js";
import VotingPopup from "hhsbComponents/VotingComponents/VotingPopup.js";
import React, { useState } from "react";

// import Content from "../hhsbComponents/ContentList.js";

import Chat from "../hhsbAssets/Chat.svg";
import Heart from "../hhsbAssets/Heart.svg";
import Send from "../hhsbAssets/Send.svg";

const ContentDisplay = () => {
  const [selectedText, setSelectedText] = useState("");
  let data = {
    title: "a test title",
    Body: "this is some test text",
    Comments: "this is pretty cool"
  };
  let sample =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  return (
    <div>
      <GridContainer spacing={1} direction="col">
        <GridItem xs={6}>
          <Card style={{ height: "800px" }}>
            <CardHeader style={{ zIndex: 0 }}>
              <div
                style={{
                  display: "flex",
                  direction: "row",
                  justifyContent: "space-between",
                  zIndex: 0
                }}
              >
                <div
                  style={{
                    display: "flex",
                    direction: "row",
                    alignContent: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <p
                    style={{
                      color: "#E91E63",
                      fontSize: "25px",
                      font: "League Spartan",
                      fontWeight: "bold"
                    }}
                  >
                    {data.title}
                  </p>
                  <img
                    src={Chat}
                    style={{ height: "20px", paddingLeft: "10px" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    direction: "row",
                    justifyContent: "flex-end",
                    flexBasis: "100px"
                  }}
                >
                  <p>+1001/-203</p>
                  <img
                    src={Send}
                    style={{
                      height: "15px",
                      paddingLeft: "15px",
                      paddingTop: "3px"
                    }}
                  />
                  <img
                    src={Heart}
                    style={{
                      height: "15px",
                      paddingLeft: "15px",
                      paddingTop: "3px"
                    }}
                  />
                </div>
              </div>
              <Divider />
            </CardHeader>
            <CardBody>
              <VotingBoard
                content={sample}
                onSelect={setSelectedText}
                selectedText={selectedText}
              >
                {({ text }) => (
                  <VotingPopup text={text} selectedText={selectedText} />
                )}
              </VotingBoard>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={6}>
          <Card style={{ height: "800px" }}>
            <CardHeader>
              <div
                style={{
                  display: "flex",
                  direction: "row",
                  justifyContent: "space-between"
                }}
              >
                <div style={{ display: "flex", direction: "row" }}>
                  <p
                    style={{
                      color: "#E91E63",
                      fontSize: "25px",
                      font: "League Spartan",
                      fontWeight: "bold"
                    }}
                  >
                    Comments
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    direction: "row",
                    justifyContent: "flex-end",
                    flexBasis: "100px"
                  }}
                >
                  <img
                    src={Send}
                    style={{ height: "15px", paddingLeft: "15px" }}
                  />
                  <img
                    src={Heart}
                    style={{ height: "15px", paddingLeft: "15px" }}
                  />
                </div>
              </div>
              <Divider />
            </CardHeader>
            <CardBody>
              <p>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default ContentDisplay;
