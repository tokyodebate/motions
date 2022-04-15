# 開催日付順にsortします

import csv
import os
import sys

print(sys.path)


with open('output_tournament_date.txt', 'w') as fw:
	with open('input_international_2020_2022.tsv', encoding='utf-8', newline='') as fr:
		counter = 0
		memory = ''
		for cols in csv.reader(fr, delimiter='\t'):

			if len(cols) == 0:  # empty line
				if counter != 0:
					memory = memory + '</p>'
					fw.write(memory + '\n')
					counter = 0


			elif len(cols) == 1:  # 大会名 【Tokyo mini 2020】　など
				if counter != 0:
					memory = memory + '</p>'
					fw.write(memory + '\n')
					counter = 0


				output = '<h2 style="text-align: center;">' + cols[0] + '</h2>'
				fw.write(output + '\n')


			elif len(cols) == 2:  # 賞状の名前、受賞者の名前　【Ajudicatior Prize】, Todai Taro　など
				if counter == 0:
					memory = '<p style="text-align: center;">' + cols[1] + '\n'
					counter += 1
				else:
					memory = memory + cols[1] + '\n'


			print(cols)
			print(len(cols))

