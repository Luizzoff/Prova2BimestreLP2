import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tela404 from "./component/tela/Tela.404";
import TelaHome from "./component/tela/Tela.Home"
import TelaBatePapo from "./component/tela/Tela.Bate-Papo"
import TelaCadastroUsuario from "./component/tela/Tela.Cadastro-Usuario";
import { useState, createContext } from "react";
export const ContextoUsuario = createContext();

function App() {
    const [user, setUser] = useState({
        id: "",
        nickname: "",
        logado: false,
    });

    return (
        <>
            <ContextoUsuario.Provider value={{ user, setUser }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<TelaHome />} />
                        <Route path="/usuario" element={<TelaCadastroUsuario />} />
                        <Route path="/chat" element={<TelaBatePapo />} />
                        <Route path="/Prova2BimestreLP2" element={<TelaHome />} />
                        <Route path="*" element={<Tela404 />} />
                    </Routes>
                </BrowserRouter>
            </ContextoUsuario.Provider>
        </>
    );
}

export default App;
