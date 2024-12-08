const _ = require('lodash');
const { getData } = require('./input');

(async () => {
  const data = await getData(16);
  const puzzle = data.data.split('\n');
  puzzle.length -= 1;
  console.log(resultPart1(puzzle));
  console.log(resultPart2(puzzle));
})();

const example = [
  'class: 1-3 or 5-7',
  'row: 6-11 or 33-44',
  'seat: 13-40 or 45-50',
  '',
  'your ticket:',
  '7,1,14',
  '',
  'nearby tickets:',
  '7,3,47',
  '40,4,50',
  '55,2,20',
  '38,6,12',
];

const resultPart1 = (puzzle) => {
  const [ranges, yourTicket, nearbyTickets] = extractInformationsFromTicket(puzzle);
  const invalidFields = _.flatten(nearbyTickets).filter((field) => !isInRanges(field, ranges));

  return invalidFields.reduce((acc, field) => acc + field, 0);
};

const extractInformationsFromTicket = (ticket) => {
  const yourTicketIndex = ticket.indexOf('your ticket:');
  const yourNearbyTicketIndex = ticket.indexOf('nearby tickets:');

  const rangeLines = ticket.slice(0, yourTicketIndex - 1);
  const ranges = fusionRanges(extractRange(rangeLines));

  const yourticket = ticket.slice(yourTicketIndex + 1, yourTicketIndex + 2)[0].split(',').map(Number);
  const nearbytickets = ticket.slice(yourNearbyTicketIndex + 1).map((tick) => tick.split(',').map(Number));

  return [ranges, yourticket, nearbytickets];
};

const extractRange = (dirtyRange) => dirtyRange.reduce((baseRanges, line) => {
  const titleIndex = line.indexOf(':');
  const lineRanges = line.slice(titleIndex + 1);
  const ranges = lineRanges.split('or').map((r) => r.trim().split('-').map(Number));

  return [...baseRanges, ...ranges];
}, []);

const fusionRanges = (ranges) => ranges.reduce((cleanRanges, range) => {
  const [min, max] = range;

  for (let index = 0; index < cleanRanges.length; index += 1) {
    const [cleanMin, cleanMax] = cleanRanges[index];

    if ((max + 1) >= cleanMin && (min - 1) <= cleanMax) {
      cleanRanges[index] = [Math.min(min, cleanMin), Math.max(max, cleanMax)];
      return cleanRanges;
    }
  }
  cleanRanges.push(range);
  return cleanRanges;
}, []);

const isInRanges = (field, ranges) => {
  for (let index = 0; index < ranges.length; index += 1) {
    if (isInRange(field, ranges[index])) {
      return true;
    }
  }
  return false;
};

const isInRange = (field, range) => {
  const [min, max] = range;
  return field >= min && field <= max;
};

// PART 2

const resultPart2 = (puzzle) => {
  const [titles, yourTicket, nearbyTickets] = extractInformationsFromTicketPart2(puzzle);
  const nearbyValidTickets = nearbyTickets.filter((ticketFields) => ticketFields.every((field) => isInRanges(field, _.flatten(titles.map((title) => title.ranges)))));

  const titlesWithColumnsAvalaibled = getRangesWithColumnAvalaible(titles, nearbyValidTickets);
  const titlesWithColumnMatch = matchColumns(titlesWithColumnsAvalaibled);

  const res = titlesWithColumnMatch
    .filter((title) => title.title.startsWith('departure'))
    .map((title) => yourTicket[title.columnAvalaibled[0]])
    .reduce((mult, field) => mult * field);
  return res;
};

const extractInformationsFromTicketPart2 = (ticket) => {
  const yourTicketIndex = ticket.indexOf('your ticket:');
  const yourNearbyTicketIndex = ticket.indexOf('nearby tickets:');

  const rangeLines = ticket.slice(0, yourTicketIndex - 1);
  const ranges = extractRangePart2(rangeLines);

  const yourticket = ticket.slice(yourTicketIndex + 1, yourTicketIndex + 2)[0].split(',').map(Number);
  const nearbytickets = ticket.slice(yourNearbyTicketIndex + 1).map((tick) => tick.split(',').map(Number));

  return [ranges, yourticket, nearbytickets];
};

const extractRangePart2 = (dirtyRange) => dirtyRange.reduce((baseRanges, line) => {
  const titleIndex = line.indexOf(':');
  const title = line.slice(0, titleIndex);
  const lineRanges = line.slice(titleIndex + 1);
  const ranges = lineRanges.split('or').map((r) => r.trim().split('-').map(Number));

  baseRanges.push({ title, ranges, columnAvalaibled: [...Array(dirtyRange.length).keys()] });

  return baseRanges;
}, []);

const getRangesWithColumnAvalaible = (titles, tickets) => {
  tickets.map((ticket) => {
    ticket.map((field, indexColumn) => {
      titles.map((title) => title.ranges).map((ranges, indexTitle) => {
        const isIncludeInRange = isInRanges(field, ranges);
        if (!isIncludeInRange) {
          titles[indexTitle].columnAvalaibled = titles[indexTitle].columnAvalaibled.filter((column) => column !== indexColumn);
        }
      });
    });
  });

  return titles;
};

const matchColumns = (titles) => {
  titles.sort((title1, title2) => title1.columnAvalaibled.length - title2.columnAvalaibled.length);
  const columnUsed = [];
  titles.map((title, index, array) => {
    title.columnAvalaibled = title.columnAvalaibled.filter((c) => !columnUsed.includes(c));
    if (title.columnAvalaibled.length === 1) {
      columnUsed.push(title.columnAvalaibled[0]);
    }
  });
  return titles;
};
