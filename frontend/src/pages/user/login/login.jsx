import styles from "./login.module.scss";

function Login() {
  return (
    <div className={styles.login_page_wrap}>
      <div className={styles.content_wrap}>
        <div className={styles.login_content}>
          <div className={styles.login_form_wrap}>
            <ul className={[styles.nav, styles.nav_tabs].join(" ")} role="tablist">
              <li className={styles.nav_item}>
                <a className={[styles.nav_link, styles.active].join(" ")} href="#">
                  <i className="icofont-users-alt-4" style={{ fontSize: "22px" }}></i>
                  Đăng nhập
                </a>
              </li>
              <li className={styles.nav_item}>
                <a className={styles.nav_link} href="#">
                  <i className="icofont-user-alt-3" style={{ fontSize: "22px" }}></i>
                  Đăng ký
                </a>
              </li>
            </ul>
            <div className={styles.tab_content}>
              <div className={styles.tab_pane}>
                <h2 className={styles.item_title}>Đăng nhập</h2>
                <div className={styles.item_underline}></div>
                <h5 style={{ fontWeight: 500, margin: "16px 0 20px 0" }}>Cần đăng nhập để tiếp tục</h5>
                <form className={styles.modal_form}>
                  <div className={styles.login_form_body}>
                    <div className={styles.form_group}>
                      <input
                        className={styles.form_control}
                        type="text"
                        placeholder="Email hoặc số điện thoại"
                        required
                      />
                    </div>
                    <div className={styles.form_group}>
                      <input
                        className={styles.form_control}
                        type="password"
                        placeholder="Mật khẩu"
                        required
                      />
                    </div>
                    <div className={styles.form_group}>
                      <a href="#" className={styles.form_link_control}>Quên mật khẩu</a>
                    </div>
                    <div className={styles.form_group}>
                      <button className={styles.login_button} type="submit">Đăng nhập</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;