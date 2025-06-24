import { useState, useEffect } from "react";
import api from "../../../services/api";
import Alert from "../../common/Alert";

const { http } = api();

function LoginLayout() {
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

  const handleCloseAlert = () => {
    setError("");
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
      const response = await http.post("auth/login", fields); // Sửa resporse thành response
      console.log(response.data);
      alert("Đăng nhập thành công!");
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
      <Alert message={error} type="danger" onClose={handleCloseAlert} />
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