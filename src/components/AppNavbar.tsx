import { Navbar, Nav } from "rsuite";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const AppNavbar = ({ ...props }) => {
  const location = useLocation();
  let navigate = useNavigate();
  const [activeKey, onSelect] = useState(() => location.pathname);
  const types = useSelector((state: RootState) => state.types);

  return (
    <Navbar {...props}>
      <Navbar.Brand>OBJECTOR</Navbar.Brand>
      <Nav
        onSelect={(key) => {
          onSelect(key);
          navigate(`/${key}`);
        }}
        activeKey={activeKey}
      >
        <Nav.Item eventKey="all">All</Nav.Item>
        {types.map((item) => {
          return <Nav.Item eventKey={`type/${item.id}`}>{item.title}</Nav.Item>;
        })}
        <Nav.Item eventKey="types">Manage types</Nav.Item>
      </Nav>
    </Navbar>
  );
};
