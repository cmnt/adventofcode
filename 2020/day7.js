const {
    getData
} = require('./input');

(async () => {
    const data = await getData(7);
    const puzzle = data.data.split('\n');
    puzzle.length = puzzle.length - 1;
    // console.log(puzzle);
    console.log(resultPart1(puzzle));
    console.log(resultPart2(puzzle));
})();

const resultPart1 = (puzzle) => {
    const colorRules = puzzle.reduce((colorRules, rule) => addRule(colorRules, rule), {});
    const numberRulesContainShinyGold = Object.keys(colorRules).reduce((number, color) => isRuleContainShinyGoldBag(colorRules, color) ? number + 1 : number, 0);
    return numberRulesContainShinyGold;
};

const resultPart2 = (puzzle) => {
    const colorRules = puzzle.reduce((colorRules, rule) => addRule(colorRules, rule), {});
    const quantityBags = sumBags(colorRules, 'shiny gold');
    return quantityBags;
};

const addRule = (colorRules, rule) => {
    const [dirtyColorName, dirtyContainText] = rule.slice(0, -1).split('contain');
    const colorName = extractColorName(dirtyColorName);
    const contains = dirtyContainText.split(',')
        .filter(isColorBag)
        .map(extractColorName);
    colorRules[colorName] = contains;
    return colorRules;
};

const isColorBag = (textColorBag) => !textColorBag.trim().startsWith('no other');
const extractColorName = (textColorBag) => {
    const isColorRuleName = !textColorBag.startsWith(' ');
    if (isColorRuleName) {
        return textColorBag.slice(0, -6);
    }
    const quantity = parseInt(textColorBag);
    const indexBag = textColorBag.indexOf('bag');

    const colorContainName = textColorBag.slice(3, indexBag - 1);
    return {
        color: colorContainName,
        qte: quantity
    };
};

const isRuleContainShinyGoldBag = (colorRules, color) => {
    if (!colorRules[color].length) {
        return false;
    }
    if (colorRules[color].some(colorContain => colorContain.color === 'shiny gold')) {
        return true;
    }
    return colorRules[color].some((colorContain) => isRuleContainShinyGoldBag(colorRules, colorContain.color));
};

const sumBags = (colorRules, color) => {
    return colorRules[color].reduce((sum, colorRule) => sum + colorRule.qte + (colorRule.qte * sumBags(colorRules, colorRule.color)), 0);
};