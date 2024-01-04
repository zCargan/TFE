import { sameString } from "../src/pages/FonctionsUnitaires";



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
});

