import csv 

images = []

with open('HurricaneMichaelSampleData.csv') as file:
    reader = csv.reader(file)
    file.readline()
    for row in reader:
        new_img = {}
        new_img['lat'] = row[0]
        new_img['lon'] = row[1]
        new_img['wash'] = row[2]
        images.append(new_img)

print(len(images))