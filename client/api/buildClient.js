import axios from 'axios';

// const buildClient = (context) => {
//   const get = (path) => {
//     if (typeof window === 'undefined') {
//       return axios.get(
//         'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local' +
//           path,
//         {
//           headers: context.req.headers,
//         }
//       );
//     } else {
//       return axios.get(path);
//     }
//   };
//   return { get, d: 'somedata' };
// };

class BuildClient {
  #context;
  constructor(context) {
    this.#context = context;
  }

  get(path) {
    if (typeof window === 'undefined') {
      return axios.get(
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local' +
          path,
        {
          headers: this.#context.req.headers,
        }
      );
    } else {
      return axios.get(path);
    }
  }
}

export default BuildClient;
