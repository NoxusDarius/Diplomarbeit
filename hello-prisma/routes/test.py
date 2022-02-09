import requests as r 
url ='http://localhost:5000/user/anmelden/'
userobj = {'password' : 'Hallomeinnameistsebastian' , 'Firmenname':'ManuelGMBH'}
user = r.get("https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyB5_RWLmPQCmjfa0zfSBompK2S72by1c_8")
print("Erfolgreich")
#a = r.get(url)
#
print(user.text)
#print(dir(a.text))
#if a.status_code == 200:
#    data = a.json()
#    print(str(data) +"Hie ist die Json")
#else:
#    print("Fuck")




#obj = { 'Firmenname': 'Hallo GMBH' , 'UID_Nummer': '43' }
#objdelete = { 'Firmenname': 'Hallo meinf name ist Manuel'}
#print(str(obj))
#x = r.post(url, json= { 'Firmenname': 'Hallo meinf fewfefename ist Manuel' , 'UID_Nummer': '432434324'})
#print(x)
#print(str(x.text))
#delete = r.delete(url,json=objdelete)
#print(delete)