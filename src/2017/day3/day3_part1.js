/**
 *  x x x d x x x 
 *  x - - - - - x 
 *  x - - - - - x
 *  d - - 1 - - d
 *  x - - - - - x
 *  x - - - - - x (min)
 *  x x x d x x x (max)
 *  <----------->
 *      side
 * 
 *  x and d shape the square
 *  d : nearest points to 1  
 * 
 */
const getDistance = (number) => {
  let side = 1; // side dimension

  while (number > Math.pow(side, 2)) {
    side += 2;
  }

  const min = Math.pow(side - 2, 2) + 1; // min number of the "square"
  // const max = Math.pow(side, 2); // max number of the square
  const shortestDistance = Math.floor(side / 2);

  const d1 = min + (side - 2) - ((side - 1) / 2);

  const nearestPoints = [d1,
    d1 + (side - 1),
    d1 + 2 * (side - 1),
    d1 + 3 * (side - 1)
  ]

  let shortDistanceToNearestNumber = Math.abs(number - nearestPoints[0]);

  for (let point of nearestPoints) {
    const distance = Math.abs(number - point);
    shortDistanceToNearestNumber = Math.min(distance, shortDistanceToNearestNumber);
  }

  const result = shortDistanceToNearestNumber + shortestDistance;
  return result;
}
