// import { renderHook, act } from '@testing-library/react-hooks';
// import { useConnection } from '../src/pages/FonctionAPI';
// import { MemoryRouter } from 'react-router-dom';
// import axios from 'axios';

// describe('useConnection', () => {
//     beforeEach(() => {
//         jest.resetAllMocks();
//     });

//     it('should handle successful connection for a "professeur"', async () => {
//         jest.spyOn(axios, 'post').mockResolvedValueOnce({
//             data: {
//                 id: 45,
//                 nom: 'profA',
//                 role: 'professeur',
//                 status: true,
//                 token: 'mocked-jwt-token',
//             },
//         });

//         const { result, waitForNextUpdate } = renderHook(() => useConnection(), {
//             wrapper: MemoryRouter,
//         });

//         act(() => {
//             result.current.connection('profA', 'LoganLogan12@');
//         });

//         await waitForNextUpdate({ timeout: 10000 });

//         const expectedValueForProfA = undefined;

//         expect(result.current.someStateVariable).toBe(expectedValueForProfA);
//     });
// });
