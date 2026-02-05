
using System;
using System.Collections.Generic;

public class RideSharingSystem
{
    private static readonly int[] RANGE_ID_FOR_RIDERS_AND_DRIVERS = [1, 1000];
    private static readonly int[] IMPOSSIBLE_TO_MATCH_DRIVER_WITH_RIDER = [-1, -1];

    private readonly Queue<int> requestsRidersID = [];
    private readonly Queue<int> availableDriversID = [];
    private readonly bool[] cancelledRequestsRidersID = new bool[RANGE_ID_FOR_RIDERS_AND_DRIVERS[1] + 1];

    public void AddRider(int riderID)
    {
        requestsRidersID.Enqueue(riderID);
        cancelledRequestsRidersID[riderID] = false;
    }

    public void AddDriver(int driverID)
    {
        availableDriversID.Enqueue(driverID);
    }

    public int[] MatchDriverWithRider()
    {
        if (availableDriversID.Count == 0)
        {
            return IMPOSSIBLE_TO_MATCH_DRIVER_WITH_RIDER;
        }

        while (requestsRidersID.Count > 0)
        {
            int riderID = requestsRidersID.Dequeue();
            if (!cancelledRequestsRidersID[riderID])
            {
                cancelledRequestsRidersID[riderID] = true;
                int driverID = availableDriversID.Dequeue();
                return [driverID, riderID];
            }
        }
        return IMPOSSIBLE_TO_MATCH_DRIVER_WITH_RIDER;
    }

    public void CancelRider(int riderID)
    {
        cancelledRequestsRidersID[riderID] = true;
    }
}
