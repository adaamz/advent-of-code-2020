export function findMissingNumberInList(list: number[]): number
{
    let a = 0;
    let b = list.length - 1;
    let mid = 0;

    while ((b - a) > 1) {
        mid = Math.floor((a + b) / 2);
        if (list[a] - a !== list[mid] - mid) {
            b = mid;
        } else if (list[b] - b !== list[mid] - mid) {
            a = mid;
        }
    }

    return list[mid] + 1;
}
