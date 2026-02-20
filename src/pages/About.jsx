import React from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Stack,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function About() {
  // OPTION A: local image (recommended)
  // 1) Put your image in src/assets/me.jpg
  // 2) Uncomment the next line:
  // import me from "../assets/me.jpg";
  // then set avatar src={me}

  // OPTION B: use a URL
  const photoUrl = "";

  const linkedinUrl = "https://www.linkedin.com/in/elahehashemi/"; 

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", py: 8 }}>
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            borderRadius: 6,
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.paper",
            boxShadow: "0 18px 40px rgba(17, 24, 39, 0.08)",
            p: { xs: 3, sm: 5 },
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -0.6 }}>
              About Us
            </Typography>

            <Divider />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              alignItems={{ xs: "flex-start", sm: "center" }}
            >
              <Avatar
                src={photoUrl}
                alt="Profile photo"
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: 6,
                  boxShadow: "0 12px 30px rgba(17, 24, 39, 0.12)",
                }}
              />

              <Box>
                <Typography sx={{ fontWeight: 900, fontSize: 18 }}>
                  Elahe Hashemi
                </Typography>
                <Typography sx={{ opacity: 0.75, mt: 0.5 }}>
                  Front-End Developer • React • Week planner project
                </Typography>

                <Button
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="contained"
                  startIcon={<LinkedInIcon />}
                  sx={{
                    mt: 2,
                    borderRadius: 999,
                    textTransform: "none",
                    fontWeight: 900,
                    px: 2.5,
                    py: 1.1,
                  }}
                >
                  LinkedIn
                </Button>
              </Box>
            </Stack>

            <Typography sx={{ opacity: 0.85, lineHeight: 1.8 }}>
              WeekBoard is a weekly planner app built to organize tasks by day and
              category. The goal is to keep planning simple, clear, and visually clean.
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
