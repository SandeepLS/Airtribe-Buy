import { useNavigate } from "react-router-dom";
import "./Login.css";
import icon from "../assets/rocket-solid.svg";

const Login = () => {
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    const payload = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const dummyPayload = {
      email: "airtribe@gmail.com",
      password: "test",
    };
    if (
      payload.email === dummyPayload.email &&
      payload.password === dummyPayload.password
    ) {
      localStorage.setItem("airtribe-user-auth", "authenticated");
      navigate("/products", {
        replace: true,
      });
    } else {
      alert("Invalid Credential");
    }
  };
  return (
    <div className="auth-section">
      <div className="auth-container-1">
        <img src={icon} alt="icon" className="login-logo" />
        <form onSubmit={submit}>
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              name="email"
              id=""
              placeholder="airtribe@gmail.com"
            />
          </label>
          <label htmlFor="password">
            <h4>Password</h4>
            <input type="password" name="password" id="" placeholder="test" />
            {/* { isSignup && <p style={{ color: "#666767", fontSize:"13px"}}>Passwords must contain at least eight<br />characters, including at least 1 letter and 1<br /> number.</p> } */}
          </label>
          <button type="submit" className="auth-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
