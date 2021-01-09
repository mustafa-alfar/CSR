import React, { useContext } from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
/* position: absolute; */
  margin-left: 10px;
`;

function ActionLoading (props) {
    return (
      // <div className="sweet-loading d-inline-block ">
        <ClipLoader
          css={override}
          size={25}
          color={"#757575"}
          loading={props.loading}
        />
      // </div>
    );
}

export default ActionLoading;