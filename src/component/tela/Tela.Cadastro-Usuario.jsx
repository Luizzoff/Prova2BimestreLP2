import { Alert } from "react-bootstrap";
import { useState } from "react";
import Pagina from "../layouts/Pagina";
import FormCadastroUsuario from "../form/Form.Cadastro-Usuario";
import TabelaUsuarios from "../tabela/Tabela.Usuarios"

export default function TelaCadastroUsuario() {
    const [exibirUsuarios, setExibirUsuarios] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [usuarioSelect, setUsuarioSelect] = useState({
        id: "",
        nickname: "",
        urlAvatar: "",
        dataIngresso: "",
        senha: ""
    });

    return (
        <Pagina>
            <Alert className="mt-4 mb-02 success text-center" variant="dark">
                <h2>
                    Cadastro de Usuário
                </h2>
            </Alert>
            {
                exibirUsuarios ?
                    <TabelaUsuarios
                        usuarioSelect={usuarioSelect}
                        setUsuarioSelect={setUsuarioSelect}
                        setExibirUsuarios={setExibirUsuarios}
                        setModoEdicao={setModoEdicao}
                    />
                    :
                    <FormCadastroUsuario
                        usuarioSelect={usuarioSelect}
                        setUsuarioSelect={setUsuarioSelect}
                        setExibirUsuarios={setExibirUsuarios}
                        setModoEdicao={setModoEdicao}
                        modoEdicao={modoEdicao}
                    />
            }
        </Pagina>
    );
}