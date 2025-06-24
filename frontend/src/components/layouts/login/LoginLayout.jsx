import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

const { http } = api();

function LoginLayout() {
  const navi = useNavigate();
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // Thêm trạng thái lỗi

  const setFieldsValue = ({ target: { name, value } }) => {
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Xóa lỗi cũ

    // Xác thực cơ bản
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail(fields.email)) {
      setError("Email không hợp lệ");
      return;
    }
    if (!fields.password) {
      setError("Mật khẩu không được để trống");
      return;
    }

    try {
      const response = await http.post("Auth/login", fields); // Sửa resporse thành response

      localStorage.setItem('token', response.data.token);
      navi('/profile')
    } catch (err) {
      const message = err.response?.data?.message || "Đăng nhập thất bại";
      setError(message);
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="tab-content">
      <div className="item-lable">
        <h2 className="item-title">Đăng nhập</h2>
      </div>
      <div className="item-lable">
        <h5 className="item-content">Cần đăng nhập để tiếp tục</h5>
      </div>
      {error && <div className="error-message" style={{ color: "red" }}>{error}</div>} {/* Hiển thị lỗi */}
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
          <a href="/forgot-password">Quên mật khẩu?</a> {/* Cập nhật href */}
        </div>
        <button className="btn btn-primary">Đăng nhập</button>
      </form>
    </div>
  );
}

export default LoginLayout;