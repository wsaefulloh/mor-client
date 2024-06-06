const getKeterangan = (value) => {

    if (value === "IST") {
        return "Istimewa"
    } else if (value === "C") {
        return "Cukup"
    } else if (value === "B") {
        return "Baik"
    } else if (value === "BS") {
        return "Baik Sekali"
    } else {
        return "Kurang"
    }
};

module.exports = {
    getKeterangan
}