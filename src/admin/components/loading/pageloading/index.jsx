import React, { useContext } from "react";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";
import { AdminContext } from "../../../context/admin";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  text-align: center;
  margin: 0 auto;
  border-color: #d73636;
`;

function PageLoading (props) {
    // const {loading} = useContext(AdminContext)
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