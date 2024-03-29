import { Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ListView from "../../components/ListView";
import { Container } from "@mui/material";
import { connect } from "react-redux";
import { useArticleData } from "../../store/hooks/useData";
import * as articleActions from "../../store/actions/article-actions";
import { Divider } from "@mui/material";
import ActiveLink from "../components/ActiveLink";

const Articles = (props) => {
  //   const context = useContext(singleContext);
  const articleList = useArticleData();

  const [connectArticle, setConnectArticle] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      await props.fetchArticles();
      setConnectArticle(props.articles);
    };
    fetch();
  }, [props.articles, connectArticle]);

  return (
    <Paper>
      <Helmet>
        <title>Zomia Center Articles</title>
      </Helmet>
      <Container>
        <Typography
          variant="h2"
          marginY={15}
          textAlign="center"
          paddingBottom={10}
          paddingTop={10}
          sx={{
            fontSize: " 3.75rem !important",
            fontFamily: "Tiro Telugu !important",
          }}
        >
          Articles
        </Typography>
        <div style={{ paddingBottom: "125px" }}>
          {articleList &&
            articleList.map((article, index) => {
              return (
                <div key={article.id}>
                  <ActiveLink href={`/Articles/${article.id}`}>
                    <ListView
                      heading={article.title}
                      date={article.date}
                      author={article.author}
                      image={article.image}
                      description={article.description}
                    />
                  </ActiveLink>
                  {index < articleList.length - 1 && (
                    <Divider
                      flexItem
                      sx={{
                        marginBottom: "3rem",
                        marginTop: "1rem",
                      }}
                    ></Divider>
                  )}
                </div>
              );
            })}
        </div>
      </Container>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: state.articleStore.articles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticles: () => dispatch(articleActions.fetchArticles()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
