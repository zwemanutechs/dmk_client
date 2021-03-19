import { get, getFromOtherOrigin, postWithPayload } from "../middleware/axios-middleware";
import { OVEN_ASSETID, PAINTBOOTH_ASSETID } from "../constants/mindsphere-constants";

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

// validate all mindsphere date from last validated time
export const executeScheduler = async () => {
    const responseTime = await get(`Validation/GetLastValidateTime`);
    if (responseTime.data.code && responseTime.data.data) {
        let from = responseTime.data.data;
        from  = new Date().getTime() - new Date(from).getTime() > 300000 ? new Date().setMinutes(-5) : from;
        const asset = [
            {
                'Id': 'Oven',
                'Parameter': ['Final Oven 1', 'Final Oven 2', 'Intermediate Oven', 'Water Dryer']
            }, 
            {
                'Id': 'Paint Booth',
                'Parameter': ['ESTA 1', 'ESTA 2']
            }
        ];

        asset.forEach((item) => {
            let assetId = item.Id == 'Oven' ? OVEN_ASSETID : PAINTBOOTH_ASSETID;
            let assetParameter = item.Parameter;
            assetParameter.forEach(async (aspectId) => {
                let newAspectId = aspectId.replace(/\s+/g, '');
                let response = await getFromOtherOrigin(`/api/iottimeseries/v3/timeseries/${assetId}/${newAspectId}?from=${new Date(
                    from
                ).toISOString()}&to=${new Date().toISOString()}&limit=1000&sort=asc`);
                
                if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
                    let url = `Validation/Validate?formName=${aspectId}`;
                    let res = await postWithPayload(url, response.data);
                    console.log('res', res)
                }
            })
        });
    }
}