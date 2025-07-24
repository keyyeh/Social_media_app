import { useEffect, useState } from "react";
import "./Profile.scss";
import FormInput from "../../common/FormInput";
import api from "../../../services/api";
import Alert from "../../common/Alert";

const { http } = api();

function ListItem({ items, activeIndex, onItemClick }) {
  return (
    <ul className="list-group">
      {items.map((item, index) => (
        <li
          key={index}
          tabIndex={0}
          className={`list-group-item list-group-item-action ${
            activeIndex === index ? "active" : ""
          }`}
          onClick={() => onItemClick(index)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onItemClick(index);
            }
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function PersonalInfoForm({ userData, handleInputChange }) {
  return (
    <form>
      <FormInput
        label="Name"
        name="name"
        value={userData.name}
        onChange={handleInputChange}
      />
      <FormInput
        label="Email"
        name="email"
        type="email"
        value={userData.email}
        onChange={handleInputChange}
      />
      <FormInput
        label="Phone Number"
        name="phoneNumber"
        value={userData.phone || ""}
        onChange={handleInputChange}
      />
      <FormInput
        label="Address"
        name="address"
        value={userData.address || ""}
        onChange={handleInputChange}
      />
    </form>
  );
}

function EducationForm({ userData, handleInputChange }) {
  return (
    <form>
      <FormInput
        label="Job"
        name="job"
        value={userData.job || ""}
        onChange={handleInputChange}
      />
      <FormInput
        label="Education"
        name="education"
        value={userData.education || ""}
        onChange={handleInputChange}
      />
    </form>
  );
}

function About() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    job: "",
    education: "",
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [message, setMessage] = useState("");
  const items = ["Thông tin bản thân", "Học vấn"];

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await http.get("user/detailuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
     e.preventDefault();

     try{
      await http.put("user/UpdateUser", userData);
      setMessage("Cập nhật thành công");
     }
     catch{
      setMessage("Cập nhật thất bại");
     }
    
  };

  const handleClose = () => {
    setMessage('');
  }
  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        handleClose();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [message]);
  
  const renderContent = () => {
    switch (activeIndex) {
      case 0:
        return (
          <PersonalInfoForm
            userData={userData}
            handleInputChange={handleInputChange}
          />
        );
      case 1:
        return (
          <EducationForm
            userData={userData}
            handleInputChange={handleInputChange}
          />
        );
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="d-flex">
      <div className="w-25">
        <ListItem
          items={items}
          activeIndex={activeIndex}
          onItemClick={setActiveIndex}
        />
      </div>
      <div className="flex-grow-1">
        <div className="card">
          <div className="card-body">
            <Alert message={message} type="success" onClose={handleClose} />
            {renderContent()}
          </div>
          <div className="card-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;