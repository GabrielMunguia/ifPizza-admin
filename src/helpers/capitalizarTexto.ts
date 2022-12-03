export const CapitalizarTexto = (texto: string) => {

    let textoCapitalizado =  texto.replace ("-", " ");
    textoCapitalizado = textoCapitalizado.split ("/-")[0];
    textoCapitalizado = textoCapitalizado.replace("/", "").trim();
    textoCapitalizado = textoCapitalizado.charAt(0).toUpperCase() + textoCapitalizado.slice(1);
    return textoCapitalizado;

 
}