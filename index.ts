import { computeSolution } from "@/advent"

const [year, day] = [Number(process.argv[2]), Number(process.argv[3])]

if (!year || !day) {
  console.error('Please provide year and day as arguments')
  process.exit(1)
}

computeSolution(year, day)
