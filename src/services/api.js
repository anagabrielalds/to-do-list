// interface Response {
//   data: {
//     user: {
//       name: string;
//       email: string;
//     };
//     token: string;
//   };
// }

export function post(text, user){
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          token:
            '91j893h281h9nf98fnf2309jd09jkkd0as98238j9fr8j98f9j8f298r829r-f',
          user: {
            name: 'Testando',
            img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
            email: 'testando@gmail.com',
          },
        },
      });
    }, 2000);
  });
}

export const defaults = {
  headers: {
    Authorization: '',
  },
};