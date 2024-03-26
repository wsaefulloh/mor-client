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
    } else if (newHasil > 89 && newHasil <= 94) {
        result_mor = 1.2
        result = (20 / 100) * result_mor
    } else if (newHasil > 94 && newHasil <= 99) {
        result_mor = 1.3
        result = (20 / 100) * result_mor
    } else if (newHasil > 99 && newHasil <= 104) {
        result_mor = 1.4
        result = (20 / 100) * result_mor
    } else if (newHasil > 104 && newHasil <= 109) {
        result_mor = 1.5
        result = (20 / 100) * result_mor
    } else if (newHasil > 109 && newHasil <= 114) {
        result_mor = 1.6
        result = (20 / 100) * result_mor
    } else if (newHasil > 114 && newHasil <= 119) {
        result_mor = 1.7
        result = (20 / 100) * result_mor
    } else if (newHasil > 119 && newHasil <= 124) {
        result_mor = 1.8
        result = (20 / 100) * result_mor
    } else if (newHasil > 124 && newHasil <= 129) {
        result_mor = 1.9
        result = (20 / 100) * result_mor
    } else if (newHasil > 129 && newHasil <= 134) {
        result_mor = 2
        result = (20 / 100) * result_mor
    } else if (newHasil > 134 && newHasil <= 139) {
        result_mor = 2.1
        result = (20 / 100) * result_mor
    } else if (newHasil > 139 && newHasil <= 144) {
        result_mor = 2.2
        result = (20 / 100) * result_mor
    } else if (newHasil > 144 && newHasil <= 149) {
        result_mor = 2.3
        result = (20 / 100) * result_mor
    } else if (newHasil > 149 && newHasil <= 154) {
        result_mor = 2.4
        result = (20 / 100) * result_mor
    } else if (newHasil > 154 && newHasil <= 159) {
        result_mor = 2.5
        result = (20 / 100) * result_mor
    } else if (newHasil > 159 && newHasil <= 164) {
        result_mor = 2.6
        result = (20 / 100) * result_mor
    } else if (newHasil > 164 && newHasil <= 169) {
        result_mor = 2.7
        result = (20 / 100) * result_mor
    } else if (newHasil > 169 && newHasil <= 174) {
        result_mor = 2.8
        result = (20 / 100) * result_mor
    } else if (newHasil > 174 && newHasil <= 179) {
        result_mor = 2.9
        result = (20 / 100) * result_mor
    } else if (newHasil > 180 && newHasil <= 184) {
        result_mor = 3
        result = (20 / 100) * result_mor
    } else if (newHasil > 184 && newHasil <= 189) {
        result_mor = 3.1
        result = (20 / 100) * result_mor
    } else if (newHasil > 189 && newHasil <= 194) {
        result_mor = 3.2
        result = (20 / 100) * result_mor
    } else if (newHasil > 194 && newHasil <= 199) {
        result_mor = 3.3
        result = (20 / 100) * result_mor
    } else if (newHasil > 199 && newHasil <= 204) {
        result_mor = 3.4
        result = (20 / 100) * result_mor
    } else if (newHasil > 204 && newHasil <= 209) {
        result_mor = 3.5
        result = (20 / 100) * result_mor
    } else if (newHasil > 209 && newHasil <= 214) {
        result_mor = 3.6
        result = (20 / 100) * result_mor
    } else if (newHasil > 214 && newHasil <= 219) {
        result_mor = 3.7
        result = (20 / 100) * result_mor
    } else if (newHasil > 219 && newHasil <= 224) {
        result_mor = 3.8
        result = (20 / 100) * result_mor
    } else if (newHasil > 224 && newHasil <= 229) {
        result_mor = 3.9
        result = (20 / 100) * result_mor
    } else if (newHasil > 229 && newHasil <= 234) {
        result_mor = 4
        result = (20 / 100) * result_mor
    } else if (newHasil > 234 && newHasil <= 239) {
        result_mor = 4.1
        result = (20 / 100) * result_mor
    } else if (newHasil > 239 && newHasil <= 244) {
        result_mor = 4.2
        result = (20 / 100) * result_mor
    } else if (newHasil > 244 && newHasil <= 249) {
        result_mor = 4.3
        result = (20 / 100) * result_mor
    } else if (newHasil > 249 && newHasil <= 254) {
        result_mor = 4.4
        result = (20 / 100) * result_mor
    } else if (newHasil > 254 && newHasil <= 259) {
        result_mor = 4.5
        result = (20 / 100) * result_mor
    } else if (newHasil > 259 && newHasil <= 264) {
        result_mor = 4.6
        result = (20 / 100) * result_mor
    } else if (newHasil > 264 && newHasil <= 269) {
        result_mor = 4.7
        result = (20 / 100) * result_mor
    } else if (newHasil > 269 && newHasil <= 274) {
        result_mor = 4.8
        result = (20 / 100) * result_mor
    } else if (newHasil > 274 && newHasil <= 279) {
        result_mor = 4.9
        result = (20 / 100) * result_mor
    } else if (newHasil > 279) {
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