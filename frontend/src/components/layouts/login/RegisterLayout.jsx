import { useState } from "react";
import api from "../../../services/api";

const { http } = api();
function RegisterLayout({onMessageChange}) {
  const [fields, setFields] = useState({
    Phone: "",
    Email: "",
    Password: "",
    Role: "user",
  });

  const setFieldsValue = ({ target: { name, value } }) => {
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await http.post("auth/registration", fields);
      onMessageChange("Đăng ký thành công", 'success');
    } catch {
      const errMess = `Đăng ký thất bại: Email hoặc số điện thoại đã đăng ký`;
      onMessageChange(errMess, 'danger')
    }
  };
  return (
    <>
       <div className="item-lable">
        <h2 className="item-title">Đăng ký</h2>
      </div>
      <div className="item-lable">
        <h5 className="item-content">Hãy nhập những thông tin của bạn</h5>
      </div>
      <form onSubmit={handleRegister}>
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
        <button className="btn btn-primary">Đăng ký</button>
      </form>
    </>
   
  );
}

export default RegisterLayout;
