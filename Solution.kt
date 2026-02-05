
class RideSharingSystem() {

    private companion object {
        val RANGE_ID_FOR_RIDERS_AND_DRIVERS = intArrayOf(1, 1000)
        val IMPOSSIBLE_TO_MATCH_DRIVER_WITH_RIDER = intArrayOf(-1, -1)
    }

    private val requestsRidersID = mutableListOf<Int>()
    private val availableDriversID = mutableListOf<Int>()
    private val cancelledRequestsRidersID = BooleanArray(RANGE_ID_FOR_RIDERS_AND_DRIVERS[1] + 1)

    fun addRider(riderID: Int) {
        requestsRidersID.add(riderID)
        cancelledRequestsRidersID[riderID] = false
    }

    fun addDriver(driverID: Int) {
        availableDriversID.add(driverID)
    }

    fun matchDriverWithRider(): IntArray {
        if (availableDriversID.isEmpty()) {
            return IMPOSSIBLE_TO_MATCH_DRIVER_WITH_RIDER
        }

        while (!requestsRidersID.isEmpty()) {
            val riderID = requestsRidersID.removeFirst()
            if (!cancelledRequestsRidersID[riderID]) {
                cancelledRequestsRidersID[riderID] = true
                val driverID = availableDriversID.removeFirst()
                return intArrayOf(driverID, riderID)
            }
        }
        return IMPOSSIBLE_TO_MATCH_DRIVER_WITH_RIDER
    }

    fun cancelRider(riderID: Int) {
        cancelledRequestsRidersID[riderID] = true
    }
}
