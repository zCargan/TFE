export function correctWidth(number, setWidth, errorHandler) {
    console.log("on passe ici")
    if (/^[0-9]+$/.test(number)) {
        setWidth(Number(number));
    } else {
        errorHandler("Veuillez entrer un nombre entier");
    }
}
