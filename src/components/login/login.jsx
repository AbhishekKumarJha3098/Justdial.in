import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Spinner from "react-spinner-material";

export const SignIn_page = () => {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function checkLogin() {
    setLoading(true);
    let mailCheck = false;
    let passCheck = false;
    // console.log("clicked");
    const res = await axios.get(
      "https://still-badlands-85906.herokuapp.com/users"
    );
    const data = res.data;
    // console.log(data);
    data.map((e) => {
      if (e.email === email && e.password === pass) {
        mailCheck = true;
        passCheck = true;
      } else if (e.email === email && e.password !== pass) {
        mailCheck = true;
        passCheck = false;
      } else {
        mailCheck = false;
        passCheck = false;
      }
    });

    if (mailCheck === true && passCheck === true) {
      setLoading(false);
      alert("Login Success");
      navigate("/");
      //navigate to home
    } else if (mailCheck === true && passCheck === false) {
      alert("Wrong Password");
    } else {
      alert("User does not exist");
    }
    setLoading(false);
  }
  return loading ? (
    <div className="loader">
      <Spinner
        size={120}
        spinnerColor={"#333"}
        spinnerWidth={2}
        visible={true}
      />
    </div>
  ) : (
    <>
      <div className="Nav">
        <div>
          <img
            src="https://www.pinclipart.com/picdir/big/102-1028215_png-file-back-button-icon-png-clipart.png"
            id="back-image"
            alt=""
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <img
            src="data:image/png;base64,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"
            id="icon-image"
            alt=""
          />
        </div>
        {/* Empty div for CSS flex*/}
        <div></div>
      </div>
      <div className="Sign-in-box">
        <h2>Sign in</h2>
        <input
          type="text"
          placeholder="Email address"
          className="Input-boxes"
          onChange={(e) => {
            setEmail(e.target.value);
            // console.log(email);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="Input-boxes"
          onChange={(e) => {
            setPass(e.target.value);
            // console.log(pass);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              checkLogin();
            }
          }}
        />
        <div>
          <input type="radio" value="true" id="radio-sign" />
          <label for="radio-sign"> Keep me signed in</label>
        </div>
        <p>
          By signing in, I agree to the JustDial Terms and Contitions and Privacy
          Statement
        </p>
        <button id="Sign-in-button" onClick={checkLogin}>
          {" "}
          Sign in
        </button>

        <p>Forgot password ?</p>
        <p>
          Don't have an account?
          <Link to="/register">Create one</Link>
        </p>

        <p>or continue with</p>
        <div className="Continue-with">
          <img src="https://a.travel-assets.com/egds/marks/apple.svg" alt="" />
          <img
            src="https://a.travel-assets.com/egds/marks/facebook.svg"
            alt=""
          />
          <img src="https://a.travel-assets.com/egds/marks/google.svg" alt="" />
        </div>
        <hr />
      </div>
    </>
  );
};
