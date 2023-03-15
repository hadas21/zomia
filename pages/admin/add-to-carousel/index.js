import React, { useState } from "react";
import AdminAppBar from "../../../components/admin/AdminAppBar";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/system";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useArticleData, useReportData } from "../../../store/hooks/useData";
import { CustomForm } from "../../../components/admin/Form";

const AddToCarousel = (props) => {
  const articleList = useArticleData();
  const reports = useReportData();
  const [selectedVal, setSelectedVal] = useState({});
  const [uploading, setUploading] = useState(false);
  //   const [articleSelected, setArticleSelected] = useState(false);
  const [percent, setPercent] = useState(0);

  return (
    <>
      <Box
        sx={{
          width: "80%",
          marginTop: 8,
          marginX: "10%",
          height: "90%",
        }}
      >
        <AdminAppBar />

        <Grid container direction={"column"} width={"90%"} marginX={"5%"}>
          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Select article to add to carousel
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              sx={{
                background: "whitesmoke",
                width: " 100%",
              }}
              label="Article"
            >
              {articleList &&
                articleList !== [] &&
                articleList.map((item) => {
                  // console.log("items:", item);
                  return (
                    <div
                      style={{
                        color: "#F9A21B",
                        padding: 5,
                        paddingLeft: 20,
                      }}
                      key={item.id}
                    >
                      <MenuItem
                        key={item.id}
                        value={item.title}
                        defaultValue=""
                        onClick={() => {
                          setSelectedVal({
                            id: item.id,
                            title: item.title,
                            image: item.image,
                            description: item.description,
                            links: `Articles/${item.id}`,
                          });
                          console.log(selectedVal);
                          //   setArticleSelected(true);
                        }}
                      >
                        <em>{item.title}</em>
                      </MenuItem>
                    </div>
                  );
                })}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Select report
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={selectedVal.title}
              onChange={(e) => handleChange(e)}
              sx={{
                background: "whitesmoke",
                width: " 100%",
              }}
              label="Report"
            >
              {reports &&
                reports !== [] &&
                reports.map((item, id) => {
                  return (
                    <div
                      style={{
                        color: "#F9A21B",
                        padding: 5,
                        paddingLeft: 20,
                      }}
                      key={id}
                    >
                      <MenuItem
                        key={item.id}
                        value={item.title}
                        onClick={() => {
                          setSelectedVal({
                            id: item.id,
                            title: item.title,
                            image: item.image,
                            description: item.description,
                            links: `Reports/${item.id}`,
                          });
                          console.log(selectedVal);
                        }}
                      >
                        <em>{item.title}</em>
                      </MenuItem>
                    </div>
                  );
                })}
            </Select>
          </FormControl>

          <>
            <Grid container marginTop={5}>
              <Typography variant="h4" sx={{ color: "whitesmoke" }}>
                {"Add New Content"}
              </Typography>

              <CustomForm isCarousel values={selectedVal} />
            </Grid>
            {uploading &&
              percent > 0 &&
              toast("Upload is " + percent + "% done", {
                autoClose: 1000,
                newestOnTop: false,
              })}

            <ToastContainer />
          </>
        </Grid>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: state.articleStore.articles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchArticles: () => dispatch(articleActions.fetchArticles()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCarousel);