def get_pair(line):
    key, sep, value = line.strip().partition("=")
    return key, value

with open("dictionary.txt") as fd, open("harrypotter.txt") as h, open("newharrypotter.txt", "w") as n:   
    d = dict(get_pair(line) for line in fd)
    content = h.readlines()
    print(d.get('sublimitation'))
    for line in content:
        for word in line:
         #a = d.get(word.strip());
         #if a == None:
         #    a = word
             print(d[word])
             n.write(a)


#with open("harrypotter.txt") as h, open("dictionary.txt") as d, open("newharrypotter.txt", "w"):
 #   content = h.readlines()
  #  words = d.readlines()
   # for word in content:
    #    for newword in words:
        
