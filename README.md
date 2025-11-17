# motions
A collection of debate motions.

## Contributors
- RGonoi
- inohaan

## Format
The format is indentation sensitive. In other words, the number of "tabs" before the first letter in the line determines the type of element.
Avoid empty lines. The parser will try to remove any empty line but... why risk it?
**DO NOT** use spaces instead of tabs.
**DO NOT** put tabs after the word / sentence, it may confuse the parser.

`Example.txt`
```
Tornament Name
	2023
		R1
			THBT AAA
				Balance $stats 1, 2, 9
				Veto $stats 3, 2, 18
			THW BBB
				Info Slide
			THW CCC
		R2
			THBT DDD
			THBT EEE
			THW FFF
				Info Slide
		R3
			THBT GGG
				Info Slide
			THW HHH
			THBT III
	2019
		R1: Utility
			THBT AAA

			THW BBB
				Info Slide
			THW CCC
		R2: Morality
			THBT DDD
			THBT EEE
			THW FFF
				Info Slide
		R3: Justice
			THBT GGG
				Info Slide
			THW HHH
			THBT III
```

## Abbriviation

|Abbr| Stands for...   |
|----|-----------------|
| R1 | Round 1         |
| R2 | Round 2         |
| R3 | Round 3         |
| R4 | Round 4         |
| R5 | Round 5         |
| R6 | Round 6         |
| R7 | Round 7         |
| R8 | Round 8         |
| OF | Octa-Final      |
| QF | Quarter-Final   |
| SF | Semi-Final      |
| GF | Grand-Final     |

## Search (Added by ino_haan)
Pages for each tournament is generated dynamically, so that edit in Wordpress is unnecessary. In `Javascript/TournamentList.json`, edit/add new tournaments as they are updated.
- `id`: unique identifier used in links. The `#tournament=Womens` part in `https://resources.tokyodebate.org/debate-motion/motion/?#tournament=Womens`.
- `name`: Name that shows up for list of tournaments.
- `short`: Short name that shows up in parenthisis for list of tournaments (e.g. Japan BP -> JBP). Leave `""` for tournaments without short name.
- `latest`: The latest year the tournament was held & data exists for.
- `tag`: Tags shown for list of tournaments. 
	- `NA`, `Asian`, `BP`, `Australasian` for tournament types.
	- `rookie`, `proam`, `open` for participation category.
	- `region:Domestic`, `region:World`, `region:Asia`, `region:Oceania`, `region:Europe`, and `region:America` for region of the tournament.
- `url`: the URL, relative to the root of this repository, of the text file containing motions. International tournaments should be `International/xxx.txt`.

Example
```json
	{
		"id": "Womens",
		"name": "Japan Womxn's / Aoyama Women's Cup",
		"short": "",
		"latest": 2024,
		"tag": ["BP", "open", "region:Domestic"],
		"url": "Womens.txt"
	},
```

## Statistics (Added by ino_haan)
If a motion is annotated with the `$stats` value in the info slide level indentation, it will try to display the motion stats in addition under the motion.

### North American Style
Write `Balance $stats (gov wins), (opp wins)`
```
Tournament name
	Year
		Round
			Motion
				Balance $stats (gov wins), (opp wins)
				Info if any
```

### Asian Parliamentary Style
Have a separate bar for balance and vetoes.
```
Tournament name
	Year
		Round
			Motion A
				Balance $stats (gov wins), (opp wins), (total number of rooms)
				Veto $stats (gov vetoes), (opp vetoes), (total number of teams = room number×2)
				Info if any
			Motion B
				Balance $stats 2, 3, 9
				Veto $stats 1, 2, 18
```

### British Parliamentary Style
Write the rankings for each bench
```
Tournament Name
	Year
		Round
			Motion
				OG $stats (OG 1st), (OG 2nd), (OG 3rd), (OG 4th)
				OO $stats (OO 1st), (OO 2nd), (OO 3rd), (OO 4th)
				CG $stats (CG 1st), (CG 2nd), (CG 3rd), (CG 4th)
				CO $stats (CO 1st), (CO 2nd), (CO 3rd), (CO 4th)
				Info if any
```

## TODO
- Tag / categorize
- Remove duplicates
- Search (Sphinx?)