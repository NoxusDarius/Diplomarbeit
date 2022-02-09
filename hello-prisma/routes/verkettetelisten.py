class Knoten:
    def __init__(self):
        self.inhalt = 0
        self.knoten = None
    

    def insert(self,neueDaten):
        if self.knoten:
            letzteDaten = self.knoten
            while letzteDaten != None:
                if letzteDaten.naechster == None:
                    break
                letzteDaten = letzteDaten.naechster
            
            letzteDaten.naechster = neueDaten
        else:
            self.knoten = neueDaten
    
    def returnAll(self):
        if self.knoten != None:
            print(self.knoten.wert)
            temp = self.knoten
            while temp.naechster != None:
                print(temp.wert)
                temp = temp.naechster
    
    def length(self):
        self.inhalt = 0
        if self.knoten != None:
            self.inhalt +=1
            temp = self.knoten
            while temp.naechster != None:
                self.inhalt +=1
                temp = temp.naechster
            print(self.inhalt)
                
class Daten:
    def __init__(self,wert =0):
        self.wert = wert
        self.naechster = None

import random

daten1 = Daten(random.randint(0,5))
daten2 = Daten(random.randint(0,5))
daten3 = Daten(random.randint(0,5))
print(daten1.wert)
verkettete = Knoten()
verkettete.insert(daten1)
verkettete.insert(daten2)
verkettete.insert(daten3)


print("Hier die Daten")
print(verkettete.returnAll())
print("Ausgabe Anzahl")
verkettete.length()