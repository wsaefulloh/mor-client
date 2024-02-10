const getProductivityIndividuCalculate = (hasil) => {

    let newHasil = Number(hasil).toFixed(2)
    let result_mor
    let result

    if (newHasil <= 80.40) {
        result_mor = 1
        result = (25 / 100) * result_mor
    } else if (newHasil >= 80.50 && newHasil <= 80.90) {
        result_mor = 1.1
        result = (25 / 100) * result_mor
    } else if (newHasil >= 81.00 && newHasil <= 81.40) {
        result_mor = 1.2
        result = (25 / 100) * result_mor
    } else if (newHasil >= 81.50 && newHasil <= 81.90) {
        result_mor = 1.3
        result = (25 / 100) * result_mor
    } else if (newHasil >= 82.00 && newHasil <= 82.40) {
        result_mor = 1.4
        result = (25 / 100) * result_mor
    } else if (newHasil >= 82.50 && newHasil <= 82.90) {
        result_mor = 1.5
        result = (25 / 100) * result_mor
    } else if (newHasil >= 83.00 && newHasil <= 83.40) {
        result_mor = 1.6
        result = (25 / 100) * result_mor
    } else if (newHasil >= 83.50 && newHasil <= 83.90) {
        result_mor = 1.7
        result = (25 / 100) * result_mor
    } else if (newHasil >= 84.00 && newHasil <= 84.40) {
        result_mor = 1.8
        result = (25 / 100) * result_mor
    } else if (newHasil >= 84.50 && newHasil <= 84.90) {
        result_mor = 1.9
        result = (25 / 100) * result_mor
    } else if (newHasil >= 85.00 && newHasil <= 85.40) {
        result_mor = 2
        result = (25 / 100) * result_mor
    } else if (newHasil >= 85.50 && newHasil <= 85.90) {
        result_mor = 2.1
        result = (25 / 100) * result_mor
    } else if (newHasil >= 86.00 && newHasil <= 86.40) {
        result_mor = 2.2
        result = (25 / 100) * result_mor
    } else if (newHasil >= 86.50 && newHasil <= 86.90) {
        result_mor = 2.3
        result = (25 / 100) * result_mor
    } else if (newHasil >= 87.00 && newHasil <= 87.40) {
        result_mor = 2.4
        result = (25 / 100) * result_mor
    } else if (newHasil >= 87.50 && newHasil <= 87.90) {
        result_mor = 2.5
        result = (25 / 100) * result_mor
    } else if (newHasil >= 88.00 && newHasil <= 88.40) {
        result_mor = 2.6
        result = (25 / 100) * result_mor
    } else if (newHasil >= 88.50 && newHasil <= 88.90) {
        result_mor = 2.7
        result = (25 / 100) * result_mor
    } else if (newHasil >= 89.00 && newHasil <= 89.40) {
        result_mor = 2.8
        result = (25 / 100) * result_mor
    } else if (newHasil >= 89.50 && newHasil <= 89.90) {
        result_mor = 2.9
        result = (25 / 100) * result_mor
    } else if (newHasil >= 90.00 && newHasil <= 90.40) {
        result_mor = 3
        result = (25 / 100) * result_mor
    } else if (newHasil >= 90.50 && newHasil <= 90.90) {
        result_mor = 3.1
        result = (25 / 100) * result_mor
    } else if (newHasil >= 91.00 && newHasil <= 91.40) {
        result_mor = 3.2
        result = (25 / 100) * result_mor
    } else if (newHasil >= 91.50 && newHasil <= 91.90) {
        result_mor = 3.3
        result = (25 / 100) * result_mor
    } else if (newHasil >= 92.00 && newHasil <= 92.40) {
        result_mor = 3.4
        result = (25 / 100) * result_mor
    } else if (newHasil >= 92.50 && newHasil <= 92.90) {
        result_mor = 3.5
        result = (25 / 100) * result_mor
    } else if (newHasil >= 93.00 && newHasil <= 93.40) {
        result_mor = 3.6
        result = (25 / 100) * result_mor
    } else if (newHasil >= 93.50 && newHasil <= 93.90) {
        result_mor = 3.7
        result = (25 / 100) * result_mor
    } else if (newHasil >= 94.00 && newHasil <= 94.40) {
        result_mor = 3.8
        result = (25 / 100) * result_mor
    } else if (newHasil >= 94.50 && newHasil <= 94.90) {
        result_mor = 3.9
        result = (25 / 100) * result_mor
    } else if (newHasil >= 95.00 && newHasil <= 95.40) {
        result_mor = 4
        result = (25 / 100) * result_mor
    } else if (newHasil >= 95.50 && newHasil <= 95.90) {
        result_mor = 4.1
        result = (25 / 100) * result_mor
    } else if (newHasil >= 96.00 && newHasil <= 96.40) {
        result_mor = 4.2
        result = (25 / 100) * result_mor
    } else if (newHasil >= 96.50 && newHasil <= 96.90) {
        result_mor = 4.3
        result = (25 / 100) * result_mor
    } else if (newHasil >= 97.00 && newHasil <= 97.40) {
        result_mor = 4.4
        result = (25 / 100) * result_mor
    } else if (newHasil >= 97.50 && newHasil <= 97.90) {
        result_mor = 4.5
        result = (25 / 100) * result_mor
    } else if (newHasil >= 98.00 && newHasil <= 98.40) {
        result_mor = 4.6
        result = (25 / 100) * result_mor
    } else if (newHasil >= 98.50 && newHasil <= 98.90) {
        result_mor = 4.7
        result = (25 / 100) * result_mor
    } else if (newHasil >= 99.00 && newHasil <= 99.40) {
        result_mor = 4.8
        result = (25 / 100) * result_mor
    } else if (newHasil >= 99.50 && newHasil <= 99.90) {
        result_mor = 4.9
        result = (25 / 100) * result_mor
    } else if (newHasil >= 100) {
        result_mor = 5
        result = (25 / 100) * result_mor
    } else {
        result_mor = "error"
        result = "error"
    }

    if (result !== "error") {
        result = result.toFixed(2)
    }

    return { result_mor, result };
};

module.exports = {
    getProductivityIndividuCalculate
}