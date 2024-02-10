const getTingkatKehadiranCalculate = (hasil) => {

    let newHasil = Number(hasil).toFixed(2)
    let result_mor
    let result

    if (newHasil <= 95) {
        result_mor = 1
        result = (20 / 100) * result_mor
    } else if (newHasil == 95.1) {
        result_mor = 1.1
        result = (20 / 100) * result_mor
    } else if (newHasil == 95.2) {
        result_mor = 1.2
        result = (20 / 100) * result_mor
    } else if (newHasil == 95.3) {
        result_mor = 1.3
        result = (20 / 100) * result_mor
    } else if (newHasil == 95.4) {
        result_mor = 1.4
        result = (20 / 100) * result_mor
    } else if (newHasil == 95.5) {
        result_mor = 1.5
        result = (20 / 100) * result_mor
    } else if (newHasil == 95.6) {
        result_mor = 1.6
        result = (20 / 100) * result_mor
    } else if (newHasil == 95.7) {
        result_mor = 1.7
        result = (20 / 100) * result_mor
    } else if (newHasil == 95.8) {
        result_mor = 1.8
        result = (20 / 100) * result_mor
    } else if (newHasil == 95.9) {
        result_mor = 1.9
        result = (20 / 100) * result_mor
    } else if (newHasil == 96) {
        result_mor = 2
        result = (20 / 100) * result_mor
    } else if (newHasil == 96.1) {
        result_mor = 2.1
        result = (20 / 100) * result_mor
    } else if (newHasil == 96.2) {
        result_mor = 2.2
        result = (20 / 100) * result_mor
    } else if (newHasil == 96.3) {
        result_mor = 2.3
        result = (20 / 100) * result_mor
    } else if (newHasil == 96.4) {
        result_mor = 2.4
        result = (20 / 100) * result_mor
    } else if (newHasil == 96.5) {
        result_mor = 2.5
        result = (20 / 100) * result_mor
    } else if (newHasil == 96.6) {
        result_mor = 2.6
        result = (20 / 100) * result_mor
    } else if (newHasil == 96.7) {
        result_mor = 2.7
        result = (20 / 100) * result_mor
    } else if (newHasil == 96.8) {
        result_mor = 2.8
        result = (20 / 100) * result_mor
    } else if (newHasil == 96.9) {
        result_mor = 2.9
        result = (20 / 100) * result_mor
    } else if (newHasil == 97) {
        result_mor = 3
        result = (20 / 100) * result_mor
    } else if (newHasil == 97.1) {
        result_mor = 3.1
        result = (20 / 100) * result_mor
    } else if (newHasil == 97.2) {
        result_mor = 3.2
        result = (20 / 100) * result_mor
    } else if (newHasil == 97.3) {
        result_mor = 3.3
        result = (20 / 100) * result_mor
    } else if (newHasil == 97.4) {
        result_mor = 3.4
        result = (20 / 100) * result_mor
    } else if (newHasil == 97.5) {
        result_mor = 3.5
        result = (20 / 100) * result_mor
    } else if (newHasil == 97.6) {
        result_mor = 3.6
        result = (20 / 100) * result_mor
    } else if (newHasil == 97.7) {
        result_mor = 3.7
        result = (20 / 100) * result_mor
    } else if (newHasil == 97.8) {
        result_mor = 3.8
        result = (20 / 100) * result_mor
    } else if (newHasil == 97.9) {
        result_mor = 3.9
        result = (20 / 100) * result_mor
    } else if (newHasil == 98) {
        result_mor = 4
        result = (20 / 100) * result_mor
    } else if (newHasil == 98.1) {
        result_mor = 4.1
        result = (20 / 100) * result_mor
    } else if (newHasil == 98.2) {
        result_mor = 4.2
        result = (20 / 100) * result_mor
    } else if (newHasil == 98.3) {
        result_mor = 4.3
        result = (20 / 100) * result_mor
    } else if (newHasil == 98.4) {
        result_mor = 4.4
        result = (20 / 100) * result_mor
    } else if (newHasil == 98.5) {
        result_mor = 4.5
        result = (20 / 100) * result_mor
    } else if (newHasil == 98.6) {
        result_mor = 4.6
        result = (20 / 100) * result_mor
    } else if (newHasil == 98.7) {
        result_mor = 4.7
        result = (20 / 100) * result_mor
    } else if (newHasil == 98.8) {
        result_mor = 4.8
        result = (20 / 100) * result_mor
    } else if (newHasil == 98.9) {
        result_mor = 4.9
        result = (20 / 100) * result_mor
    } else if (newHasil > 98.9 && newHasil <= 100) {
        result_mor = 5
        result = (20 / 100) * result_mor
    } else {
        result_mor = "error"
        result = "error"
    }

    return { result_mor, result };
};

module.exports = {
    getTingkatKehadiranCalculate
}