class ListNode<T>
{
    public next!: ListNode<T>;

    constructor(
        public readonly data: T
    ) {
    }
}

class LinkedList<T>
{
    constructor(
        public head: ListNode<T>
    ) {
    }

    public toList(limitFromHead=Infinity): T[]
    {
        const list = [];
        let head: ListNode<T>["next"] = this.head;

        let i = 0;
        do {
            list.push(head!.data);
            head = head!.next;
            i++;
        } while(head !== this.head && i < limitFromHead);

        return list;
    }
}
type LinkedMapList<T> = Map<T, ListNode<T>>;

function playCrabGame(allCupsNumbers: number[], totalRounds: number, minCupLabel: number, maxCupLabel: number): ListNode<number>
{
    const list = new LinkedList(new ListNode(allCupsNumbers[0]));
    const map: LinkedMapList<number> = new Map([[list.head.data, list.head]]);
    let prev = list.head;
    for (let i = 1; i < allCupsNumbers.length; i++) {
        const node = new ListNode(allCupsNumbers[i]);
        map.set(allCupsNumbers[i], node);

        prev.next = node;
        prev = node;
    }
    // circular linked list
    prev.next = list.head!;

    let currentHead = list.head;

    for (let round = 0; round < totalRounds; round++) {
        //console.log(`\n-- move ${round + 1} --`);
        //console.log(`cups: ${list.toList().map(n => n === currentHead.data ? `(${n})` : n).join(" ")}`);

        const pickUpNodesStart = currentHead.next;
        const pickUpNodesEnd = currentHead.next.next.next;
        const pickUp = new LinkedList(currentHead.next).toList(3);
        currentHead.next = currentHead.next.next.next.next;
        let destination = currentHead.data - 1;
        while (pickUp.indexOf(destination) > -1 || destination < minCupLabel) {
            destination--;
            if (destination < minCupLabel) {
                destination = maxCupLabel;
            }
        }

        //console.log(`pick up: ${pickUp.join(", ")}`);
        //console.log(`destination: ${destination}`);

        if (!map.has(destination)) {
            console.log(`destination ${destination} not found in map: ${[...map.keys()]}`);
            throw 'BUG';
        }

        const destinationNode = map.get(destination)!;
        pickUpNodesEnd.next = destinationNode.next;
        destinationNode.next = pickUpNodesStart;

        currentHead = currentHead.next;
    }

    //console.log(`-- final --`);
    //console.log(`cups: ${list.toList().map((c, i) => i === currentHead.data ? `(${c})` : c).join(" ")}`);

    return map.get(1)!;
}

export function countPart1(allCupsNumbers: number[], totalRounds: number): number
{
    const gameResult = playCrabGame(
        allCupsNumbers,
        totalRounds,
        Math.min.apply(undefined, allCupsNumbers),
        Math.max.apply(undefined, allCupsNumbers)
    );

    return Number(new LinkedList<number>(gameResult.next).toList(allCupsNumbers.length - 1).join(""));
}

export function countPart2(input: number[]): number
{
    const max = Math.max.apply(undefined, input);
    const allCupNumbers = [...input, ...Array.from({length: 1e6-max}, (_, i) => max + 1 + i)];

    const gameResult = playCrabGame(allCupNumbers, 1e7, Math.min.apply(undefined, input), 1e6);

    return gameResult.next.data * gameResult.next.next.data;
}
