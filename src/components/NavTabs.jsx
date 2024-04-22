import * as React from "react";
import { Box, Tab, Tabs } from "@mui/material";

export default function NavTabs({ sortCreation, sortUpvotes }) {
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", height: "100%", bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        indicatorColor="secondary" // Color of the indicator can be "primary",
        // "secondary", or a custom color
        textColor="inherit" // You can also use "primary", "secondary", or "inherit"
      >
        <Tab label="HOT🔥" onClick={() => {
          sortUpvotes();
        }} />
        <Tab label="NEW" onClick={() => {
          sortCreation();
        }} />
        <Tab label="*RISING📈" />
        <Tab label="*Upvoted♥" />
      </Tabs>
    </Box>
  );
}
