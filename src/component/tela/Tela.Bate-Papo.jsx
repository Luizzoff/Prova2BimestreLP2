import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, ListGroup, Image } from 'react-bootstrap';
import Pagina from "../layouts/Pagina"
import { useDispatch, useSelector } from 'react-redux';
import ESTADO from '../../redux/redux.estado';
import { consultarChats, deletarChat, gravarChat, zerarMensagem } from '../../redux/redux.chat';
import { parse, differenceInMinutes } from 'date-fns';
import { ContextoUsuario } from '../../App';
import TelaLogin from '../tela/TelaLogin'

export default function TelaBatePapo() {
    const { user } = useContext(ContextoUsuario);

    let { estado, mensagem, listaChats } = useSelector((state) => state.chats);
    const dispatch = useDispatch();
    const [formValidado, setFormValidado] = useState(false);

    const [recadoReseta] = useState({
        usuario: {
            id: ""
        },
        mensagem: ""
    });
    const [recado, setRecado] = useState(recadoReseta);

    useEffect(() => {
        dispatch(consultarChats());
    }, [dispatch])

    useEffect(() => {
        if (estado === ESTADO.OCIOSO && mensagem) {
            window.alert(mensagem);
            dispatch(consultarChats());
            dispatch(zerarMensagem());
            setRecado(recadoReseta);
        }
        else if (estado === ESTADO.ERRO && mensagem) {
            window.alert(mensagem);
            dispatch(zerarMensagem());
        }
    }, [estado, mensagem, recadoReseta, dispatch]);

    function deletar(chat) {
        dispatch(deletarChat(chat));
    }

    function calcularTempo(dataHora) {
        if (dataHora) {
            const dataInformada = parse(dataHora, 'dd/MM/yyyy, HH:mm:ss', new Date());
            const dataAtual = new Date();
            dataAtual.setHours(dataAtual.getHours() + 3);
            console.log(dataAtual);
            console.log(dataInformada);

            const diferenca = differenceInMinutes(dataAtual, dataInformada);
            return diferenca < 10;
        }
        return false;
    }

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            setFormValidado(false);
            dispatch(gravarChat(recado));
        }
        else
            setFormValidado(true);
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setRecado({
            ...recado,
            [elemento]: valor,
            usuario: {
                id: user.id
            }
        });
        console.log(recado);
    }

    return (
        <Pagina>
            {
                !user.logado ? (
                    <TelaLogin />
                ) : (
                    <Form className="mt-4" noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                        <span>{"Usuario Logado: " + user.nickname + " | " + user.id}</span>
                        <Form.Group className="mt-3">
                            <Form.Label>Mensagem:</Form.Label>
                            <Form.Control
                                required
                                id="mensagem"
                                name="mensagem"
                                rows={3}
                                value={recado.mensagem}
                                onChange={manipularMudanca}
                                placeholder="Digite sua Mensagem"
                                type='text'
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, informe uma mensagem!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="success" onClick={manipularSubmissao} className="mt-2">
                            Enviar
                        </Button>


                        <div className="mt-5">
                            <ListGroup>
                                {listaChats?.map((item) => (
                                    <ListGroup.Item key={item?.id} className="d-flex align-items-center">
                                        <div className="flex-grow-1">
                                            <Image
                                                style={{ width: "100px" }}
                                                src={item?.usuario.urlAvatar}
                                                thumbnail
                                                alt="avatar"
                                                className="me-3"
                                            />
                                            <strong>{item?.usuario.nickname}</strong>: {item?.mensagem} <br />
                                            <small>postado em: {item?.dataHora}</small>
                                        </div>
                                        {
                                            user.logado && item?.usuario.id === user.id && (
                                                calcularTempo(item?.dataHora) && (
                                                    <Button onClick={() => { deletar(item) }} variant="danger" type="button" className="ms-auto">
                                                        Excluir
                                                    </Button>
                                                )
                                            )
                                        }
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    </Form >

                )
            }
        </Pagina >
    );
}
