const {
    getData
} = require("./input");

(async () => {
    const data = await getData(6);
    const puzzle = data.data.split('\n');
    puzzle.length = puzzle.length - 1;
    // console.log(puzzle);
    console.log(resultPart1(puzzle));
    console.log(resultPart2(puzzle));
})()

const resultPart1 = (puzzle) => {
    const matrice = transformPuzzleToMatrice(puzzle);
    const groupDistinctAnswers = matrice.map(groupAnswers => getGroupDistinctAnswers(groupAnswers))
    return groupDistinctAnswers.reduce((sum, distinctAnswerGroup) => sum + distinctAnswerGroup.length, 0)
}

const resultPart2 = (puzzle) => {
    const matrice = transformPuzzleToMatrice(puzzle);
    const groupUnionAnswers = matrice.map(groupAnswers => getGroupUnionAnswers(groupAnswers))
    return groupUnionAnswers.reduce((sum, distinctAnswerGroup) => sum + distinctAnswerGroup.length, 0)
}

const transformPuzzleToMatrice = (puzzle) => {
    return puzzle.reduce((matrice, line) => {
        if (!line.length) {
            matrice.push([]);
            return matrice;
        }

        const answerGroup = matrice[matrice.length - 1];
        answerGroup.push(line)

        return matrice
    }, [
        []
    ])
}

const getGroupDistinctAnswers = (groupAnswers) => {
    return groupAnswers.reduce((groupDistinctAnswers, personAnswers) => {
        personAnswers.split('').map((answer) => {
            if (!groupDistinctAnswers.includes(answer)) {
                groupDistinctAnswers.push(answer);
            }
        })
        return groupDistinctAnswers;
    }, [])
}

const getGroupUnionAnswers = (groupAnswers) => {
    const FirstPersonAnswers = groupAnswers[0].split('');
    const groupWithoutFirstPersonAnswers = groupAnswers.slice(1);

    return FirstPersonAnswers.reduce((groupUnionAnswers, answer) => {
        if (groupWithoutFirstPersonAnswers.every((personAnswers) => personAnswers.includes(answer))) {
            groupUnionAnswers.push(answer);
        }
        return groupUnionAnswers;
    }, [])
}