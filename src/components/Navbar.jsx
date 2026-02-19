import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Stack,
  Button,
  Divider,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Category", to: "/category" },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const desktopBtnSx = ({ isActive }) => ({
    textTransform: "none",
    fontWeight: 800,
    borderRadius: 999,
    px: 2,
    py: 1,
    backgroundColor: isActive ? "primary.main" : "#EFECE7",
    color: isActive ? "#fff" : "#111827",
    boxShadow: isActive ? "0 10px 20px rgba(240,90,40,0.22)" : "none",
    "&:hover": {
      backgroundColor: isActive ? "primary.main" : "rgba(0,0,0,0.06)",
    },
  });

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "rgba(248,246,244,0.85)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Container maxWidth="md">
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              {/* Brand */}
              <Stack direction="row" spacing={1.2} alignItems="center">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 3,
                    backgroundColor: "primary.main",
                    display: "grid",
                    placeItems: "center",
                    color: "white",
                    boxShadow: "0 8px 20px rgba(240, 90, 40, 0.25)",
                  }}
                >
                  <CalendarMonthRoundedIcon fontSize="small" />
                </Box>

                <Typography sx={{ fontWeight: 900, letterSpacing: -0.4, color:"black"}}>
                  WeekBoard
                </Typography>
              </Stack>

              {/* Desktop links */}
              <Stack
                direction="row"
                spacing={1}
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                {navItems.map((item) => (
                  <Button
                    key={item.to}
                    component={NavLink}
                    to={item.to}
                    sx={desktopBtnSx}
                  >
                    {item.label}
                  </Button>
                ))}
              </Stack>

              {/* Mobile hamburger */}
              <IconButton
                onClick={() => setOpen(true)}
                sx={{ display: { xs: "inline-flex", sm: "none" } }}
              >
                <MenuRoundedIcon />
              </IconButton>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 280, p: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography sx={{ fontWeight: 900 }}>Menu</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <List sx={{ p: 0 }}>
            {navItems.map((item) => (
              <ListItemButton
                key={item.to}
                component={NavLink}
                to={item.to}
                onClick={() => setOpen(false)}
                sx={{
                  borderRadius: 3,
                  mb: 1,
                  "&.active": {
                    backgroundColor: "rgba(240,90,40,0.12)",
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontWeight: 800 }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
