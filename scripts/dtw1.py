import numpy as np
from scipy.spatial.distance import euclidean
from fastdtw import fastdtw
import random

tab = []
for i in range(0, 30):
    y = np.array([[1,random.randint(5,8)], [2,random.randint(11,16)], [3,random.randint(18,23)], [4,random.randint(24,30)], [5,random.randint(32,41)], [5,random.randint(36,48)]])
    tab.append(y)
	
x = np.array([[1,6], [2,13], [3,20], [4,27], [5,36], [5,41]])
result = "["
for i in range(0, 30):
    result += "["
    for j in range(0,30):
        distance, path = fastdtw(tab[i], tab[j], dist=euclidean)
        result = result + str(distance) + ","
    result = result[:-1]
    result += "],"
result = result[:-1]
result += "]"
print(result)