const ipInt = (ip) => {
    /* eslint-disable no-unused-vars */
    var item = ip.split(".");
    var seg1 = parseInt(item[0]);
    var seg2 = parseInt(item[1]);
    var seg3 = parseInt(item[2]);
    var seg4 = parseInt(item[3]);
    var ipInt = seg4 + (seg3 * 256) + (seg2 * 65536) + (seg1 * 16777216);
    return ipInt
    /* eslint-enable no-unused-vars */
};



export default ipInt;