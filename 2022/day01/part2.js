const fs = require('fs')

;(async () => {
    const input = fs.readFileSync('./input_1.txt', 'utf8')
    const elves = input
        .split('\n\n')
        .map((line, index) => ({ number: index, food: line.split('\n') }))
        .map((elf) => ({
            ...elf,
            totalCalories: elf.food.reduce(
                (acc, cur) => acc + parseInt(cur),
                0
            ),
        }))
        .sort((a, b) => a.totalCalories - b.totalCalories)

    const topElvesWithTheMostCalories = elves.slice(-3)
    const totalCalories = topElvesWithTheMostCalories.reduce(
        (acc, cur) => acc + cur.totalCalories,
        0
    )
    console.log({ topElvesWithTheMostCalories, totalCalories })
})()
