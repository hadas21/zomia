import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { AppBar, Box, Grid, Paper } from "@mui/material";
import { MakeArticleParagraph2 } from "../utils/ArticleParagraph";
import OnlyTabsBar from "../layout/OnlyTabsBar";
import VerticalDivider from "./VerticalDivider";
import RenderSubtitle from "./RenderSubtitle";
import RenderBody from "./RenderBody";
import CardList from "../pages/components/CardList";
import SectionBreaker from "../pages/components/SectionBreaker";
import imageLoader from "../loader";

const Article = (props) => {
    const { article, isReport } = props;

    const [offset, setOffset] = useState(0);
    useEffect(() => {
        const onScroll = () => setOffset(window.pageYOffset);
        // clean up code
        window.removeEventListener("scroll", onScroll);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (article) {
        article.text = MakeArticleParagraph2(article.text);

        return (
            <>
                <AppBar
                    position="fixed"
                    sx={{
                        zIndex: 2,
                        height: {
                            xs: "90px !important",
                            md: "100px !important",
                        },
                    }}
                >
                    <OnlyTabsBar />
                    {offset > 250 && (
                        <AppBar
                            position="relative"
                            sx={{
                                textIndent: "1rem",
                            }}
                        >
                            <Grid
                                container
                                flexDirection={"row"}
                                justifyContent={"flex-start"}
                                alignItems={"center"}
                                alignSelf={"center"}
                                alignContent={"center"}
                            >
                                <Grid item>
                                    <Image
                                        src="/static/o-logo.png"
                                        loader={imageLoader}
                                        unoptimized
                                        alt="Zomia Amblem"
                                        width="40px"
                                        height="40px"
                                    />
                                </Grid>
                                <Grid item alignSelf={"center"}>
                                    <Typography
                                        variant="subtitle2"
                                        fontStyle={"italic"}
                                        fontFamily="Monsterrat !important"
                                        bgcolor={"black"}
                                        fontSize={{
                                            xs: "14px !important",
                                            md: "20px !important",
                                        }}
                                    >
                                        {article.title}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </AppBar>
                    )}
                </AppBar>

                <Paper>
                    <Grid
                        container
                        justifyItems={"center"}
                        justifySelf={"center"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Grid item xs={10} lg={9} alignSelf={"center"}>
                            <Box marginY={5}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    marginY={5}
                                >
                                    <VerticalDivider />
                                    <Box>
                                        <Typography
                                            variant="h3"
                                            sx={{ marginY: 3 }}
                                        >
                                            {article.title}
                                        </Typography>
                                        {article.author && (
                                            <>
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{ marginY: 3 }}
                                                >
                                                    {"by " + article.author}
                                                </Typography>
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{ marginY: 3 }}
                                                >
                                                    {article.date}
                                                </Typography>
                                            </>
                                        )}
                                    </Box>
                                </Box>

                                {article.image && (
                                    <Box>
                                        <Image
                                            src={article.image}
                                            loader={imageLoader}
                                            unoptimized
                                            width={"1300px"}
                                            height={"750px"}
                                            alt="zomia article"
                                        />
                                    </Box>
                                )}

                                <Grid
                                    item
                                    xs={12}
                                    lg={11.5}
                                    justifyItems={"center"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    justifySelf={"center"}
                                >
                                    {article.text
                                        .split("<br/>" || "<br>")
                                        .map((paragraph, index) => {
                                            if (
                                                paragraph.includes(".") ||
                                                paragraph.includes("@")
                                            ) {
                                                return (
                                                    <RenderBody
                                                        key={index}
                                                        text={paragraph}
                                                    />
                                                );
                                            } else {
                                                return (
                                                    <RenderSubtitle
                                                        key={index}
                                                        text={paragraph}
                                                    />
                                                );
                                            }
                                        })}
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    {!isReport && (
                        <>
                            <SectionBreaker
                                text="Related Articles"
                                link="/investigations"
                            />
                            <CardList type="report" />
                        </>
                    )}
                </Paper>
            </>
        );
    } else {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }
};

export default Article;
