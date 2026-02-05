
#include <array>
#include <vector>
#include <queue>
using namespace std;

class RideSharingSystem {

    static constexpr array<int, 2> RANGE_ID_FOR_RIDERS_AND_DRIVERS{ 1, 1000 };
    inline static vector<int> IMPOSSIBLE_TO_MATCH_DRIVER_WITH_RIDER{ -1, -1 };

    queue<int> requestsRidersID;
    queue<int> availableDriversID;
    array<bool, RANGE_ID_FOR_RIDERS_AND_DRIVERS[1] + 1> cancelledRequestsRidersID{};

public:
    RideSharingSystem() = default;

    void addRider(int riderID) {
        requestsRidersID.push(riderID);
        cancelledRequestsRidersID[riderID] = false;
    }

    void addDriver(int driverID) {
        availableDriversID.push(driverID);
    }

    vector<int> matchDriverWithRider() {
        if (availableDriversID.empty()) {
            return IMPOSSIBLE_TO_MATCH_DRIVER_WITH_RIDER;
        }

        while (!requestsRidersID.empty()) {
            int riderID = requestsRidersID.front();
            requestsRidersID.pop();

            if (!cancelledRequestsRidersID[riderID]) {
                cancelledRequestsRidersID[riderID] = true;
                int driverID = availableDriversID.front();
                availableDriversID.pop();
                return { driverID, riderID };
            }
        }
        return IMPOSSIBLE_TO_MATCH_DRIVER_WITH_RIDER;
    }

    void cancelRider(int riderID) {
        cancelledRequestsRidersID[riderID] = true;
    }
};
