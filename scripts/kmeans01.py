import numpy as np
import matplotlib.pyplot as plt
import random
import json
import sys

nbclusters = int(float(sys.argv[1]))
colors = ['rs', 'bs', 'gs', 'ys', 'ms', 'ks', 'rs', 'bs', 'gs']
mucolors = ['r*', 'b*', 'g*', 'y*', 'm*', 'k*', 'r*', 'b*', 'g*']
jsonTab = []

def implementation(nbclusters, mu, clusters, iter):
    abs = []
    ord = []
	
    absmu = []
    ordmu = []
	
    for i in range(nbclusters):
        abs.append([])
        ord.append([])
        absmu.append(mu[i][0])
        ordmu.append(mu[i][1])

    for i in range(len(clusters)):
        plt.plot(absmu[i], ordmu[i], mucolors[i])
        for j in range(len(clusters[i])):
            abs[i].append(clusters[i][j][0])
            ord[i].append(clusters[i][j][1])
            plt.plot(abs[i], ord[i], colors[i])

    plt.axis([-1.2, 1.2, -1.2, 1.2])
    plt.title('Implementation du K-Mean, iteration : ' + str(iter))
    #plt.savefig('kmeans/kmean' + str(iter) + '.png')

#Debut code KMeans
def init_board_gauss(N, k):
    n = float(N)/k
    X = []
    for i in range(k):
        c = (random.uniform(-1, 1), random.uniform(-1, 1))
        s = random.uniform(0.05,0.5)
        x = []
        while len(x) < n:
            a, b = np.array([np.random.normal(c[0], s), np.random.normal(c[1], s)])
            # Continue drawing points from the distribution in the range [-1,1]
            if abs(a) < 1 and abs(b) < 1:
                x.append([a,b])
        X.extend(x)
    X = np.array(X)[:N]
    return X

def cluster_points(X, mu, append):
    clusters  = {}
    for x in X:
        bestmukey = min([(i[0], np.linalg.norm(x-mu[i[0]])) \
                    for i in enumerate(mu)], key=lambda t:t[1])[0]
        try:
            clusters[bestmukey].append(x)
            if(append):
                jsonTab[bestmukey].append([x[0], x[1]])
        except KeyError:
            clusters[bestmukey] = [x]
    return clusters

def reevaluate_centers(mu, clusters):
    newmu = []
    keys = sorted(clusters.keys())
    for k in keys:
        newmu.append(np.mean(clusters[k], axis = 0))
    return newmu

def has_converged(mu, oldmu):
    return (set([tuple(a) for a in mu]) == set([tuple(a) for a in oldmu]))

def find_centers(X, K):
    # Initialize to K random centers
    oldmu = random.sample(X, K)
    mu = random.sample(X, K)
    for i in range(K):
        jsonTab.append([])
    iter = 1
    while not has_converged(mu, oldmu):
        oldmu = mu
        # Assign all points in X to clusters
        clusters = cluster_points(X, mu, False)
        # Reevaluate centers
        mu = reevaluate_centers(oldmu, clusters)
        implementation(nbclusters, mu, clusters, iter)
        iter = iter + 1
    oldmu = mu
    clusters = cluster_points(X, mu, True)
    mu = reevaluate_centers(oldmu, clusters)
    implementation(nbclusters, mu, clusters, iter)
    print(jsonTab)
    return(mu, clusters)
#Fin code KMeans

#Implementation
tab = init_board_gauss(300,nbclusters)
mu, clusters = find_centers(tab, nbclusters)

