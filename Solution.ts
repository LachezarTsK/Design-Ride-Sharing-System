
// const {Queue} = require('@datastructures-js/queue');
/*
 Queue is internally included in the solution file on leetcode.
 When running the code on leetcode it should stay commented out. 
 It is mentioned here just for information about the external library 
 that is applied for this data structure.
 */

class RideSharingSystem {

    private static RANGE_ID_FOR_RIDERS_AND_DRIVERS = [1, 1000];
    private static IMPOSSIBLE_TO_MATCH_DRIVER_WITH_RIDER = [-1, -1];

    private requestsRidersID = new Queue<number>();
    private availableDriversID = new Queue<number>();
    private cancelledRequestsRidersID = new Array<boolean>(RideSharingSystem.RANGE_ID_FOR_RIDERS_AND_DRIVERS[1] + 1).fill(false);

    addRider(riderID: number): void {
        this.requestsRidersID.enqueue(riderID);
        this.cancelledRequestsRidersID[riderID] = false;
    }

    addDriver(driverID: number): void {
        this.availableDriversID.enqueue(driverID);

    }

    matchDriverWithRider(): number[] {
        if (this.availableDriversID.isEmpty()) {
            return RideSharingSystem.IMPOSSIBLE_TO_MATCH_DRIVER_WITH_RIDER;
        }

        while (!this.requestsRidersID.isEmpty()) {
            const riderID = this.requestsRidersID.dequeue();
            if (!this.cancelledRequestsRidersID[riderID]) {
                this.cancelledRequestsRidersID[riderID] = true;
                const driverID = this.availableDriversID.dequeue();
                return [driverID, riderID];
            }
        }
        return RideSharingSystem.IMPOSSIBLE_TO_MATCH_DRIVER_WITH_RIDER;
    }

    cancelRider(riderID: number): void {
        this.cancelledRequestsRidersID[riderID] = true;
    }
}
