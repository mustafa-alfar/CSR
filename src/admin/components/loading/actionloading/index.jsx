import React, { useContext } from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 5px auto 0;
  /* border-color: #d73636; */
`;

function ActionLoading (props) {
    return (
      <div className="sweet-loading">
        <ClipLoader
          css={override}
          size={25}
          color={"#ced4da"}
          loading={props.loading}
        />
      </div>
    );
}

export default ActionLoading;