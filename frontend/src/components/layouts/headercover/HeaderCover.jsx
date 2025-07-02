import "./HeaderCover.scss";
import avatar from "../../../assets/images/avatar.jpg";
import { useEffect, useState, useRef } from "react";
import api from "../../../services/api";
import ListItem from "../../common/ListItem";
import { useNavigate } from "react-router-dom";

const { http } = api();

function HeaderCover() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [uploadResult, setUploadResult] = useState(null);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const items = ["Bài viết", "Giới thiệu", "Bạn bè", "Ảnh"];

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Không tìm thấy token");
      const response = await http.get("user/detailuser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleIndex = (index) => {
    if (items[index] === "Giới thiệu") {
      navigate("/profile/about");
    } else if (items[index] === "Bài viết") {
      navigate("/profile");
    }
  };

  const handleImageClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleViewImage = () => {
    setDropdownOpen(false);
  };

  const handleChooseImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    setDropdownOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  // const upLoadImg = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", selectedImage);
  //     const response = http.post("user/upload-avatar", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     setUploadResult(response.data.path);
  //   } catch (error) {
  //     console.error("Tải lên thất bại:", error);
  //   }
  // };

  // useEffect(() => {
  //   if(!selectedImage) return;
  //   upLoadImg();
  // }, [selectedImage]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="header-cover header-img">
        <div className="container">
          {user && (
            <div className="header-profile" ref={dropdownRef}>
              <div className="navbar-brand">
                <img
                  src={selectedImage || user.avatar || avatar}
                  alt="ảnh"
                  className="rounded-pill"
                  style={{ width: 60, cursor: "pointer" }}
                  onClick={handleImageClick}
                />
                {dropdownOpen && (
                  <div className="avatar-dropdown-menu">
                    <button
                      className="dropdown-item"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={handleViewImage}
                    >
                      Xem ảnh đại diện
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={handleChooseImage}
                    >
                      Chọn ảnh đại diện
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
              <div className="header-name">
                <p>{user.name}</p>
              </div>
            </div>
          )}
          <div className="header-profile">
            <div className="statistical">
              <p>Bài viết: </p>
            </div>
            <div className="statistical">
              <p>Bình luận: </p>
            </div>
            <div className="statistical">
              <p>Số người xem hồ sơ: </p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "50px" }}>
        <ListItem items={items} setIndex={handleIndex} />
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Ảnh đại diện
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <img
                src={selectedImage || user?.avatar || avatar}
                alt="Avatar"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderCover;
