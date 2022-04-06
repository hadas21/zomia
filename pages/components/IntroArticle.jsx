import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
import styled from "@emotion/styled";
import { isMobile } from "react-device-detect";

export default function IntroArticle(props) {
  const StyledButton = styled(Button)(({ theme }) => ({
    color: "#000",
    "&:hover": {
      color: theme.palette.secondary.main,
      backgroundColor: "transparent",
    },
  }));
  return (
    <Card>
      <CardActionArea sx={{ backgroundColor: "rgba(155, 155, 155, 0.1)" }}>
        <CardMedia
          component="img"
          image="/static/tempImage.png"
          alt="zomia article"
          sx={{ zIndex: "-1", position: "relative" }}
        />
        {/* <Image src="/static/tempImage.png" layout="fill" /> */}
        <CardContent>
          <Grid
            variant="h5"
            component="div"
            sx={{ marginBottom: "-5rem" }}
          ></Grid>
          <Grid
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              zIndex: "1",
            }}
          >
            <Typography
              variant="body2"
              color="white"
              sx={{
                padding: "0.5rem",
              }}
            >
              <Typography variant="h5" component="div">
                This is the heading
              </Typography>
              {!isMobile
                ? props.description.slice(0, 280)
                : props.description.slice(0, 140)}
              ...
            </Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <StyledButton size="small">Read More</StyledButton>
      </CardActions> */}
    </Card>
  );
}
