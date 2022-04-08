import React, { useState } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Tabs = (props) => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { border } = props;

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <Box
            justifyContent="space-between"
            display="flex"
            height={54}
            alignItems={"center"}
            sx={{
                cursor: "pointer",
                borderTop: border && "1px solid #2c253c",
            }}
        >
            <Link href="/">
                <Typography variant="h6" color="text.secondary">
                    Home
                </Typography>
            </Link>
            <Link href="/analysis">
                <Typography variant="h6" color="text.secondary">
                    Analysis
                </Typography>
            </Link>

            <Link href="/projects">
                <Typography variant="h6" color="text.secondary">
                    Projects
                </Typography>
            </Link>

            <Link href="/investigations">
                <Typography variant="h6" color="text.secondary">
                    Investigations
                </Typography>
            </Link>

            <Box sx={{ flexGrow: 0 }}>
                <Box onClick={handleOpenUserMenu}>
                    <Typography variant="h6" color="text.secondary">
                        About
                    </Typography>
                </Box>
                <Menu
                    sx={{ mt: "30px", ml: "30px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Box>
                            <Link href="/mission">
                                <Typography variant="h6" color="text.primary">
                                    Mission
                                </Typography>
                            </Link>

                            <Link href="/bio">
                                <Typography variant="h6" color="text.primary">
                                    Bio
                                </Typography>
                            </Link>
                        </Box>
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
};

export default Tabs;