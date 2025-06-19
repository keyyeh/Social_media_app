function RegisterLayout() {
    return ( 
         <div className="tab-content">
            <div className="item-lable">
              <h2 className="item-title">Đăng ký</h2>
            </div>
            <div className="item-lable">
              <h5 className="item-content">Hãy nhập những thông tin của bạn</h5>
            </div>
            <form action="">
              <div className="item-input">
                <input
                  className="input-custom"
                  type="text"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="item-input">
                <input
                  className="input-custom"
                  type="text"
                  placeholder="Số điện thoại"
                  required
                />
              </div>
              <div className="item-input">
                <input
                  className="input-custom"
                  type="password"
                  placeholder="Mật khẩu"
                  required
                />
              </div>
              <div className="item-input">
                <input
                  className="input-custom"
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  required
                />
              </div>
              <button className="btn btn-primary">Đăng ký</button>
            </form>
          </div>
     );
}

export default RegisterLayout;