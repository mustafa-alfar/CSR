import React from "react";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
const override = css`
  display: block;
  margin: calc(50vh - 100px) auto;
`;

function SystemLoading () {
    return (
      <div className="sweet-loading">
        <BounceLoader
          css={override}
          size={100}
          color={"#36D7B7"}
        />
      </div>
    );
}

export default SystemLoading;