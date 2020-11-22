const ipInt = (ip) => {
    /* eslint-disable no-unused-vars */
    // ip = document.getElementById("ipinput").value
    // console.log(ip)
    // var ipInt = ip.split('.').reduce(function (ipInt, octet) { return (ipInt << 8) + parseInt(octet, 10); }, 0) >>> 0;
    // var seg1,seg2,seg3,seg4 = ip.split(".").map(item => parseInt(item))
    // console.log(seg1)
    var item = ip.split(".");
    var seg1 = parseInt(item[0]);
    var seg2 = parseInt(item[1]);
    var seg3 = parseInt(item[2]);
    var seg4 = parseInt(item[3]);
    var ipInt = seg4 + (seg3 * 256) + (seg2 * 65536) + (seg1 * 16777216);
    // console.log("ipInt: ", ipInt);
    // console.log("ob ", ob);
    return ipInt
    /* eslint-enable no-unused-vars */
};



export default ipInt;