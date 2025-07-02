import { useState } from "react";
import api from "../../../services/api";

const { http } = api();

function RegisterLayout({ onMessageChange }) {
  const [fields, setFields] = useState({
    Phone: "",
    Email: "",
    Password: "",
    Role: "user",
  });
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setFieldsValue = ({ target: { name, value } }) => {
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!name.trim()) return "Tên không được để trống";
    if (!fields.Email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      return "Email không hợp lệ";
    }
    if (!fields.Phone.match(/^\d{10,11}$/)) {
      return "Số điện thoại phải có 10-11 chữ số";
    }
    if (fields.Password.length < 6) {
      return "Mật khẩu phải có ít nhất 6 ký tự";
    }
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const error = validateForm();
    if (error) {
      onMessageChange(error, "danger");
      setIsSubmitting(false);
      return;
    }

    try {
      // Gửi dữ liệu đúng định dạng cho API
      await http.post("auth/registration", {
        account: fields,
        name,
      });
      onMessageChange("Đăng ký thành công", "success");
      // Reset form sau khi đăng ký thành công
      setFields({ Phone: "", Email: "", Password: "", Role: "user" });
      setName("");
    } catch (error) {
      const errMess =
        error.response?.data?.message ||
        "Đăng ký thất bại: Email hoặc số điện thoại đã tồn tại";
      onMessageChange(errMess, "danger");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <div className="item-label">
        <h2 className="item-title">Đăng ký</h2>
      </div>
      <div className="item-label">
        <h5 className="item-content">Hãy nhập thông tin của bạn</h5>
      </div>
      <form onSubmit={handleRegister}>
        <div className="item-input">
          <input
            name="Name"
            className="input-custom"
            type="text"
            placeholder="Tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="item-input">
          <input
            name="Email"
            className="input-custom"
            type="email"
            placeholder="Email"
            value={fields.Email}
            onChange={setFieldsValue}
            required
          />
        </div>
        <div className="item-input">
          <input
            name="Phone"
            className="input-custom"
            type="text"
            placeholder="Số điện thoại"
            value={fields.Phone}
            onChange={setFieldsValue}
            required
          />
        </div>
        <div className="item-input">
          <input
            name="Password"
            className="input-custom"
            type="password"
            placeholder="Mật khẩu"
            value={fields.Password}
            onChange={setFieldsValue}
            required
          />
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
        </button>
      </form>
    </div>
  );
}

export default RegisterLayout;