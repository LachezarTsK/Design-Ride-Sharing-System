
import java.util.LinkedList;
import java.util.Queue;

public class RideSharingSystem {

    private static final int[] RANGE_ID_FOR_RIDERS_AND_DRIVERS = {1, 1000};
    private static final int[] IMPOSSIBLE_TO_MATCH_DRIVER_WITH_RIDER = {-1, -1};

    private final Queue<Integer> requestsRidersID = new LinkedList<>();
    private final Queue<Integer> availableDriversID = new LinkedList<>();
    private final boolean[] cancelledRequestsRidersID = new boolean[RANGE_ID_FOR_RIDERS_AND_DRIVERS[1] + 1];

    public void addRider(int riderID) {
        requestsRidersID.add(riderID);
        cancelledRequestsRidersID[riderID] = false;
    }

    public void addDriver(int driverID) {
        availableDriversID.add(driverID);
    }

    public int[] matchDriverWithRider() {
        if (availableDriversID.isEmpty()) {
            return IMPOSSIBLE_TO_MATCH_DRIVER_WITH_RIDER;
        }

        while (!requestsRidersID.isEmpty()) {
            int riderID = requestsRidersID.poll();
            if (!cancelledRequestsRidersID[riderID]) {
                cancelledRequestsRidersID[riderID] = true;
                int driverID = availableDriversID.poll();
                return new int[]{driverID, riderID};
            }
        }
        return IMPOSSIBLE_TO_MATCH_DRIVER_WITH_RIDER;
    }

    public void cancelRider(int riderID) {
        cancelledRequestsRidersID[riderID] = true;
    }
}
