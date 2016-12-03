import re
from hyphenator import Hyphenator
h = Hyphenator("/usr/share/myspell/hyph_en_US.dic")



# fo = open("words.txt", "r+")
with open("words.txt") as f:
    content = f.readlines()
    with open("syllables.txt", "a") as myfile:
        for word in content:
            str = h.inserted(word)
            a = re.split(r'\s|-', str)
            for val in a:
                myfile.write(val + '\n')
