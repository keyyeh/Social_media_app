import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import Cookies from "js-cookie";

const { http } = api();

function LoginLayout() {
  const navi = useNavigate();
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const setFieldsValue = ({ target: { name, value } }) => {
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setError("");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await http.post("Auth/login", fields);

      localStorage.setItem("token", response.data.token);
      navi("/profile");
    } catch (err) {
      const message = err.response?.data?.message || "Đăng nhập thất bại";
      setError(message);
      console.error("Login failed:", err);
    }
  };

  //Kiểm tra đã tồn tại token của người đăng nhập chưa nếu đã nhập rồi thì không cần đăng nhập nữa
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navi("/profile");
    }
  });
  return (
    <>
      <div className="item-lable">
        <h2 className="item-title">Đăng nhập</h2>
      </div>
      <div className="item-lable">
        <h5 className="item-content">Cần đăng nhập để tiếp tục</h5>
      </div>
      <form onSubmit={handleLogin}>
        <div className="item-input">
          <input
            name="email"
            className="input-custom"
            type="text"
            placeholder="Email hoặc số điện thoại"
            value={fields.email}
            onChange={setFieldsValue}
            id="email"
            required
          />
        </div>
        <div className="item-input">
          <input
            name="password"
            className="input-custom"
            type="password"
            placeholder="Mật khẩu"
            value={fields.password}
            onChange={setFieldsValue}
            id="password"
            required
          />
        </div>
        <div className="item-link">
          <a href="/forgot-password">Quên mật khẩu?</a>
        </div>
        <button className="btn btn-primary">Đăng nhập</button>
      </form>
    </>
  );
}

export default LoginLayout;
