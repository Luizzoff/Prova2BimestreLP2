const url = 'https://backend-bcc-2-b.vercel.app/mensagem/'

export async function gravar(recado) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recado)
    });
    return await res.json();
}

export async function deletar(chat) {
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(chat)
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
