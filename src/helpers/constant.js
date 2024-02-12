const dev = {
    env: 'DEV',
    baseURL: 'http://localhost:1337',
}
const qa = {
    env: 'QA',
    baseURL: ''
}
const prod = {
    env: 'PROD',
    baseURL: 'http://localhost:1337',
}

const config = {
    // ...prod
    //...qa
    ...dev
}

export { config };
