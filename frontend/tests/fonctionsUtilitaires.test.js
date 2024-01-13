import { sameString } from "../src/pages/FonctionsUnitaires";
import { HasLowerCaseLetter } from "../src/pages/FonctionsUnitaires";
import { HasValidLength } from "../src/pages/FonctionsUnitaires";
import { HasUpperCaseLetter } from "../src/pages/FonctionsUnitaires";
import { HasSpecialCharacter } from "../src/pages/FonctionsUnitaires";
import { HasNumber } from "../src/pages/FonctionsUnitaires";
import { checkEmail } from "../src/pages/FonctionsUnitaires";
import { checkNotNul } from "../src/pages/FonctionsUnitaires";

describe('FonctionsUtilitaires', () => {

    it('Renvoie true si deux chaines de caractères sont les même', () => {
        let string1 = "test"
        let string2 = "Test"

        const result = sameString(string1, string2);
        expect(result).toBe(false)
    })
    it('Renvoie true si deux chaines de caractères sont les même', () => {
        let string1 = "Test"
        let string2 = "Test"

        const result = sameString(string1, string2);
        expect(result).toBe(true)
    })
    if('Renvoie true si la chaine de caractère n\'est pas nulle', () => {
        let string = ""
        const result = checkNotNul(string)
        expect(result).toBe(true)
    })
    if('Renvoie true si la chaine de caractère n\'est pas nulle', () => {
        let string = "e"
        const result = checkNotNul(string)
        expect(result).toBe(false)
    })
    it('Renvoie false si la chaine de caractère ne possède pas de minuscle', () => {
        let string = "TEST"
        const result = HasLowerCaseLetter(string)
        expect(result).toBe(false)
    })
    it('Renvoie true si la chaine de caractère possède bien une minuscule', () => {
        let string ='Test'
        const resultat = HasLowerCaseLetter(string)
        expect(resultat).toBe(true)
    })
    it('Renvoie true si la chaine de caractère est égale ou plus grande que 12', () => {
        let string ='Testtesttest'
        const resultat = HasLowerCaseLetter(string)
        expect(resultat).toBe(true)
    })
    it('Renvoie false si la chaine de caractère est inférieur à 12', () => {
        let string ='Testtesttest'
        const resultat = HasValidLength(string)
        expect(resultat).toBe(true)
    })
    it('Renvoie false si la chaine de caractère est inférieur à 12', () => {
        let string ='Testtesttes'
        const resultat = HasValidLength(string)
        expect(resultat).toBe(false)
    })
    it('Renvoie true si la chaine de caractère est égal ou supérieur à 12', () => {
        let string ='Testtesttests'
        const resultat = HasValidLength(string)
        expect(resultat).toBe(true)
    })
    it('Renvoie true si la chaine de caractère possède un caractère en majuscule', () => {
        let string ='Test'
        const resultat = HasUpperCaseLetter(string)
        expect(resultat).toBe(true)
    })
    it('Renvoie false si la chaine de caractère ne possède pas de caractère en majuscule', () => {
        let string ='test'
        const resultat = HasUpperCaseLetter(string)
        expect(resultat).toBe(false)
    })
    it('Renvoie false si la chaine de caractère ne possède pas de caractère en majuscule', () => {
        let string ='test'
        const resultat = HasUpperCaseLetter(string)
        expect(resultat).toBe(false)
    })
    it('Renvoie true si la chaine de caractère ne possède pas de caractère spécial', () => {
        let string ='test'
        const resultat = HasSpecialCharacter(string)
        expect(resultat).toBe(false)
    })
    it('Renvoie true si la chaine de caractère ne possède pas de caractère spécial', () => {
        let string ='test@'
        const resultat = HasSpecialCharacter(string)
        expect(resultat).toBe(true)
    })
    it('Renvoie true si la chaine de caractère possède un nombre', () => {
        let string ='test@1'
        const resultat = HasNumber(string)
        expect(resultat).toBe(true)
    })
    it('Renvoie true si la chaine de caractère possède un nombre', () => {
        let string ='test@'
        const resultat = HasNumber(string)
        expect(resultat).toBe(false)
    })
    it('Renvoie false si l\'email entrée n\'est pas valide', () => {
        let string = 'test'
        const result = checkEmail(string)
        expect(result).toBe(false)
    })
    it('Renvoie false si l\'email entrée n\'est pas valide', () => {
        let string = 'test@'
        const result = checkEmail(string)
        expect(result).toBe(false)
    })
    it('Renvoie false si l\'email entrée n\'est pas valide', () => {
        let string = 'test@test2'
        const result = checkEmail(string)
        expect(result).toBe(false)
    })
    it('Renvoie false si l\'email entrée n\'est pas valide', () => {
        let string = 'test@test2.'
        const result = checkEmail(string)
        expect(result).toBe(false)
    })
    it('Renvoie false si l\'email entrée n\'est pas valide', () => {
        let string = 'test@test2.com'
        const result = checkEmail(string)
        expect(result).toBe(true)
    })
    it('Renvoie false si l\'email entrée n\'est pas valide', () => {
        let string = 'test@test2.com'
        const result = checkEmail(string)
        expect(result).toBe(true)
    })
    it('Verifie si le mot de passe à caractère majuscule et minuscule', () => {
        const string = "Test"
        const result = (HasLowerCaseLetter(string) && HasUpperCaseLetter(string))
        expect(result).toBe(true)
    })
    it('Verifie si le mot de passe à caractère majuscule et minuscule', () => {
        const string = "test"
        const result = (HasLowerCaseLetter(string) && HasUpperCaseLetter(string))
        expect(result).toBe(false)
    })
    it('Verifie si le mot de passe à caractère majuscule et minuscule', () => {
        const string = "Test"
        const result = (HasLowerCaseLetter(string) && HasUpperCaseLetter(string))
        expect(result).toBe(true)
    })
    it('Verifie si le mot de passe à caractère majuscule et minuscule', () => {
        const string = "test"
        const result = (HasLowerCaseLetter(string) && HasUpperCaseLetter(string))
        expect(result).toBe(false)
    })
});

