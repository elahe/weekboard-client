

import {
  Box,
  Container,
  Typography,
  Stack,
  Paper,
  Divider,
  Chip,
} from "@mui/material";

export default function CategoryPage({ allTasks, allCategory }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        py: 8, // more vertical breathing
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={6}>
          {allCategory.map((eachCategory) => {
            const tasksInCategory = allTasks.filter(
              (task) => task.categoryId === eachCategory.id
            );

            return (
              <Paper
                key={eachCategory.id}
                elevation={0}
                sx={{
                  borderRadius: 6, // softer corners
                  backgroundColor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  overflow: "hidden",
                  boxShadow: "0 18px 40px rgba(17, 24, 39, 0.08)",
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    px: 4,
                    py: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: 22,
                    }}
                  >
                    {eachCategory.title}
                  </Typography>

                  <Chip
                    label={`${tasksInCategory.length} task${
                      tasksInCategory.length === 1 ? "" : "s"
                    }`}
                    sx={{
                      height: 30,
                      borderRadius: 999,
                      fontWeight: 800,
                      backgroundColor: "#EFECE7",
                      px: 1,
                    }}
                  />
                </Box>

                <Divider />

                {/* Tasks */}
                <Stack spacing={3} sx={{ px: 4, py: 4 }}>
                  {tasksInCategory.length === 0 ? (
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                      No tasks in this category.
                    </Typography>
                  ) : (
                    tasksInCategory.map((eachTask) => (
                      <Paper
                        key={eachTask.id}
                        elevation={0}
                        sx={{
                          p: 3.5, // more internal padding
                          borderRadius: 6,
                          backgroundColor: "#EFECE7",
                          transition: "0.2s ease",
                          "&:hover": {
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <Stack spacing={1.2}>
                          <Typography
                            sx={{
                              fontWeight: 900,
                              fontSize: 18,
                              textDecoration: eachTask.isDone
                                ? "line-through"
                                : "none",
                              opacity: eachTask.isDone ? 0.55 : 1,
                            }}
                          >
                            {eachTask.title}
                          </Typography>

                          {eachTask.description && (
                            <Typography
                              sx={{
                                opacity: 0.75,
                                fontSize: 15,
                              }}
                            >
                              {eachTask.description}
                            </Typography>
                          )}

                          <Stack
                            direction="row"
                            spacing={1.5}
                            sx={{ pt: 1 }}
                          >
                            <Chip
                              label={
                                eachTask.isUrgent ? "Urgent" : "Not urgent"
                              }
                              sx={{
                                height: 28,
                                fontWeight: 800,
                                borderRadius: 999,
                                backgroundColor: eachTask.isUrgent
                                  ? "rgba(239,68,68,0.15)"
                                  : "rgba(16,185,129,0.15)",
                                color: eachTask.isUrgent
                                  ? "#EF4444"
                                  : "#10B981",
                              }}
                            />

                            {eachTask.dueDate && (
                              <Chip
                                label={new Date(
                                  eachTask.dueDate
                                ).toLocaleDateString()}
                                sx={{
                                  height: 28,
                                  fontWeight: 800,
                                  borderRadius: 999,
                                  backgroundColor: "rgba(0,0,0,0.06)",
                                }}
                              />
                            )}
                          </Stack>
                        </Stack>
                      </Paper>
                    ))
                  )}
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}
// import React from 'react'

// export default function CategoryPage({allTasks,allCategory}) {
//     console.log(allCategory,allTasks)
//   return (
//     <div>
//         {allCategory.map((eachCategory)=>{
//             return(<div>
//                 <h2>{eachCategory.title}</h2>
//                 <ul>
//                        {allTasks.filter(task => task.categoryId === eachCategory.id)
//                        .map((eachTask)=>{
//                          return(
//                             <li>
//                                 <h3>{eachTask.title}</h3>
//                                 <p>{eachTask.description}</p>

//                             </li>
//                          )
//                        })
//                        }
//                 </ul>
//             </div>)
//         })}
//     </div>
//   )
// }