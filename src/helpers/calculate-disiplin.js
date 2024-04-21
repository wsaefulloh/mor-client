const getDisiplinCalculate = (hasil) => {

    let newHasil = Number(hasil).toFixed(1)
    let result_mor
    let result

    if (newHasil <= 89.9) {
        result_mor = 1
        result = (10 / 100) * result_mor
    } else if (89.9 < newHasil && newHasil <= 92.9) {
        result_mor = 2
        result = (10 / 100) * result_mor
    } else if (92.9 < newHasil && newHasil <= 95.9) {
        result_mor = 3
        result = (10 / 100) * result_mor
    } else if (95.9 < newHasil && newHasil <= 99.9) {
        result_mor = 4
        result = (10 / 100) * result_mor
    } else if (newHasil >= 100) {
        result_mor = 5
        result = (10 / 100) * result_mor
    } else {
        result_mor = "error"
        result = "error"
    }

    return { result_mor, result };
};

module.exports = {
    getDisiplinCalculate
}