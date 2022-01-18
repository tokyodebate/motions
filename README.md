# motions
A collection of debate motions. hello world by RGonoi.

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

## TODO
- Tag / categorize
- Remove duplicates
- Search (Sphinx?)