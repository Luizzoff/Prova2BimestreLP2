import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { consultar, deletar, gravar, atualizar } from "../service/service.usuario";
import ESTADO from "./redux.estado";

export const consultarUsuarios = createAsyncThunk('consultarUsuarios', async (nome) => {
    try {
        const resposta = await consultar(nome);
        if (Array.isArray(resposta.listaUsuarios)) {
            return {
                status: true,
                listaUsuarios: resposta.listaUsuarios
            };
        } else {
            return {
                status: false,
                mensagem: resposta.mensagem || "Erro ao consultar usuários."
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro?.mensagem || "Erro inesperado ao consultar usuários."
        };
    }
});
export const gravarUsuario = createAsyncThunk('gravarUsuario', async (usuario) => {
    try {
        const resposta = await gravar(usuario);
        if (resposta.status) {
            usuario.id = resposta.id;
            return {
                status: true,
                mensagem: resposta.mensagem || "Usuário gravado com sucesso!",
                usuario
            };
        } else {
            return {
                status: false,
                mensagem: resposta.mensagem || "Erro ao gravar o usuário."
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro?.mensagem || "Erro inesperado ao gravar o usuário."
        };
    }
});
export const deletarUsuario = createAsyncThunk('deletarUsuario', async (usuario, senha) => {
    try {
        const resposta = await deletar(usuario, senha);
        if (resposta.status) {
            return {
                status: true,
                mensagem: resposta.mensagem,
                usuario
            };
        } else {
            return {
                status: false,
                mensagem: resposta.mensagem || "Erro ao deletar o usuário."
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro?.mensagem || "Erro inesperado ao deletar o usuário."
        };
    }
});
export const atualizarUsuario = createAsyncThunk('atualizarUsuario', async (usuario) => {
    try {
        const resposta = await atualizar(usuario);
        if (resposta.status) {
            return {
                status: true,
                mensagem: resposta.mensagem || "Usuário atualizado com sucesso!",
                usuario
            };
        } else {
            return {
                status: false,
                mensagem: resposta.mensagem || "Erro ao atualizar o usuário."
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro?.mensagem || "Erro inesperado ao atualizar o usuário."
        };
    }
});

const usuarioReducer = createSlice({
    name: 'usuario',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaUsuarios: []
    },
    reducers: {
        zerarMensagem: (state) => {
            state.mensagem = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(consultarUsuarios.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição...";
            })
            .addCase(consultarUsuarios.fulfilled, (state, action) => {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = "";
                state.listaUsuarios = action.payload.listaUsuarios;
            })
            .addCase(consultarUsuarios.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action?.payload?.mensagem || "Erro ao consultar usuários.";
            })
            
            
            
            .addCase(gravarUsuario.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição...";
            })
            .addCase(gravarUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem || "Usuário gravado com sucesso!";
                    if (action.payload.usuario) {
                        state.listaUsuarios.push(action.payload.usuario);
                    }
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem || "Erro ao gravar o usuário.";
                }
            })
            .addCase(gravarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action?.payload?.mensagem || "Erro ao gravar o usuário.";
            })
            
            
            
            .addCase(deletarUsuario.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Deletando usuário...";
            })
            .addCase(deletarUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaUsuarios = state.listaUsuarios.filter(u => u.id !== action.payload.usuario.id);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(deletarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action?.payload?.mensagem || "Erro ao deletar usuário.";
            })
            
            
            
            .addCase(atualizarUsuario.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Atualizando usuário...";
            })
            .addCase(atualizarUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem || "Usuário atualizado com sucesso!";
                    const index = state.listaUsuarios.findIndex(u => u.id === action.payload.usuario.id);
                    if (index !== -1) {
                        state.listaUsuarios[index] = action.payload.usuario;
                    }
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem || "Erro ao atualizar o usuário.";
                }
            })
            .addCase(atualizarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action?.payload?.mensagem || "Erro ao atualizar usuário.";
            });
    }
});

export const { zerarMensagem } = usuarioReducer.actions;
export default usuarioReducer.reducer;
