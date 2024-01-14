//==================================================================================================== FONCTIONS UNITAIRES ====================================================================================================

// Renvoie TRUE si les strings sont les mêmes
export function sameString(string1, string2) {
    return string1 === string2;
}

// Renvoie TRUE si la string possède un caractère minuscule
export function HasLowerCaseLetter(string) {
    return /[a-z]/.test(string);
}


export function HasValidLength(string) {
    return (string.length >= 12)
}

export function HasUpperCaseLetter(string) {
    return (/[A-Z]/.test(string))
}

export function HasSpecialCharacter(string) {
    return (/[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?]/.test(string))
}

export function HasNumber(string) {
    return (/[0-9]/.test(string))
}

export function checkEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function checkNotNul(string) {
    if (string.length == 0) {
        return false
    } else {
        return true
    }
}

export function estUnNombre(valeur) {
    return !isNaN(parseFloat(valeur)) && isFinite(valeur);
}

export function supprimerEspaces(chaine) {
    return chaine.replace(/\s/g, '');
}