const users = [
  {
    user: 'Nihyakunanajuni',
    followings: [ 'vshinori', 'Elicue', 'Charles-Chrismann', 'tom-tamen' ]
  },
  {
    user: 'vshinori',
    followings: [ 'DisturbedBanana', 'Rikougo', 'Nihyakunanajuni' ]
  },
  {
    user: 'Elicue',
    followings: [
      'hbarrier',          'Thibaut-Francois',
      'Sarayeo',           'KishiniCHL',
      'EthraDev',          'bastienR17',
      'Lyn1603',           'DragiboO',
      'alexzerah',         'Elyn03',
      'Arthur-Prudhomme',  'pgrimaud',
      'tom-tamen',         'Foword5',
      'ProfCitron',        'Lainocs',
      'Charles-Chrismann'
    ]
  },
  {
    user: 'Charles-Chrismann',
    followings: [
      '-',
      'ChampiEZ',
      'Clansou',
      'lucaschrng',
      'FannyGautierr',
      'AznTufu',
      'pgrimaud',
      'yannisobert',
      'duuusa',
      'AntoineBendafiSchulmann',
      'Nihyakunanajuni',
      'SorenMesselier-Sentis',
      'Lainocs',
      'tom-tamen',
      'R4tonBaveur',
      'Cosmeak',
      'Foword5',
      'CanarDev',
      'BenjaminBrehier',
      'Elicue',
      'Cmfauvel'
    ]
  },
  {
    user: 'tom-tamen',
    followings: [
      'FrAmbroise',
      'alexzerah',
      'Romain-Parisot',
      'AznTufu',
      'pgrimaud',
      'Nihyakunanajuni',
      'Elicue',
      'Lainocs',
      'Charles-Chrismann'
    ]
  },
  {
    user: 'DisturbedBanana',
    followings: [
      'EpicGames',
      'doctor4t',
      'Birox1er',
      'TheValll',
      'Nihyakunanajuni',
      'vshinori',
      'Rikougo',
      'KorYme',
      'parashie',
      'cyperdark',
      'itsgloby',
      'SirLynix'
    ]
  },
  {
    user: 'Rikougo',
    followings: [
      'FreshlyBrewedCode',
      'Nihyakunanajuni',
      'DisturbedBanana',
      'Camille-Bernadas',
      'MinaPecheux',
      'Syl23',
      'vshinori',
      '0Balkis'
    ]
  },
  { user: 'hbarrier', followings: [ 'hadley' ] },
  {
    user: 'Thibaut-Francois',
    followings: [ 'bilgenur52', 'jelaip', 'Charles-Chrismann', 'yannisobert' ]
  },
  {
    user: 'Sarayeo',
    followings: [
      'FionaVrt',
      'MicrosoftDocs',
      'ThomasCandille',
      'Arthur-Prudhomme',
      'alexzerah',
      'bastienR17',
      'Lawberryy',
      'Elicue',
      'Elyn03',
      'pgrimaud',
      'arthur881',
      'Lyn1603',
      'REIG3N',
      'SorenMesselier-Sentis',
      'duuusa',
      'Lainocs',
      'Pierrooooo',
      'AlexisSensei',
      'ProfCitron',
      'Cosmeak',
      'AlexGybou',
      'IIM-Creative-Technology',
      'La-404-Devinci',
      'CanarDev'
    ]
  },
  {
    user: 'KishiniCHL',
    followings: [
      'REIG3N',     'Elyn03',
      'bastienR17', 'Elicue',
      'Lyn1603',    'lucaschrng',
      'SebouChu',   'KeroSong',
      'x381'
    ]
  },
  { user: 'EthraDev', followings: [ 'Arthur-Prudhomme' ] },
  {
    user: 'bastienR17',
    followings: [
      'GarnierQuentin',   'Enzdo',
      'arthur881',        'alexzerah',
      'Arthur-Prudhomme', 'Elyn03',
      'KishiniCHL',       'Lawberryy',
      'Elicue',           'TuberculeP',
      'pgrimaud',         'REIG3N',
      'Sarayeo',          'Brean2010',
      'Lyn1603',          'ImDimeh'
    ]
  },
  {
    user: 'Lyn1603',
    followings: [
      'ProfCitron',
      'CanarDev',
      'FionaVrt',
      'GarnierQuentin',
      'Code-Nam',
      'Elyn03',
      'Lawberryy',
      'Elicue',
      'KishiniCHL',
      'ImDimeh',
      'bastienR17'
    ]
  },
  {
    user: 'DragiboO',
    followings: [
      'alexzerah',
      'pgrimaud',
      'Elicue',
      'Arthur-Prudhomme',
      'Scarboule',
      'AntoineBendafiSchulmann',
      'ricardo-plp'
    ]
  },
  {
    user: 'alexzerah',
    followings: [
      'Lainocs',
      'jelaip',
      'benrobaglia',
      'getify',
      'RedHotMan',
      'pgrimaud',
      'xavierlacot',
      'remyvanlerberghe',
      'GouteixAntoine',
      'angulartist'
    ]
  },
  {
    user: 'Elyn03',
    followings: [
      'GarnierQuentin',
      'KishiniCHL',
      'Thibaut-Francois',
      'bastienR17',
      'Sarayeo',
      'Elicue',
      'Lyn1603',
      'pgrimaud',
      'bytesoftheweb'
    ]
  },
  {
    user: 'Arthur-Prudhomme',
    followings: [
      'Charles-Chrismann', 'pgrimaud',
      'Sarayeo',           'KishiniCHL',
      'DalSchim',          'Elyn03',
      'AnrelWsh',          'TuberculeP',
      'REIG3N',            'bastienR17',
      'Thibaut-Francois',  'lucaschrng',
      'alexzerah',         'Clansou',
      'DragiboO',          'EthraDev',
      'Pl83',              'Elicue',
      'Scarboule',         'louis-prudhomme'
    ]
  },
  {
    user: 'pgrimaud',
    followings: [
      'sezane',          'typo-terminator',  'GuillaumeRx',
      'FannyGautierr',   'Qadadain',         'EdouardCourty',
      'bodint',          'yannisobert',      'maosing',
      'IMX-Rarity',      'AkramDevelopment', 'HeinrichWizardKreuser',
      'dunglas',         'h-lavergne',       'lebrunthibault',
      'Nispeon',         'nfabre',           'fkorotkov',
      'dseguy',          'aahdrien',         'AlexGybou',
      'Ocramius',        'juliettegirin',    'DimitriBertin',
      'rhannequin',      'angulartist',      'nunomaduro',
      'nicolasbonnici',  'benjh',            'matks',
      'nicolas-grekas',  'aerostitch',       'Adriench',
      'quentinjolliet',  'plaitse',          'ravigehlot',
      'nikic',           'TimPrd',           'kcassam',
      'Balatzar',        'devglrd',          'CDevJenny',
      'ghisleouf',       'Alxss',            'Aurorelanchart',
      'charlesslv',      'matyo91',          'alextoudic',
      'rianfloo',        'lovenunu',         'loiclau',
      'pievalentin',     'flomarin88',       'devaublanc',
      'salutmarine',     'FuriouZz',         'Fabax',
      'flebap',          'kolinw',           'kalelnojutsu',
      'Shipow',          'JeremyGreaux',     'tmeghe',
      'nicolas-brousse', 'yanis-git',        'hervetran',
      'tlenclos',        'jduval'
    ]
  },
  {
    user: 'Foword5',
    followings: [
      'Charles-Chrismann',
      'Alexandre-Roussel48',
      'aureliennicosia',
      'Lelievre-david',
      'R4tonBaveur',
      'BenjaminBrehier'
    ]
  },
  { user: 'ProfCitron', followings: [] },
  {
    user: 'Lainocs',
    followings: [
      'thebrowsercompany', 'adonisjs',            'GabrielTowd',
      'alex-coda-13',      'musiqueJS',           'jelaip',
      'BrayanOfficiel',    'iciamyplant',         'Alliajrj',
      'guigzlsx',          'Leoratz',             'Alexi-Reyes',
      'Sol1de',            'ThomasCandille',      'GarnierQuentin',
      'Wolap',             'Tyro951',             'HosenMohsen',
      'Noah-Sfez',         'AntoineSP01',         'Leo-Riche',
      'alyssialopr',       'loucabaigneres',      'Roland-HUON',
      'Code-Nam',          'Aurore-Dimech',       'JulieNgov',
      'herm09',            'Dutofu',              'RomainRy',
      'DimitriZindovic',   'Timotheedv',          'Raphael-Chiche',
      'Maissack',          'SpiderBanana',        'MokoyS',
      'yanibougara',       'Fl0-94',              'BrunicFeyou',
      'FionaVrt',          'MarquesThomasCoding', 'Nassimr92',
      'Mrpierrouge',       'AnthxnyL',            'cactusninjaa',
      'maxencevdg',        '26jeff',              'Elicue',
      'apple',             'Kan-A-Pesh',          'FannyGautierr',
      'ZilbaM',            'MaxenceLecoq921',     'codediodeio',
      'firebase',          'RyomaQ',              'JulienQ1',
      'camiogli',          'L-ocho92',            'NicoiseNkounkou',
      'priscand',          'mely-h',              'mathildejjt',
      'fullmc',            'marieludivine',       'Chad92',
      'camille-amandine',  'Oumarjalloh',         'Olibstl',
      'fandango97',        'HyTaXx',              'admsmn02',
      'aarena18',          'ChampiEZ',            'Janknn',
      'TuberculeP',        'jstnate',             'alexzerah',
      'La-404-Devinci',    'Charles-Chrismann',   'MrYamous',
      'EdouardCourty',     'Mitsuya77',           'Arthur-Lucas',
      'ProfCitron',        'bdebon',              'NicolasMGT',
      'PierreCAILLET',     'bsisic',              'JulieBsnrd',
      'Cosmeak',           'yyx990803',           'taylorotwell',
      'Lockev',            'SASNOVACAT08',        'Zoemchl',
      'matdn',             'Pierrooooo',          'aleperdriel',
      'yannisobert'
    ]
  },
  { user: '-', followings: [] },
  { user: 'ChampiEZ', followings: [ 'Charles-Chrismann' ] },
  {
    user: 'Clansou',
    followings: [
      'symfony',
      'Charles-Chrismann',
      'lucaschrng',
      'CanarDev',
      'Arthur-Prudhomme',
      'HyTaXx',
      'FannyGautierr',
      'Scarboule',
      'pgrimaud',
      'FidelsGastro'
    ]
  },
  {
    user: 'lucaschrng',
    followings: [
      'Clansou',
      'Scarboule',
      'CanarDev',
      'FannyGautierr',
      'pgrimaud',
      'KishiniCHL',
      'AlexisSensei'
    ]
  },
  {
    user: 'FannyGautierr',
    followings: [
      'hasura',
      'iciamyplant',
      'Gabrielnko',
      'LenaGautier',
      'QuentinDecobert',
      'typo-terminator',
      'Clansou',
      'Lainocs',
      'SorenMesselier-Sentis',
      'Cosmeak',
      'pgrimaud',
      'Charles-Chrismann',
      'duuusa',
      'vassilidev',
      'lucaschrng',
      'AntoineBendafiSchulmann',
      'Scarboule',
      'CanarDev'
    ]
  },
  {
    user: 'AznTufu',
    followings: [
      'Romain-Parisot',
      'emoliie',
      'Charles-Chrismann',
      'tom-tamen',
      'strawhattom',
      'Nyu-code'
    ]
  },
  {
    user: 'yannisobert',
    followings: [
      'sambarrowclough',
      'alexzerah',
      'AlexGybou',
      'DimitriBertin',
      'Charles-Chrismann',
      'EdouardCourty',
      'guillaume-gomez',
      'Mitsuya77',
      'LouisPerre',
      'La-404-Devinci',
      'IMX-Rarity',
      'Zoemchl',
      'Nispeon',
      'matdn',
      'JulieBsnrd',
      'Kaowarstail',
      'pgrimaud',
      'Oxyzal',
      'Cosmeak',
      'Pouniflu',
      'ProfCitron',
      'Pierrooooo',
      'SorenMesselier-Sentis',
      'Fejalix',
      'Thibaut-Francois',
      'Nicoalz',
      'GrandEmpereur',
      'iciamyplant',
      'AntoineBendafiSchulmann',
      'aleperdriel',
      'AlexisSensei',
      'CanarDev',
      'Lainocs',
      'duuusa'
    ]
  },
  {
    user: 'duuusa',
    followings: [
      'thebrowsercompany',
      'mapbox',
      'cloudron-io',
      'AsahiLinux',
      'adonisjs',
      'Gabrielnko',
      'pinterest',
      'apple',
      'ZilbaM',
      'openai',
      'lucaschrng',
      'FannyGautierr',
      'Kan-A-Pesh',
      'TisoOfficiel',
      'jstnate',
      'QuentinDrouet',
      'LouisPerre',
      'romainmltr',
      'IIM-Creative-Technology',
      'JPPSushi',
      'alexzerah',
      'ChampiEZ',
      'AlexGybou',
      'Charles-Chrismann',
      'EdouardCourty',
      'La-404-Devinci',
      'IMX-Rarity',
      'SamyMahmoudi',
      'Zoemchl',
      'Alexis-Bally',
      'PierreCAILLET',
      'Arthur-Lucas',
      'Cosmeak',
      'matdn',
      'Kaowarstail',
      'Pouniflu',
      'ProfCitron',
      'Oxyzal',
      'Pierrooooo',
      'Nicoalz',
      'ricardo-plp',
      'aleperdriel',
      'CanarDev',
      'yannisobert',
      'pgrimaud',
      'AntoineBendafiSchulmann',
      'SorenMesselier-Sentis',
      'Matthieu-kozicki',
      'apscst',
      'imEvooh',
      'michael-dm',
      'AlexisSensei'
    ]
  },
  {
    user: 'AntoineBendafiSchulmann',
    followings: [
      'CoddityTeam',
      'FannyGautierr',
      'alexzerah',
      'ChampiEZ',
      'La-404-Devinci',
      'Charles-Chrismann',
      'IIM-Creative-Technology',
      'Cosmeak',
      'LucasLeNumerique',
      'N0rooo',
      'ProfCitron',
      'PierreCAILLET',
      'nattanbournizel',
      'JPPSushi',
      'DragiboO',
      'matdn',
      'MBoutray',
      'Kaowarstail',
      'JulieBsnrd',
      'LouisPerre',
      'Oxyzal',
      'Pouniflu',
      'AlexisSensei',
      'yannisobert',
      'GrandEmpereur',
      'aleperdriel',
      'Pierrooooo',
      'CanarDev',
      'duuusa',
      'AlexGybou',
      'michael-dm',
      'pgrimaud',
      'Lainocs',
      'SorenMesselier-Sentis'
    ]
  },
  {
    user: 'SorenMesselier-Sentis',
    followings: [
      'mely-h',
      'AugustinBriolon',
      'taylorotwell',
      'loucabaigneres',
      'Elicue',
      'Kan-A-Pesh',
      'naderman',
      'ZilbaM',
      'FannyGautierr',
      'JDHB717',
      'JPPSushi',
      'Sarayeo',
      'aarena18',
      'Charles-Chrismann',
      'fabpot',
      'LouisPerre',
      'ProfCitron',
      'David-Tessier',
      'Alexis-Bally',
      'Arthur-Lucas',
      'PierreCAILLET',
      'Nispeon',
      'AlexisSensei',
      'Cosmeak',
      'Zoemchl',
      'Kaowarstail',
      'Oxyzal',
      'Pouniflu',
      'GrandEmpereur',
      'Nicoalz',
      'duuusa',
      'matdn',
      'yannisobert',
      'aleperdriel',
      'Pierrooooo',
      'CanarDev',
      'AlexGybou',
      'pgrimaud',
      'AntoineBendafiSchulmann',
      'Lainocs'
    ]
  },
  {
    user: 'R4tonBaveur',
    followings: [
      'Random06457',
      'BenjaminBrehier',
      'Charles-Chrismann',
      'Foword5',
      'TristanGadaud',
      'foxpaps'
    ]
  },
  {
    user: 'Cosmeak',
    followings: [
      'Wolap',
      'Sasorishi',
      'AugustinBriolon',
      'mely-h',
      'MaximeBritto',
      'AsahiLinux',
      'ziglang',
      'zed-industries',
      'sveltejs',
      'oven-sh',
      'Asiern',
      'Elicue',
      'Ne0xa',
      'pgrimaud',
      'AntoineDrsl',
      'FannyGautierr',
      'adonisjs',
      'ficolastico',
      'ProfCitron',
      'MrJuju0319',
      'codediodeio',
      'rxhanson',
      'Kan-A-Pesh',
      'adamwathan',
      'reinink',
      'taylorotwell',
      'MathiasGilles',
      'Charles-Chrismann',
      'mcgonagle',
      'alexandrejacq',
      'Mitsuya77',
      'LouisPerre',
      'AlexisSensei',
      'system76',
      'AntoineBendafiSchulmann',
      'Oxyzal',
      'Alexis-Bally',
      'bdebon',
      'yannisobert',
      'SorenMesselier-Sentis',
      'Nispeon',
      'duuusa',
      'CanarDev'
    ]
  },
  {
    user: 'CanarDev',
    followings: [
      'AugustinBriolon',
      'Sasorishi',
      'GarnierQuentin',
      'thebrowsercompany',
      'iciamyplant',
      'Gabrielnko',
      'bluwy',
      'unpreset',
      'makenotion',
      'antfu',
      'pinterest',
      'QuentinDecobert',
      'LenaGautier',
      'typo-terminator',
      'Clansou',
      'apple',
      'Elicue',
      'ZilbaM',
      'SorenMesselier-Sentis',
      'vassilidev',
      'aarena18',
      'lucaschrng',
      'sveltejs',
      'MatteoCourquin',
      'Kan-A-Pesh',
      'adamwathan',
      'admsmn02',
      'jstnate',
      'FannyGautierr',
      'JPPSushi',
      'alexzerah',
      'ChampiEZ',
      'akolaz',
      'CorentinKSTR',
      'Charles-Chrismann',
      'EdouardCourty',
      'jelaip',
      'Mitsuya77',
      'IIM-Creative-Technology',
      'lyrixx',
      'La-404-Devinci',
      'IMX-Rarity',
      'SamyMahmoudi',
      'N0rooo',
      'Alexis-Bally',
      'bdebon',
      'taylorotwell',
      'Arthur-Lucas',
      'PierreCAILLET',
      'Elyesv',
      'nattanbournizel',
      'Nispeon',
      'michael-dm',
      'oellan',
      'AdrienDssy',
      'Anas-Assoun',
      'AlexGybou',
      'Zoemchl',
      'SASNOVACAT08',
      'matdn',
      'Cosmeak',
      'QuentinDrouet',
      'Kaowarstail',
      'williamlavergne',
      'JulieBsnrd',
      'LouisPerre',
      'Oxyzal',
      'ProfCitron',
      'JulesFakhouri',
      'pgrimaud',
      'Pouniflu',
      'Dratsok',
      'yannisobert',
      'aleperdriel',
      'GrandEmpereur',
      'AlexisSensei',
      'Pierrooooo',
      'romainmltr',
      'ricardo-plp',
      'AntoineBendafiSchulmann',
      'duuusa'
    ]
  },
  {
    user: 'BenjaminBrehier',
    followings: [
      'adelineHenrion',
      'Picorims',
      'R4tonBaveur',
      'Whiletruend',
      'denisebitca',
      'Charles-Chrismann',
      'Foword5'
    ]
  },
  {
    user: 'Cmfauvel',
    followings: [ 'Jeremy-Bojko', 'Charles-Chrismann', 'AsyVasy' ]
  },
  {
    user: 'FrAmbroise',
    followings: [ 'tom-tamen', 'ChampiEZ', 'Scarboule' ]
  },
  { user: 'Romain-Parisot', followings: [ 'NeilleMouton' ] }
]

const visited = []
const paths = []

function findShortestUserPath(start: string, target: string, chain: string[]) {
  const user = users.find(u => u.user === start)
  if(!user) return
  visited.push(user.user)
  if(user.followings.includes(target)) return [...chain, target]
  for(const following of user.followings) {
    if(visited.includes(following)) continue
    const path = findShortestUserPath(following, target, [...chain, following])
    if(path) {
      paths.push(path)
      return
    }
  }
}

findShortestUserPath('Nihyakunanajuni', 'lucaschrng', ['Nihyakunanajuni'])
console.log(paths)