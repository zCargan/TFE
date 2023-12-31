// jest.mock('axios');
// import { render, act } from '@testing-library/react';
import { sameString } from "../src/pages/FonctionsUtilitaires";
// import { useConnection } from "../src/pages/FonctionsUtilitaires";
// import axios from 'axios';

// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useNavigate: jest.fn(),
// }));


describe('FonctionsUtilitaires', () => {

    it('Renvoie true si deux chaines de caractères sont les même', () => {
        let string1 = "test"
        let string2 = "Test"

        const result = sameString(string1, string2);
        expect(result).toBe(false)
    })
});




// describe('FonctionsUtilitaires - connection', () => {
//     it('should handle successful connection', async () => {
//         // Mock axios.post to return a successful response
//         axios.post.mockResolvedValueOnce({
//             data: {
//                 nom: 'John Doe',
//                 role: 'eleve',
//                 token: 'fake-token',
//             },
//         });

//         // Call the connection function
//         await connection('john_doe', 'password');

//         // Assert that the navigation occurred, etc.
//     });

//     it('should handle connection failure', async () => {
//         // Mock axios.post to return an error response
//         axios.post.mockRejectedValueOnce({
//             response: {
//                 status: 401,
//                 data: {
//                     error: 'Invalid credentials',
//                 },
//             },
//         });

//         // Call the connection function
//         await connection('invalid_user', 'wrong_password');

//         // Assert that the error was handled correctly, etc.
//     });

//     // Add more test cases as needed
// });


// it('useConnection fonctionne correctement', () => {
//     const TestComponent = () => {
//         const { connection } = useConnection();
//         const handleLogin = () => {
//             connection('profA', 'LoganLogan12@');
//         };

//         return (
//             <div>
//                 <button onClick={handleLogin}>Tester la connexion</button>
//             </div>
//         );
//     };

//     const { getByText } = render(<TestComponent />);

//     act(() => {
//         getByText('Tester la connexion').click();
//     });

//     // Ajoutez des assertions ici pour vérifier le comportement attendu
//     // Par exemple, vérifiez si le composant réagit correctement après la connexion
// });