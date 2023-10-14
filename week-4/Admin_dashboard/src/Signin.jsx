// dependancies
import { Card, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Signin() {
  return (
    <>
      <center>
        <div
          style={{
            paddingTop: 100,
            paddingBottom: 8,
          }}
        >
          <Typography variant="h7">Welcome back! Sign in below </Typography>
        </div>
      </center>
      <Card
        variant="outlined"
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          padding: "25px",
        }}
      >
        <TextField
          fullWidth={true}
          id="standard-basic"
          label="Email"
          variant="outlined"
        />
        <br />
        <br />
        <TextField
          fullWidth={true}
          id="standard-basic"
          label="Password"
          variant="outlined"
        />
        <br /> <br />
        <Button variant="contained">login</Button>
      </Card>
    </>
  );
}

export default Signin;
