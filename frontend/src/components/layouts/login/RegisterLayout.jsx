import { useState } from "react";
import api from "../../../services/api";
import { Value } from "sass";

const {http} = api();
function RegisterLayout() {
    const[fields, setFields] = useState({
      Phone: '',
      Email: '',
      Password: '',
      Role: 'user'
    })

    const setFieldsValue = ({target: {name, value}}) => {
      setFields(prev => ({
        ...prev,
        [name]: value,
      }));
    }
    const handleRegister = async e => {
      e.preventDefault();
      try{
        const response = await http.post('auth/registration',fields);
        console.log(response.data);
      }
      catch{

      }
    }
    return ( 
         <div className="tab-content">
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
                  type="text"
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
              {/* <div className="item-input">
                <input
                  className="input-custom"
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  required
                />
              </div> */}
              <button className="btn btn-primary">Đăng ký</button>
            </form>
          </div>
     );
}

export default RegisterLayout;