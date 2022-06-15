import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import {
    bulletList1,
    bulletList2,
    MISSION,
} from "../../components/data/mission";
import { MakeArticleParagraph2 } from "../../utils/ArticleParagraph";
import RenderTitle from "../../components/RenderTitle";
import RenderBody from "../../components/RenderBody";
import RenderBulletPoint from "../../components/RenderBulletPoint";
import RenderSubtitle from "../../components/RenderSubtitle";
import Partners from "../../components/Partners";

const Mission = () => {
    const mission = MakeArticleParagraph2(MISSION);
    const bullet1 = MakeArticleParagraph2(bulletList1);
    const bullet2 = MakeArticleParagraph2(bulletList2);

    return (
        <Paper sx={{ paddingTop: 5 }}>
            <Grid
                container
                justifyItems={"center"}
                justifySelf={"center"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Grid item xs={10} lg={9} alignSelf={"center"}>
                    <Box marginY={5} sx={{ paddingBottom: "125px" }}>
                        <Box sx={{ marginLeft: { md: 2.5 } }}>
                            <RenderTitle
                                text="About"
                                height="100px"
                                onlyLogo={true}
                            />
                        </Box>

                        <Grid
                            item
                            xs={12}
                            lg={12}
                            justifyItems={"center"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            justifySelf={"center"}
                        >
                            {mission.split("<br/>").map((paragraph, index) => {
                                return (
                                    <RenderBody key={index} text={paragraph} />
                                );
                            })}
                        </Grid>
                        <RenderSubtitle text="Current Initiatives" />

                        <Box marginBottom={10}>
                            {bullet1.split("<br/>").map((paragraph, index) => {
                                return (
                                    <RenderBulletPoint
                                        key={index}
                                        text={paragraph}
                                    />
                                );
                            })}
                        </Box>
                        <RenderBody
                            text={
                                "The Center is unique in linking these endeavors to cutting-edge, granular research in non-state spaces. The Center produces deeply researched reports for the public on issues ranging from the Syrian war to vaccination deserts in the United States. "
                            }
                        />
                        <RenderSubtitle text="Current Themes" />
                        <Box marginBottom={10}>
                            {bullet2.split("<br/>").map((paragraph, index) => {
                                return (
                                    <RenderBulletPoint
                                        key={index}
                                        text={paragraph}
                                    />
                                );
                            })}
                        </Box>
                        <RenderBody
                            text={
                                "The Center seeks to encourage the free exchange of information among the scholarly and humanitarian communities. Named for the historically contested uplands of Southeast Asia, The Zomia Center aims to build on a rich tradition of non-state scholarship and activism, in the belief that empirical understanding of the contested present is necessary for a more peaceful and egalitarian future."
                            }
                        />

                        <Box sx={{ marginLeft: { md: 2.5 } }}>
                            <RenderTitle text="Support Zomia" height="100px" />
                        </Box>

                        <RenderBody
                            text={
                                "Zomia is a 501(c)(3) non-profit organization and all donations are tax deductible. Our federal ID number is 30-1201889. Contributions may be submitted online, or by wire transfer."
                            }
                        />

                        {/* <Box sx={{ marginLeft: { md: 2.5 } }}>
                            <RenderTitle text="Partners" height="100px" />
                        </Box>
                        <Partners /> */}
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Mission;
