import React from "react";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  text-align: center;
  margin: 0 auto;
`;

function PageLoading (props) {
    return (
      <div className="sweet-loading">
        <BeatLoader
          css={override}
          size={25}
          color={"#36D7B7"}
          loading={props.loading}
        />
      </div>
    );
}

export default PageLoading;