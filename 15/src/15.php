<?php declare(strict_types = 1);

function countPart2(array $input): int
{
    return calculateNth($input, (int)3e7);
}

function calculateNth(array $input, int $nth): int {
    $start = new DateTime();
    $previousNumber = $input[count($input) - 1];
    $indexes = [];

    for ($i = 0; $i < count($input) - 1; $i++) {
        $indexes[$input[$i]] = $i + 1;
    }

    for ($i = count($input); $i < $nth; $i++) {
        if (!isset($indexes[$previousNumber])) {
            $indexes[$previousNumber] = $i;
            $previousNumber = 0;
        } else {
            $pn = $previousNumber;
            $previousNumber = $i - $indexes[$previousNumber];
            $indexes[$pn] = $i;
        }
    }

    $end = new DateTime();

    var_dump($start, $end);

    return $previousNumber;
}

// 6s in php 7.3
// 4,5s in php 8.0
var_dump(countPart2([5,1,9,18,13,8,0]));
