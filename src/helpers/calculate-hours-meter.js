const getHoursMeterCalculate = (hasil) => {

    let newHasil = Number(hasil).toFixed(2)
    let result_mor
    let result

    if (newHasil <= 84) {
        result_mor = 1
        result = (20 / 100) * result_mor
    } else if (newHasil >= 85 && newHasil <= 89) {
        result_mor = 1.1
        result = (20 / 100) * result_mor
    } else if (newHasil >= 90 && newHasil <= 94) {
        result_mor = 1.2
        result = (20 / 100) * result_mor
    } else if (newHasil >= 95 && newHasil <= 99) {
        result_mor = 1.3
        result = (20 / 100) * result_mor
    } else if (newHasil >= 100 && newHasil <= 104) {
        result_mor = 1.4
        result = (20 / 100) * result_mor
    } else if (newHasil >= 105 && newHasil <= 109) {
        result_mor = 1.5
        result = (20 / 100) * result_mor
    } else if (newHasil >= 110 && newHasil <= 114) {
        result_mor = 1.6
        result = (20 / 100) * result_mor
    } else if (newHasil >= 115 && newHasil <= 119) {
        result_mor = 1.7
        result = (20 / 100) * result_mor
    } else if (newHasil >= 120 && newHasil <= 124) {
        result_mor = 1.8
        result = (20 / 100) * result_mor
    } else if (newHasil >= 125 && newHasil <= 129) {
        result_mor = 1.9
        result = (20 / 100) * result_mor
    } else if (newHasil >= 130 && newHasil <= 134) {
        result_mor = 2
        result = (20 / 100) * result_mor
    } else if (newHasil >= 135 && newHasil <= 139) {
        result_mor = 2.1
        result = (20 / 100) * result_mor
    } else if (newHasil >= 140 && newHasil <= 144) {
        result_mor = 2.2
        result = (20 / 100) * result_mor
    } else if (newHasil >= 145 && newHasil <= 149) {
        result_mor = 2.3
        result = (20 / 100) * result_mor
    } else if (newHasil >= 150 && newHasil <= 154) {
        result_mor = 2.4
        result = (20 / 100) * result_mor
    } else if (newHasil >= 155 && newHasil <= 159) {
        result_mor = 2.5
        result = (20 / 100) * result_mor
    } else if (newHasil >= 160 && newHasil <= 164) {
        result_mor = 2.6
        result = (20 / 100) * result_mor
    } else if (newHasil >= 165 && newHasil <= 169) {
        result_mor = 2.7
        result = (20 / 100) * result_mor
    } else if (newHasil >= 170 && newHasil <= 174) {
        result_mor = 2.8
        result = (20 / 100) * result_mor
    } else if (newHasil >= 175 && newHasil <= 179) {
        result_mor = 2.9
        result = (20 / 100) * result_mor
    } else if (newHasil >= 180 && newHasil <= 184) {
        result_mor = 3
        result = (20 / 100) * result_mor
    } else if (newHasil >= 185 && newHasil <= 189) {
        result_mor = 3.1
        result = (20 / 100) * result_mor
    } else if (newHasil >= 190 && newHasil <= 194) {
        result_mor = 3.2
        result = (20 / 100) * result_mor
    } else if (newHasil >= 195 && newHasil <= 199) {
        result_mor = 3.3
        result = (20 / 100) * result_mor
    } else if (newHasil >= 200 && newHasil <= 204) {
        result_mor = 3.4
        result = (20 / 100) * result_mor
    } else if (newHasil >= 205 && newHasil <= 209) {
        result_mor = 3.5
        result = (20 / 100) * result_mor
    } else if (newHasil >= 210 && newHasil <= 214) {
        result_mor = 3.6
        result = (20 / 100) * result_mor
    } else if (newHasil >= 215 && newHasil <= 219) {
        result_mor = 3.7
        result = (20 / 100) * result_mor
    } else if (newHasil >= 220 && newHasil <= 224) {
        result_mor = 3.8
        result = (20 / 100) * result_mor
    } else if (newHasil >= 225 && newHasil <= 229) {
        result_mor = 3.9
        result = (20 / 100) * result_mor
    } else if (newHasil >= 230 && newHasil <= 234) {
        result_mor = 4
        result = (20 / 100) * result_mor
    } else if (newHasil >= 235 && newHasil <= 239) {
        result_mor = 4.1
        result = (20 / 100) * result_mor
    } else if (newHasil >= 240 && newHasil <= 244) {
        result_mor = 4.2
        result = (20 / 100) * result_mor
    } else if (newHasil >= 245 && newHasil <= 249) {
        result_mor = 4.3
        result = (20 / 100) * result_mor
    } else if (newHasil >= 250 && newHasil <= 254) {
        result_mor = 4.4
        result = (20 / 100) * result_mor
    } else if (newHasil >= 255 && newHasil <= 259) {
        result_mor = 4.5
        result = (20 / 100) * result_mor
    } else if (newHasil >= 260 && newHasil <= 264) {
        result_mor = 4.6
        result = (20 / 100) * result_mor
    } else if (newHasil >= 265 && newHasil <= 269) {
        result_mor = 4.7
        result = (20 / 100) * result_mor
    } else if (newHasil >= 270 && newHasil <= 274) {
        result_mor = 4.8
        result = (20 / 100) * result_mor
    } else if (newHasil >= 275 && newHasil <= 279) {
        result_mor = 4.9
        result = (20 / 100) * result_mor
    } else if (newHasil >= 280) {
        result_mor = 5
        result = (20 / 100) * result_mor
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
    getHoursMeterCalculate
}