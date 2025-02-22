// dependancies
import { Card, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Signup() {
  return (
    <>
      <center>
        <div
          style={{
            paddingTop: 100,
            paddingBottom: 8,
          }}
        >
          <Typography variant="h7">
            Welcome to the course of AI by Faisal
          </Typography>
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
        <Button variant="contained">Signup</Button>
      </Card>
    </>
  );
}

export default Signup;
