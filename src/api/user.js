const BASE_URL = 'https://unicloud.cellinlab.xyz';

async function getUserList (params) {
  return new Promise((resolve, reject) => {
    const url = `${BASE_URL}/api/juejin/userlist`;

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });
  });
}

export {
  getUserList,
};