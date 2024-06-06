const dev = {
    env: 'DEV',
    baseURL: 'http://localhost:1337',
    // baseURL: 'https://mor-service.futuretech.fun'
}
const qa = {
    env: 'QA',
    baseURL: ''
}
const prod = {
    env: 'PROD',
    baseURL: 'http://localhost:1337',
    // baseURL: 'https://mor-service.futuretech.fun'
}

const config = {
    // ...prod
    //...qa
    ...dev
}

export { config };
