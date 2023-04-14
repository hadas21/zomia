import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Box, Container, Stack, Button, Divider } from "@mui/material";
import RenderTitle from "../../components/RenderTitle";
import CardList from "../components/CardList";
import singleContext from "../../SingleContext";
import { CardTypes } from "../../models/CardTypes";
// import Button from "../../theme/overrides/Button";
import { MainCarousel } from "../../components/MainCarousel";
import GenericModal from "../../layout/GenericModal";
import { RefugeeInfo } from "../../models/RefugeeInfo.jsx";
import OurPartners from "../../components/OurPartners";

const RefugeesInTech = () => {
  // const context = useContext(singleContext);
  //hardcoded data- need to fetch from db
  const [openModal, setOpenModal] = React.useState(false);
  const [content, setContent] = React.useState();
  const [title, setTitle] = React.useState();

  const handleClick = (newContent, newTitle) => {
    setOpenModal(true);
    setContent(newContent);
    setTitle(newTitle);
  };
  // const [closeModal, setCloseModal] = React.useState(false);

  const imgForCarousel = [
    { image: "/refugees/class.png" },
    { image: "/refugees/muzamel_k.jpg" },
    {
      image: "/refugees/sol_zubaida_diwa.jpg",
    },
  ];

  return (
    <>
      <Paper sx={{ paddingTop: 5 }} className={"height-of-screen"}>
        <Container>
          <Stack gap={3}>
            <Box>
              <MainCarousel inRefugeePage content={imgForCarousel} />
            </Box>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                onClick={() =>
                  handleClick(
                    RefugeeInfo.learnToCodeText,
                    RefugeeInfo.learnToCode
                  )
                }
              >
                {RefugeeInfo.learnToCode}
              </Button>
              <Button
                onClick={() =>
                  handleClick(
                    RefugeeInfo.hireRefugeeText,
                    RefugeeInfo.hireRefugee
                  )
                }
              >
                {RefugeeInfo.hireRefugee}
              </Button>
              <Button
                onClick={() =>
                  handleClick(
                    RefugeeInfo.partnerWithZomiaText,
                    RefugeeInfo.partnerWithZomia
                  )
                }
              >
                {RefugeeInfo.partnerWithZomia}
              </Button>
            </Stack>
            <Box>
              <CardList type={CardTypes.refugees} unclickable />
            </Box>
            <OurPartners />
          </Stack>
        </Container>
      </Paper>
      <GenericModal
        open={openModal}
        setOpenModal={setOpenModal}
        content={content}
        title={title}
      />
    </>
  );
};

export default RefugeesInTech;
