import csv 

images = {
    'images':[]
    }

def get_img_data():

    with open('HurricaneMichaelSampleData.csv') as file:
        reader = csv.reader(file)
        file.readline()
        for row in reader:
            new_img = {}
            new_img['lon'] = row[0]
            new_img['lat'] = row[1]
            new_img['wash'] = row[2]
            images['images'].append(new_img)

    return images