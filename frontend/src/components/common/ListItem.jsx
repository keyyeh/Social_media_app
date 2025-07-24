import { useState } from "react";

function ListItem({ items, setIndex}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (index) => {
    setActiveIndex(index);
    setIndex(index);
  };
  return (
    <ul className="custom-nav">
      {items.map((item, index) => (
        <li
          key={index}
          tabIndex={0}
          className={`nav-item ${activeIndex === index ? "active" : ""}`}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleClick(index);
            }
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default ListItem;
