const url = 'https://backend-bcc-2-b.vercel.app/usuario/'

export async function gravar(usuario) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
    });
    return await res.json();
}

export async function deletar(usuario, senhaU) {
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: usuario.id,
            senha : senhaU
        })
    });
    return await res.json();
}

export async function atualizar(usuario) {
    console.log(usuario);
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
    });
    return await res.json();
}

export async function consultar(termo) {
    if (!termo)
        termo = "";
    const res = await fetch(url + termo, {
        method: 'GET',
    });
    return await res.json();
}

export async function verificarSenha(nome, senhaU) {
    const res = await fetch(url + "verificarSenha", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nickname: nome,
            senha: senhaU
        })
    });
    return await res.json();
}
