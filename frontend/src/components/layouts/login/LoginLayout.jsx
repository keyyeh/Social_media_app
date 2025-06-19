function LoginLayout() {
    return ( 
         <div className="tab-content">
            <div className="item-lable">
              <h2 className="item-title">Đăng nhập</h2>
            </div>
            <div className="item-lable">
              <h5 className="item-content">Cần đăng nhập để tiếp tục</h5>
            </div>
            <form action="">
              <div className="item-input">
                <input
                  className="input-custom"
                  type="text"
                  placeholder="Email hoặc số điện thoại"
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
              <div className="item-link">
                <a href="">Quên mật khẩu?</a>
              </div>
              <button className="btn btn-primary">Đăng nhập</button>
            </form>
          </div>
     );
}

export default LoginLayout;