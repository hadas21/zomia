import React from "react";
import Divider from "@mui/material/Divider";
import Image from "next/image";

import imageLoader from "../loader";
import { Box } from "@mui/system";
const VerticalDivider = (props) => {
  const { height, onlyLogo } = props;

  if (onlyLogo) {
    return (
      <Box sx={{ marginRight: { xs: 1.5 } }}>
        <Image
          src="/static/o-logo.png"
          loader={imageLoader}
          unoptimized
          alt="Logo"
          width="60px"
          height="75px"
        />
      </Box>
    );
  } else {
    return (
      <Divider
        orientation="vertical"
        variant="fullWidth"
        sx={{
          minHeight: height ? height : "200px",
          //   borderRightWidth: 8,
          //   borderLeftWidth: 8,
          height: "100%",
          //   borderRadius: 8,
          width: 8,
          background: "#F9A21B",
          marginRight: { xs: 3, md: 10 },
        }}
      ></Divider>
    );
  }
};
export default VerticalDivider;
