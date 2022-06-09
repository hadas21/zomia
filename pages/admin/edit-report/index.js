import { Box, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import AdminAppBar from "../../../components/admin/AdminAppBar";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import * as reportActions from "../../../store/actions/report-actions";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { useReportData } from "../../../store/hooks/useData";
import { connect, useDispatch } from "react-redux";

const Input = styled("input")({
    display: "none",
});
const EditReport = (props) => {
    const dispatch = useDispatch();
    const [report, setReport] = useState("");
    const [connectReport, setConnectReport] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            await props.fetchReports();
            setConnectReport(props.reports);
        };
        fetch();
    }, [props.fetchReports, props.report]);

    const reports = useReportData();

    const handleChange = (event) => {
        console.log(event.target.value);
    };

    const preserveLineBreak = (text) => {
        while (text.includes("\n")) {
            text = text.replace("\n", "\\n");
        }
        return text;
    };

    const [id, setId] = useState(report.id ?? "");
    const [title, setTitle] = useState(report.title ?? "");
    const [image, setImage] = useState(report.image ?? "");
    const [date, setDate] = useState(report.date ?? "");
    const [author, setAuthor] = useState(report.author ?? "");
    const [text, setText] = useState(report.text ?? "");
    const [description, setDescription] = useState(report.description ?? "");
    const [pdf, setPdf] = useState(report.pdfLink ?? "");
    const [uploading, setUploading] = useState(false);
    const [percent, setPercent] = useState(0);

    const handlePDFUpload = async (event) => {
        const metadata = {
            contentType: "application/pdf",
        };

        const storage = getStorage();
        const storageRef = ref(storage, `reports/${title}.pdf`);

        const uploadTask = uploadBytesResumable(
            storageRef,
            event.target.files[0],
            metadata
        );

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                setUploading(true);
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setPercent(progress);
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUploading(false);
                    setPdf(downloadURL);
                });
            }
        );
    };

    const handleImageUpload = async (event) => {
        const metadata = {
            contentType: "image/jpeg",
        };

        const storage = getStorage();
        const storageRef = ref(storage, `images/${title}.pdf`);

        const uploadTask = uploadBytesResumable(
            storageRef,
            event.target.files[0],
            metadata
        );

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                setUploading(true);
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setPercent(progress);
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUploading(false);
                    setImage(downloadURL);
                });
            }
        );
    };

    const updateReport = () => {
        dispatch(
            reportActions.updateReport({
                id: id,
                title: title,
                author: author,
                date: date,
                text: preserveLineBreak(text),
                description: preserveLineBreak(description),
                pdf: pdf,
                image: image,
            })
        );
    };

    const deleteReport = () => {
        dispatch(reportActions.deleteReport(id));
    };

    return (
        <Box sx={{ width: "80%", marginTop: 8, marginX: "10%" }}>
            <AdminAppBar />
            <Grid container direction={"column"} width={"90%"} marginX={"5%"}>
                <FormControl sx={{ minWidth: 100 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                        Select report
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={title}
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
                                            color: "white",
                                            padding: 5,
                                            paddingLeft: 20,
                                        }}
                                        key={id}
                                    >
                                        <MenuItem
                                            key={item.id}
                                            value={item.title}
                                            onClick={() => {
                                                setReport(item);
                                                setId(item.id);
                                                setTitle(item.title);
                                                setAuthor(item.author);
                                                setDate(item.date);
                                                setText(item.text);
                                                setDescription(
                                                    item.description
                                                );
                                                setPdf(item.pdfLink);
                                                setImage(item.image);
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
                            Edit Report
                        </Typography>

                        <TextField
                            id="outlined-multiline-static"
                            label="Title"
                            fullWidth
                            variant="outlined"
                            sx={{ backgroundColor: "#fafafa", marginBottom: 4 }}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <TextField
                            id="outlined-multiline-static"
                            label="Author(s)"
                            fullWidth
                            variant="outlined"
                            sx={{ backgroundColor: "#fafafa", marginBottom: 4 }}
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="Date"
                            fullWidth
                            variant="outlined"
                            sx={{ backgroundColor: "#fafafa", marginBottom: 4 }}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />

                        <TextField
                            id="outlined-multiline-static"
                            label="Text (to be shown in investigation page)"
                            multiline
                            fullWidth
                            minRows={15}
                            sx={{ backgroundColor: "#fafafa", marginBottom: 4 }}
                            variant="outlined"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="Description (to be shown on homepage)"
                            multiline
                            fullWidth
                            minRows={15}
                            sx={{ backgroundColor: "#fafafa", marginBottom: 4 }}
                            variant="outlined"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>
                    {uploading &&
                        percent > 0 &&
                        toast("Upload is " + percent + "% done")}

                    <Stack
                        direction="row"
                        alignItems="end"
                        spacing={2}
                        marginBottom={10}
                    >
                        <label htmlFor="contained-button-file">
                            <Input
                                accept=".pdf"
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={handlePDFUpload}
                            />
                            <Button variant="contained" component="span">
                                Upload PDF
                            </Button>
                        </label>

                        <label htmlFor="contained-image-file">
                            <Input
                                accept=".jpg,.jpeg,.png"
                                id="contained-image-file"
                                multiple
                                type="file"
                                onChange={handleImageUpload}
                            />
                            <Button variant="contained" component="span">
                                Upload Image
                            </Button>
                        </label>

                        <Button
                            onClick={updateReport}
                            variant="contained"
                            endIcon={<SendIcon />}
                        >
                            Save
                        </Button>

                        <Button onClick={deleteReport} variant="contained">
                            Delete Report
                        </Button>
                        <ToastContainer />
                    </Stack>
                </>
            </Grid>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        reports: state.reportStore.reports,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReports: () => dispatch(reportActions.fetchReports()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditReport);
