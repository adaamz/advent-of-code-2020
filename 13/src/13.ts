export function countPart1(input: string[]): number
{
    const now = Number(input[0]);
    const workingBuses = input[1].split(",").filter(line => line !== 'x').map(Number);
    let minTimeArrival: [number, number] = [Infinity, 0];

    for (const bus of workingBuses) {
        const arrival = Math.ceil(now / bus) * bus;
        if (minTimeArrival[0] > arrival) {
            minTimeArrival = [arrival, bus];
        }
    }

    return (minTimeArrival[0] - now) * minTimeArrival[1];
}

// part 2 not implemented
