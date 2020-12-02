/**
 * fake login function for testing purposes
 * you should remove it.
 */

interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export function signIn(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'iopauasAPAPAPAPAOSISAP',
        user: {
          name: 'Dong',
          email: 'dong@email',
        },
      });
    }, 2000);
  });
}
