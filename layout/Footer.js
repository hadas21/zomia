import React, { useState, useContext, useEffect } from "react";
import palette from "../theme/palette";
import { Grid, Typography, Box, TextField, Button, Link } from "@mui/material";
import { Divider } from "@mui/material";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import TwitterIcon from "@mui/icons-material/Twitter";
import SendIcon from "@mui/icons-material/Send";
import styled from "@emotion/styled";
import { isMobile } from "react-device-detect";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { collection, getDocs, getFirestore, addDoc } from "firebase/firestore";
import { db } from "../store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import * as articleActions from "../store/actions/article-actions";
import * as reportActions from "../store/actions/report-actions";
import { useArticleData, useReportData } from "../store/hooks/useData";

const StyledButton = styled(Button)(({ theme }) => ({
  color: "#000",
  "&:hover": {
    color: "white",
    backgroundColor: "transparent",
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: "#000",
  "&:hover": {
    color: "white",
    backgroundColor: "transparent",
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: "#000",
  "&:hover": {
    color: "purple",
    backgroundColor: "transparent",
  },
}));

const Footer = (props) => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const articleList = useArticleData();
  const reportList = useReportData();

  const [connectArticle, setConnectArticle] = useState([]);
  const [connectReport, setConnectReport] = useState([]);
  var writingList = [];
  useEffect(() => {
    const fetch = async () => {
      await props.fetchArticles();
      await props.fetchReports();
      setConnectArticle(props.articles);
      setConnectReport(props.reports);
    };
    fetch();
  }, [
    props.articles,
    props.reports,
    connectArticle,
    connectReport,
    articleList,
    reportList,
  ]);

  if (reportList && reportList != []) {
    writingList.push(...reportList);
  }
  if (articleList && articleList != []) {
    writingList.push(...articleList);
  }

  const monthList = {
    january: "1",
    february: "2",
    march: "3",
    april: "4",
    may: "5",
    june: "6",
    july: "7",
    august: "8",
    september: "9",
    october: "10",
    november: "11",
    december: "12",
  };

  const getLatestWriting = () => {
    let years = [];
    let months = [];
    let days = [];
    let index = 0;
    let route = "";
    writingList.map((writing) => {
      let sepArr = writing.date.split(" ");
      years.push(Number(sepArr[2]));
      months.push(sepArr[0].toLowerCase());
      days.push(Number(sepArr[1]));
    });
    years.push(9999);
    for (let i = 0; i < years.length - 1; i++) {
      if (years[i] > years[i + 1]) {
        if (years[i] > years[index]) {
          index = i;
        }
      } else if (years[i] === years[i + 1]) {
        if (
          monthList[months[i].toLowerCase()] >
          monthList[months[i + 1].toLowerCase()]
        ) {
          index = i;
        } else if (
          monthList[months[i].toLowerCase()] ===
          monthList[months[i + 1].toLowerCase()]
        ) {
          if (days[i] > days[i + 1]) {
            index = i;
          }
        }
      }
    }
    if (writingList[index].desciption) {
      route = `/analysis/${writingList[index].id}`;
    } else {
      route = `/investigations/${writingList[index].id}`;
    }
    router.push(route);
  };

  const saveEmail = async () => {
    try {
      const docRef = await addDoc(collection(db, "emails"), {
        email: email,
      });
      toast("Your email has been successfully added to the newsletter");
    } catch (e) {
      toast("HAVING PROBLEMS GETTING YOUR EMAIL`");
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent={"space-evenly"}
      bgcolor={palette.orange.main}
      sx={{ padding: "1rem" }}
    >
      <Grid item sx={{ padding: "1rem" }}>
        <StyledButton>
          <Grid container direction={"row"}>
            <Grid item sx={{ paddingRight: "0.5rem" }}>
              <SendIcon
                sx={{
                  color: palette.black.main,
                }}
              />
            </Grid>
            <Grid item>
              <StyledTypography variant="subtitle1" component="div">
                Send Email
              </StyledTypography>
            </Grid>
          </Grid>
        </StyledButton>
      </Grid>
      <Grid item sx={{ padding: "1rem" }}>
        <StyledButton>
          <Grid container direction={"row"}>
            <Grid item sx={{ paddingRight: "0.5rem" }}>
              <TwitterIcon
                sx={{
                  color: palette.black.main,
                }}
              />
            </Grid>
            <Grid item>
              <StyledTypography variant="subtitle1" component="div">
                Follow us on Twitter
              </StyledTypography>
            </Grid>
          </Grid>
        </StyledButton>
      </Grid>
      <Grid item sx={{ padding: "1rem" }}>
        <StyledButton>
          <Grid container direction={"row"} sx={{ paddingLeft: isMobile && 5 }}>
            <Grid item sx={{ paddingRight: "0.5rem" }}>
              <ShuffleIcon
                sx={{
                  color: palette.black.main,
                }}
              />
            </Grid>
            <StyledTypography
              variant="subtitle1"
              component="div"
              item
              onClick={getLatestWriting}
            >
              Read latest
            </StyledTypography>
          </Grid>
        </StyledButton>
      </Grid>
      <Grid item>
        {!isMobile && (
          <Divider
            orientation="vertical"
            variant="fullWidth"
            sx={{
              minHeight: "20px",
              height: "100%",
              width: 10,
              background: palette.black.main,
              borderRadius: 6,
            }}
          ></Divider>
        )}
      </Grid>
      {/* Third Column */}
      <Grid item>
        <Grid container direction="column" justifyContent={"space-around"}>
          <Grid item>
            <Grid container direction={"row"} justifyContent="space-evenly">
              <Grid item>
                <Typography
                  variant="h5"
                  color={palette.black.main}
                  sx={{ padding: "1rem" }}
                >
                  Subscribe to our newsletter
                </Typography>
              </Grid>
              <Grid item paddingLeft={"1rem"}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <LocalPostOfficeIcon
                    sx={{
                      color: palette.black.main,
                      mr: 1,
                      my: 0.5,
                    }}
                  />
                  <TextField
                    id="input-with-sx"
                    label="Email"
                    variant="standard"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Box>
              </Grid>
              <Grid item sx={{ padding: "1rem", border: "2px #000" }}>
                <StyledButton>
                  <StyledTypography
                    variant="h6"
                    component="div"
                    onClick={saveEmail}
                  >
                    Sign Up
                  </StyledTypography>
                </StyledButton>
                <ToastContainer />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"} flexDirection={"row"}>
        <Grid item>
          <Typography
            variant="subtitle2"
            sx={!isMobile && { paddingRight: "6rem" }}
          >
            <span style={{ color: "black !important" }}>Developed by</span>
            <StyledLink href="https://www.wowfreelance.com">
              {" "}
              wowfreelance.com
            </StyledLink>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: state.articleStore.articles,
    reports: state.reportStore.reports,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticles: () => dispatch(articleActions.fetchArticles()),
    fetchReports: () => dispatch(reportActions.fetchReports()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
