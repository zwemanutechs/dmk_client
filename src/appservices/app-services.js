export const sortByUpdatedAt = (dateAPair, dateBPair) =>{
    let DateA = new Date(dateAPair.updatedat);
    let DateB = new Date(dateBPair.updatedat);
    if (DateA < DateB) {
        return 1;
    } else if (DateA > DateB) {
        return -1;
    } else {
        return 0;
    }
};
