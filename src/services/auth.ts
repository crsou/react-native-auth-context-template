export function signIn() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'iopauasAPAPAPAPAOSISAP',
        users: {
          name: 'Dong',
          email: 'dong@email',
        },
      });
    }, 2000);
  });
}
