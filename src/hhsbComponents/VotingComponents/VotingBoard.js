/* eslint-disable react/prop-types */
import React, { Fragment, useState } from "react";
import { Container } from "@material-ui/core";

import SelectionPopover from "./SelectionPopover";
import { parser } from "utils/parser";

const VotingBoard = props => {
  let topOffset = props && props.topOffset ? props.topOffset : 60;
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState({});

  const handleSelect = select => {
    const text = select.toString();

    if (!text) return;
    const selection = parser(props.content, text);

    if (text.length > 0 && props.onSelect) {
      setOpen(true);
      setSelection(selection);
      props.onSelect(selection);
    } else {
      setSelection({});
    }
  };

  const renderHighlights = () => {
    if (props.highlights) {
      return props.content.split(/\n/g).map((line, contentIndex) => (
        <Fragment key={`frag-${contentIndex}`}>
          {line.split(/\s+/g).map((word, index) => (
            <span key={index + word}>{word + " "}</span>
          ))}
          <br />
        </Fragment>
      ));
    }
    return <div dangerouslySetInnerHTML={{ __html: props.content }} />;
  };

  return (
    <Container style={{ position: "relative" }}>
      <div data-selectable>
        <p className="voting_board-content">{renderHighlights()}</p>
      </div>
      <SelectionPopover
        showPopover={open}
        topOffset={topOffset}
        onSelect={handleSelect}
        onDeselect={() => setOpen(false)}
      >
        {props && props.children({ ...selection })}
      </SelectionPopover>
    </Container>
  );
};

export default VotingBoard;
