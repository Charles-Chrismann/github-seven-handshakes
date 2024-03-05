const searched = [
  ['Nihyakunanajuni'],
  ['vshinori', 'Elicue', 'Charles-Chrismann', 'tom-tamen'],
  [
    'DisturbedBanana',
    'Rikougo',
    'hbarrier',
    'Thibaut-Francois',
    'Sarayeo',
    'KishiniCHL'
  ]
]

function getSearchedLevels(levels: number) {
  return Array.from(new Set(searched.slice(0 , levels + 1).flat()))
}

console.log(getSearchedLevels(1))