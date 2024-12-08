export const fetchInput = async (year: number, dayNum: number) => {
  try {
    const response = await fetch(`https://adventofcode.com/${year}/day/${dayNum}/input`, {
      headers: {
        cookie: `session=${process.env.SESSION};`,
      },
    })
    return response.text()
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

export const formatToArray = (input: string, type: string) => input.trim().split('\n').map((text) => {
  if (type === 'int') {
    return parseInt(text)
  }
  return text
})

