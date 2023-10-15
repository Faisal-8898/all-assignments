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
          onClick={() => {
            window.location = "/login";
          }}
          style={{
            marginRight: "7px",
          }}
          type="button"
        >
          Sign in
        </Button>
        <Button
          variant="contained"
          type="button"
          onClick={() => {
            window.location = "/signup";
          }}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
}

export default Appbar;
