async function send(event){
    event.preventDefault();
    const nombre = document.getElementById('form-name').value;
    const apellido = document.getElementById('form-lastName').value;
    const file = document.getElementById('form-file');

    console.log('file', file.files);

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('file', file.files[0]);


    const response = await fetch('/api/usuarios', {
        method: 'POST',
        body: formData,
        headers: {          
        },
    });

    if(response.ok){
        response.json().then((d) => {
            const p = document.getElementById('created');
            p.innerText = `Usuario creado con id ${d.id}`;
        })
    }

    alert(JSON.stringify({ response: await response.json(), data }));
}

/**59:44 ver configuración de register */