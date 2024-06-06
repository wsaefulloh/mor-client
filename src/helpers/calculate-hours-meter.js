const getHoursMeterCalculate = (hasil) => {

    let newHasil = Number(hasil).toFixed(2)
    let result_mor
    let result

    let hasil2 = Math.floor(newHasil)
    result_mor = hasil2 * 0.05

    if (hasil2 >= 100) {
        result_mor = 5
    }

    result = (20 / 100) * result_mor

    if (result !== "error") {
        result = result.toFixed(2)
    }

    return { result_mor, result };
};

module.exports = {
    getHoursMeterCalculate
}