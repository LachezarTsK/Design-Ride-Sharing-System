
// const {Queue} = require('@datastructures-js/queue');
/*
 Queue is internally included in the solution file on leetcode.
 When running the code on leetcode it should stay commented out. 
 It is mentioned here just for information about the external library 
 that is applied for this data structure.
 */

class RideSharingSystem {

    static #RANGE_ID_FOR_RIDERS_AND_DRIVERS = [1, 1000];
    static #IMPOSSIBLE_TO_MATCH_DRIVER_WITH_RIDER = [-1, -1];

    // Queue<number>
    #requestsRidersID = new Queue();
    // Queue<number>
    #availableDriversID = new Queue();
    #cancelledRequestsRidersID = new Array(RideSharingSystem.#RANGE_ID_FOR_RIDERS_AND_DRIVERS[1] + 1).fill(false);

    /** 
     * @param {number} riderID
     * @return {void}
     */
    addRider(riderID) {
        this.#requestsRidersID.enqueue(riderID);
        this.#cancelledRequestsRidersID[riderID] = false;
    }

    /** 
     * @param {number} driverID
     * @return {void}
     */
    addDriver(driverID) {
        this.#availableDriversID.enqueue(driverID);
    }

    /**
     * @return {number[]}
     */
    matchDriverWithRider() {
        if (this.#availableDriversID.isEmpty()) {
            return RideSharingSystem.#IMPOSSIBLE_TO_MATCH_DRIVER_WITH_RIDER;
        }

        while (!this.#requestsRidersID.isEmpty()) {
            const riderID = this.#requestsRidersID.dequeue();
            if (!this.#cancelledRequestsRidersID[riderID]) {
                this.#cancelledRequestsRidersID[riderID] = true;
                const driverID = this.#availableDriversID.dequeue();
                return [driverID, riderID];
            }
        }
        return RideSharingSystem.#IMPOSSIBLE_TO_MATCH_DRIVER_WITH_RIDER;
    }

    /** 
     * @param {number} riderID
     * @return {void}
     */
    cancelRider(riderID) {
        this.#cancelledRequestsRidersID[riderID] = true;
    }
}
