import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Nav className="justify-content-center w-100 gap-5">
                <Nav.Item>
                    <Nav.Link as={Link} to="/" className="text-center fs-5">
                        Menu
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/usuario" className="text-center fs-5">
                        Usuários
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/chat" className="text-center fs-5">
                        Bate-Papo
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar>
    );
}
