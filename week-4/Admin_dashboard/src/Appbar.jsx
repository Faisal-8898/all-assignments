import { Button, Typography } from "@mui/material";

function Appbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
      }}
    >
      <div>
        <Typography variant="h5">Coursera</Typography>
      </div>
      <div>
        <Button
          variant="contained"
          style={{
            marginRight: "7px",
          }}
        >
          Sign in
        </Button>
        <Button variant="contained">Sign up</Button>
      </div>
    </div>
  );
}

export default Appbar;
