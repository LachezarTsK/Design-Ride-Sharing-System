
package main
import "container/list"

var RANGE_ID_FOR_RIDERS_AND_DRIVERS = []int{1, 1000}
var IMPOSSIBLE_TO_MATCH_DRIVER_WITH_RIDER = []int{-1, -1}

type RideSharingSystem struct {
    requestsRidersID          list.List
    availableDriversID        list.List
    cancelledRequestsRidersID []bool
}

func Constructor() RideSharingSystem {
    rideSharingSystem := RideSharingSystem{
        requestsRidersID:          list.List{},
        availableDriversID:        list.List{},
        cancelledRequestsRidersID: make([]bool, RANGE_ID_FOR_RIDERS_AND_DRIVERS[1] + 1),
    }
    return rideSharingSystem
}

func (this *RideSharingSystem) AddRider(riderID int) {
    this.requestsRidersID.PushBack(riderID)
    this.cancelledRequestsRidersID[riderID] = false
}

func (this *RideSharingSystem) AddDriver(driverID int) {
    this.availableDriversID.PushBack(driverID)
}

func (this *RideSharingSystem) MatchDriverWithRider() []int {
    if this.availableDriversID.Len() == 0 {
        return IMPOSSIBLE_TO_MATCH_DRIVER_WITH_RIDER
    }

    for this.requestsRidersID.Len() > 0 {
        riderID := this.requestsRidersID.Remove(this.requestsRidersID.Front()).(int)
        if !this.cancelledRequestsRidersID[riderID] {
            this.cancelledRequestsRidersID[riderID] = true
            driverID := this.availableDriversID.Remove(this.availableDriversID.Front()).(int)
            return []int{driverID, riderID}
        }
    }
    return IMPOSSIBLE_TO_MATCH_DRIVER_WITH_RIDER
}

func (this *RideSharingSystem) CancelRider(riderID int) {
    this.cancelledRequestsRidersID[riderID] = true
}
