import re
import csv
from random import randint
from hyphenator import Hyphenator
h = Hyphenator("/usr/share/myspell/hyph_en_US.dic")

with open("words.txt") as f, open("syllables.txt") as s, open("dictionary.txt", "w") as d:
    content = f.readlines()
    syllables = s.readlines()
    for word in content:
        #get amount of syllables
        str = h.inserted(word)
        a = re.split(r'\s|-', str)
        val = len(a)
        newword = ""
        for syll in range(0, val-1):
            newword = newword + syllables[randint(0,15203)].strip('\n')   
        d.write(word.strip('\n') + '=' + newword + '\n')
        
