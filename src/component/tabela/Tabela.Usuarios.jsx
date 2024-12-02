import { Button, Image, Table } from "react-bootstrap";
import { useEffect } from "react";
import { consultarUsuarios, deletarUsuario, zerarMensagem } from "../../redux/redux.usuario";
import { useDispatch, useSelector } from "react-redux";
import ESTADO from "../../redux/redux.estado";
import { verificarSenha } from "../../service/service.usuario";

export default function TabelaUsuarios(props) {
    let { estado, mensagem, listaUsuarios } = useSelector((state) => state.usuarios);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(consultarUsuarios());
    }, [dispatch])

    useEffect(() => {
        if ((estado === ESTADO.OCIOSO || estado === ESTADO.ERRO) && mensagem) {
            window.alert(mensagem);
            dispatch(zerarMensagem());
        }
    }, [estado, mensagem, dispatch]);


    function atualizar(usuario) {
        if (window.confirm("Deseja realmente alterar o Usuario -> " + usuario.nickname)) {
            props.setUsuarioSelect(usuario);
            props.setModoEdicao(true);
            props.setExibirUsuarios(false);
        }
    }
    
    function deletar(usuario) {
        if (window.confirm("Deseja realmente excluir o Usuario -> " + usuario.nickname)) {
            const senha = window.prompt("Digite a Senha");
            if(senha){
                verificarSenha(usuario.nickname, senha)
                .then((resp)=>{
                    if(resp.status && resp.senhaCorreta){
                        dispatch(deletarUsuario(usuario, senha));
                    }
                    else{
                        window.alert("Senha Incorreta!");
                    }
                })
                .catch((erro)=>{
                    window.alert("Erro: " + erro);
                })
            }
            else{
                window.alert("Senha Vazia!");
            }
        }
    }

    return (
        <>
            <Button variant="primary" onClick={() => { props.setExibirUsuarios(false) }}>
                Adicionar
            </Button>
            <p className="mt-4"> Usuarios Cadastrados: {listaUsuarios?.length || 0}</p>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nickname</th>
                        <th>Avatar</th>
                        <th>Data Ingresso</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {listaUsuarios?.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nickname}</td>
                                <td>
                                    <Image
                                        style={{ width: "100px" }}
                                        src={item.urlAvatar}
                                        thumbnail
                                        alt="avatar"
                                    /></td>
                                <td>{item.dataIngresso}</td>
                                <td style={{ whiteSpace: 'nowrap', width: '1%' }}>
                                    <Button onClick={() => { atualizar(item); }} variant="warning" style={{ marginRight: '1em' }}>
                                       Alterar
                                    </Button>
                                    <Button onClick={() => { deletar(item); }} variant="danger">
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}