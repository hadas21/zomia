import { Link, Paper, Typography } from "@mui/material";
import React from "react";
import ListView from "../../components/ListView";
import { Container } from "@mui/material";
import { mockReports } from "../../MOCK_PDF";

const Investigations = () => {
    return (
        <Paper sx={{ paddingTop: 5 }}>
            <Container>
                <Typography
                    variant="h2"
                    marginY={15}
                    textAlign="center"
                    paddingBottom={10}
                    fontFamily={"Montserrat"}
                >
                    Reports
                </Typography>
                {mockReports.map((report, index) => {
                    return (
                        <Link key={index} href={`/investigations/${report.id}`}>
                            <ListView
                                heading={report.title}
                                date={report.date}
                                author={report.author}
                                image={report.image}
                            />
                        </Link>
                    );
                })}
            </Container>
        </Paper>
    );
};

export default Investigations;
