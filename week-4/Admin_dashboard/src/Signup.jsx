// dependancies
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Signup() {
  return (
    <>
      <center>
        <div
          style={{
            marginTop: 190,
            marginBottom: 8,
          }}
        >
          Welcome to the course of AI by Faisal
        </div>
      </center>
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          border: "2px solid black",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          width: "400px",
          padding: "25px",
        }}
      >
        <TextField
          fullWidth={true}
          id="standard-basic"
          label="Email"
          variant="standard"
        />
        <br />
        <TextField
          fullWidth={true}
          id="standard-basic"
          label="Password"
          variant="standard"
        />
        <Button variant="contained">Signup</Button>
      </div>
    </>
  );
}

export default Signup;
