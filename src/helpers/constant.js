const dev = {
    env: 'DEV',
    // baseURL: 'https://indomine-cms.cranium.id',
    baseURL: 'https://a245-140-213-167-170.ngrok-free.app',
}
const qa = {
    env: 'QA',
    baseURL: ''
}
const prod = {
    env: 'PROD',
    // baseURL: 'https://cms.indomine.com',
    baseURL: 'http://localhost:1337',
}

const config = {
    // ...prod
    //...qa
    ...dev
}

export { config };
