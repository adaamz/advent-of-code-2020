type Card = number;

type Player = {
    id: number;
    cards: Card[];
};

export function countPart1(input: string): number
{
    const playersGroups = parseInput(input);
    const winner = play(playersGroups);

    let multiplier = winner.cards.length;

    return winner.cards.reduce((prev: number, val: number) => prev + (val * multiplier--), 0);
}

export function countPart2(input: string): number
{
    const players = parseInput(input);
    const [winnerIndex, loserIndex] = playRecurse(players, 1, 1);
    const winner = players[winnerIndex];

    let multiplier = winner.cards.length;

    return winner.cards.reduce((prev: number, val: number) => prev + (val * multiplier--), 0);
}

function play(players: [Player, Player]): Player
{
    while (players.every(player => player.cards.length > 0)) {
        playTurn(players, [[], []]);
    }

    return players.filter(player => player.cards.length > 0)[0];
}

function playTurn(players: [Player, Player], decks: [Card[], Card[]]): void
{
    const firstPlayerCard = players[0].cards.shift()!;
    const secondPlayerCard = players[1].cards.shift()!;
    decks[0].push(firstPlayerCard);
    decks[1].push(secondPlayerCard);

    if (firstPlayerCard > secondPlayerCard) {
        players[0].cards.push(...decks[0], ...decks[1]);
    } else if (secondPlayerCard > firstPlayerCard) {
        players[1].cards.push(...decks[1], ...decks[0]);
    } else {
        decks[0].push(players[0].cards.shift()!);
        decks[0].push(players[0].cards.shift()!);
        decks[1].push(players[1].cards.shift()!);
        decks[1].push(players[1].cards.shift()!);
        playTurn(players, decks);
    }
}

function playRecurse(players: [Player, Player], round: number, game: number): [number, number]
{
    //console.log(`\n=== Game ${game} ===`);
    const previousRounds: [Player["cards"][], Player["cards"][]] = [[], []];

    while (players.every(player => player.cards.length > 0)) {
        if (containsList(previousRounds[0], players[0].cards) && containsList(previousRounds[1], players[1].cards)) {
            //console.log(`Deck of both players is repeated in game ${game} and round ${round}! Player 1 is winner`);
            return [0, 1];
        }

        previousRounds[0].push([...players[0].cards]);
        previousRounds[1].push([...players[1].cards]);

        playRecurseTurn(players, [[], []], round++, game);
    }

    return players[0].cards.length > 0 ? [0, 1] : [1, 0];
}

function playRecurseTurn(players: [Player, Player], decks: [Card[], Card[]], round: number, game: number): [number, number]
{
    //console.log(`\n-- Round ${round} (Game ${game}) --`);
    //console.log(`Player 1's deck: ${players[0].cards.join(", ")}`);
    //console.log(`Player 2's deck: ${players[1].cards.join(", ")}`);

    const firstPlayerCard = players[0].cards.shift()!;
    const secondPlayerCard = players[1].cards.shift()!;
    decks[0].push(firstPlayerCard);
    decks[1].push(secondPlayerCard);

    //console.log(`Player 1 plays: ${firstPlayerCard}`);
    //console.log(`Player 2 plays: ${secondPlayerCard}`);

    if (players[0].cards.length >= firstPlayerCard && players[1].cards.length >= secondPlayerCard) {
        //console.log("Playing a sub-game to determine the winner...");
        const [winner, loser] = playRecurse(
            [
                {
                    id: players[0].id,
                    cards: players[0].cards.slice(0, firstPlayerCard),
                },
                {
                    id: players[1].id,
                    cards: players[1].cards.slice(0, secondPlayerCard),
                }
            ], 1, game + 1);
        //console.log(`The winner of game ${game + 1} is player ${players[winner].id}!`);
        players[winner].cards.push(...decks[winner], ...decks[loser]);
        return [winner, loser];
    }

    if (firstPlayerCard > secondPlayerCard) {
        players[0].cards.push(...decks[0], ...decks[1]);
        //console.log(`Player 1 wins the round ${round} of game ${game}!`);
        return [0, 1];
    } else if (secondPlayerCard > firstPlayerCard) {
        players[1].cards.push(...decks[1], ...decks[0]);
        //console.log(`Player 2 wins the round ${round} of game ${game}!`);
        return [1, 0];
    } else {
        decks[0].push(players[0].cards.shift()!);
        decks[0].push(players[0].cards.shift()!);
        decks[1].push(players[1].cards.shift()!);
        decks[1].push(players[1].cards.shift()!);
        return playRecurseTurn(players, decks, round + 1, game);
    }
}

function parseInput(input: string): [Player, Player]
{
    const playerGroups = input.split("\n\n");

    const players: Player[] = [];

    for (const playerGroup of playerGroups) {
        const lines = playerGroup.split("\n");

        players.push({
            id: Number(lines[0].slice("Player ".length, -1)),
            cards: lines.slice(1).map(Number),
        });
    }

    return players as [Player, Player];
}

function containsList(listOfLists: number[][], list: number[]): boolean
{
    return listOfLists.filter(a => a.length === list.length && Object.keys(a).every(k => list[Number(k)] === a[Number(k)])).length > 0;
}
