const usuarioKeys = ['nombre', 'apellido'];

export function validarUsuario(maybeUsuario){

    const maybeUsuarioKeys = Object.keys(maybeUsuario);

    return (
        usuarioKeys.every((key) => maybeUsuarioKeys.includes(key)) &&
        maybeUsuarioKeys.every((key) => usuarioKeys.includes(key))
    );
}

export function validarUsuarioParcial(maybeUsuarioParcial){
    const maybeUsuarioKeys = Object.keys(maybeUsuarioParcial);
    
    return (
        maybeUsuarioKeys.length < usuarioKeys.length &&
        maybeUsuarioKeys.every((key) => usuarioKeys.includes(key))
     );
}