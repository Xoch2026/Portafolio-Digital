{
  "cells": [
    {
      "cell_type": "markdown",
      "metadata": {},
      "source": [
        "# Analisis Geoespacial de Hotspots Comerciales: Wendy's San Salvador\n",
        "Prototipo academico de Machine Learning (K-Means + KNN con distancia Haversine)."
      ]
    },
    {
      "cell_type": "code",
      "execution_count": 1,
      "metadata": {},
      "outputs": [
        {
          "name": "stdout",
          "output_type": "stream",
          "text": [
            "Total de sucursales cargadas: 11\n"
          ]
        },
        {
          "data": {
            "text/plain": [
              "  osm_type       osm_id   nombre    marca  ...        ciudad  horario  telefono                   sitio_web\n",
              "0     node   6052795498  Wendy's  Wendy's  ...           NaN      NaN       NaN                         NaN\n",
              "1     node   9089891045  Wendy's  Wendy's  ...           NaN      NaN       NaN  https://www.wendys.com.sv/\n",
              "2     node  10212633849  Wendy's  Wendy's  ...           NaN      NaN       NaN                         NaN\n",
              "3      way    378380416  Wendy's  Wendy's  ...  San Salvador      NaN       NaN                         NaN\n",
              "4      way    382289412  Wendy's  Wendy's  ...           NaN      NaN       NaN                         NaN\n",
              "\n",
              "[5 rows x 12 columns]"
            ],
            "text/html": [
              "<table border=\"1\" class=\"dataframe\">\n",
              "  <thead>\n",
              "    <tr style=\"text-align: right;\">\n",
              "      <th></th>\n",
              "      <th>osm_type</th>\n",
              "      <th>osm_id</th>\n",
              "      <th>nombre</th>\n",
              "      <th>marca</th>\n",
              "      <th>tipo_local</th>\n",
              "      <th>latitud</th>\n",
              "      <th>longitud</th>\n",
              "      <th>direccion</th>\n",
              "      <th>ciudad</th>\n",
              "      <th>horario</th>\n",
              "      <th>telefono</th>\n",
              "      <th>sitio_web</th>\n",
              "    </tr>\n",
              "  </thead>\n",
              "  <tbody>\n",
              "    <tr>\n",
              "      <th>0</th>\n",
              "      <td>node</td>\n",
              "      <td>6052795498</td>\n",
              "      <td>Wendy's</td>\n",
              "      <td>Wendy's</td>\n",
              "      <td>fast_food</td>\n",
              "      <td>13.689027</td>\n",
              "      <td>-89.240304</td>\n",
              "      <td>NaN</td>\n",
              "      <td>NaN</td>\n",
              "      <td>NaN</td>\n",
              "      <td>NaN</td>\n",
              "      <td>NaN</td>\n",
              "    </tr>\n",
              "    <tr>\n",
              "      <th>1</th>\n",
              "      <td>node</td>\n",
              "      <td>9089891045</td>\n",
              "      <td>Wendy's</td>\n",
              "      <td>Wendy's</td>\n",
              "      <td>fast_food</td>\n",
              "      <td>13.697944</td>\n",
              "      <td>-89.151035</td>\n",
              "      <td>NaN</td>\n",
              "      <td>NaN</td>\n",
              "      <td>NaN</td>\n",
              "      <td>NaN</td>\n",
              "      <td>https://www.wendys.com.sv/</td>\n",
              "    </tr>\n",
              "    <tr>\n",
              "      <th>2</th>\n",
              "      <td>node</td>\n",
              "      <td>10212633849</td>\n",
              "      <td>Wendy's</td>\n",
              "      <td>Wendy's</td>\n",
              "      <td>fast_food</td>\n",
              "      <td>13.664425</td>\n",
              "      <td>-89.184422</td>\n",
              "      <td>NaN</td>\n",
              "      <td>NaN</td>\n",
              "      <td>NaN</td>\n",
              "      <td>NaN</td>\n",
              "      <td>NaN</td>\n",
              "    </tr>\n",
              "    <tr>\n",
              "      <th>3</th>\n",
              "      <td>way</td>\n",
              "      <td>378380416</td>\n",
              "      <td>Wendy's</td>\n",
              "      <td>Wendy's</td>\n",
              "      <td>fast_food</td>\n",
              "      <td>13.701655</td>\n",
              "      <td>-89.231375</td>\n",
              "      <td>Paseo General Escalón</td>\n",
              "      <td>San Salvador</td>\n",
              "      <td>NaN</td>\n",
              "      <td>NaN</td>\n",
              "      <td>NaN</td>\n",
              "    </tr>\n",
              "    <tr>\n",
              "      <th>4</th>\n",
              "      <td>way</td>\n",
              "      <td>382289412</td>\n",
              "      <td>Wendy's</td>\n",
              "      <td>Wendy's</td>\n",
              "      <td>fast_food</td>\n",
              "      <td>13.683516</td>\n",
              "      <td>-89.230466</td>\n",
              "      <td>NaN</td>\n",
              "      <td>NaN</td>\n",
              "      <td>NaN</td>\n",
              "      <td>NaN</td>\n",
              "      <td>NaN</td>\n",
              "    </tr>\n",
              "  </tbody>\n",
              "</table>"
            ]
          },
          "execution_count": 1,
          "metadata": {},
          "output_type": "execute_result"
        }
      ],
      "source": [
        "import pandas as pd\n",
        "import numpy as np\n",
        "import folium\n",
        "from sklearn.cluster import KMeans\n",
        "from sklearn.metrics import silhouette_score\n",
        "from sklearn.neighbors import KNeighborsClassifier\n",
        "from sklearn.model_selection import LeaveOneOut\n",
        "\n",
        "df = pd.read_csv('wendys_san_salvador_limpio.csv')\n",
        "print(f'Total de sucursales cargadas: {len(df)}')\n",
        "df.head()"
      ]
    },
    {
      "cell_type": "markdown",
      "metadata": {},
      "source": [
        "## 1. Agrupamiento Espacial con K-Means\n",
        "Evaluacion de Inercia y Coeficiente de Silueta para identificar polos comerciales."
      ]
    },
    {
      "cell_type": "code",
      "execution_count": 2,
      "metadata": {},
      "outputs": [
        {
          "name": "stdout",
          "output_type": "stream",
          "text": [
            "K=2 | Inercia=0.004706 | Silueta=0.5614\n",
            "K=3 | Inercia=0.002748 | Silueta=0.5114\n",
            "K=4 | Inercia=0.001287 | Silueta=0.4906\n",
            "K=5 | Inercia=0.000883 | Silueta=0.3381\n",
            "K=6 | Inercia=0.000565 | Silueta=0.2944\n"
          ]
        },
        {
          "data": {
            "text/plain": [
              "     nombre    latitud   longitud  cluster  categoria_densidad\n",
              "0   Wendy's  13.689027 -89.240304        0  Alta Concentracion\n",
              "1   Wendy's  13.697944 -89.151035        1  Alta Concentracion\n",
              "2   Wendy's  13.664425 -89.184422        2  Baja Concentracion\n",
              "3   Wendy's  13.701655 -89.231375        0  Alta Concentracion\n",
              "4   Wendy's  13.683516 -89.230466        0  Alta Concentracion\n",
              "5   Wendy's  13.700693 -89.221425        0  Alta Concentracion\n",
              "6   Wendy's  13.705652 -89.248891        0  Alta Concentracion\n",
              "7   Wendy's  13.709331 -89.209095        0  Alta Concentracion\n",
              "8   Wendy's  13.699537 -89.151525        1  Alta Concentracion\n",
              "9   Wendy's  13.712618 -89.185751        1  Alta Concentracion\n",
              "10  Wendy's  13.715689 -89.144911        1  Alta Concentracion"
            ],
            "text/html": [
              "<table border=\"1\" class=\"dataframe\">\n",
              "  <thead>\n",
              "    <tr style=\"text-align: right;\">\n",
              "      <th></th>\n",
              "      <th>nombre</th>\n",
              "      <th>latitud</th>\n",
              "      <th>longitud</th>\n",
              "      <th>cluster</th>\n",
              "      <th>categoria_densidad</th>\n",
              "    </tr>\n",
              "  </thead>\n",
              "  <tbody>\n",
              "    <tr>\n",
              "      <th>0</th>\n",
              "      <td>Wendy's</td>\n",
              "      <td>13.689027</td>\n",
              "      <td>-89.240304</td>\n",
              "      <td>0</td>\n",
              "      <td>Alta Concentracion</td>\n",
              "    </tr>\n",
              "    <tr>\n",
              "      <th>1</th>\n",
              "      <td>Wendy's</td>\n",
              "      <td>13.697944</td>\n",
              "      <td>-89.151035</td>\n",
              "      <td>1</td>\n",
              "      <td>Alta Concentracion</td>\n",
              "    </tr>\n",
              "    <tr>\n",
              "      <th>2</th>\n",
              "      <td>Wendy's</td>\n",
              "      <td>13.664425</td>\n",
              "      <td>-89.184422</td>\n",
              "      <td>2</td>\n",
              "      <td>Baja Concentracion</td>\n",
              "    </tr>\n",
              "    <tr>\n",
              "      <th>3</th>\n",
              "      <td>Wendy's</td>\n",
              "      <td>13.701655</td>\n",
              "      <td>-89.231375</td>\n",
              "      <td>0</td>\n",
              "      <td>Alta Concentracion</td>\n",
              "    </tr>\n",
              "    <tr>\n",
              "      <th>4</th>\n",
              "      <td>Wendy's</td>\n",
              "      <td>13.683516</td>\n",
              "      <td>-89.230466</td>\n",
              "      <td>0</td>\n",
              "      <td>Alta Concentracion</td>\n",
              "    </tr>\n",
              "    <tr>\n",
              "      <th>5</th>\n",
              "      <td>Wendy's</td>\n",
              "      <td>13.700693</td>\n",
              "      <td>-89.221425</td>\n",
              "      <td>0</td>\n",
              "      <td>Alta Concentracion</td>\n",
              "    </tr>\n",
              "    <tr>\n",
              "      <th>6</th>\n",
              "      <td>Wendy's</td>\n",
              "      <td>13.705652</td>\n",
              "      <td>-89.248891</td>\n",
              "      <td>0</td>\n",
              "      <td>Alta Concentracion</td>\n",
              "    </tr>\n",
              "    <tr>\n",
              "      <th>7</th>\n",
              "      <td>Wendy's</td>\n",
              "      <td>13.709331</td>\n",
              "      <td>-89.209095</td>\n",
              "      <td>0</td>\n",
              "      <td>Alta Concentracion</td>\n",
              "    </tr>\n",
              "    <tr>\n",
              "      <th>8</th>\n",
              "      <td>Wendy's</td>\n",
              "      <td>13.699537</td>\n",
              "      <td>-89.151525</td>\n",
              "      <td>1</td>\n",
              "      <td>Alta Concentracion</td>\n",
              "    </tr>\n",
              "    <tr>\n",
              "      <th>9</th>\n",
              "      <td>Wendy's</td>\n",
              "      <td>13.712618</td>\n",
              "      <td>-89.185751</td>\n",
              "      <td>1</td>\n",
              "      <td>Alta Concentracion</td>\n",
              "    </tr>\n",
              "    <tr>\n",
              "      <th>10</th>\n",
              "      <td>Wendy's</td>\n",
              "      <td>13.715689</td>\n",
              "      <td>-89.144911</td>\n",
              "      <td>1</td>\n",
              "      <td>Alta Concentracion</td>\n",
              "    </tr>\n",
              "  </tbody>\n",
              "</table>"
            ]
          },
          "execution_count": 2,
          "metadata": {},
          "output_type": "execute_result"
        }
      ],
      "source": [
        "X = df[['latitud', 'longitud']].to_numpy()\n",
        "for k in range(2, min(7, len(df))):\n",
        "    km = KMeans(n_clusters=k, random_state=42, n_init=10)\n",
        "    labels = km.fit_predict(X)\n",
        "    print(f'K={k} | Inercia={km.inertia_:.6f} | Silueta={silhouette_score(X, labels):.4f}')\n",
        "\n",
        "kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)\n",
        "df['cluster'] = kmeans.fit_predict(X)\n",
        "conteo = df['cluster'].value_counts()\n",
        "promedio = conteo.mean()\n",
        "df['categoria_densidad'] = np.where(df['cluster'].map(conteo) > promedio, 'Alta Concentracion', 'Baja Concentracion')\n",
        "df[['nombre', 'latitud', 'longitud', 'cluster', 'categoria_densidad']]"
      ]
    },
    {
      "cell_type": "markdown",
      "metadata": {},
      "source": [
        "## 2. Clasificacion Supervisada con KNN Haversine y Validacion Leave-One-Out"
      ]
    },
    {
      "cell_type": "code",
      "execution_count": 3,
      "metadata": {},
      "outputs": [
        {
          "name": "stdout",
          "output_type": "stream",
          "text": [
            "k=1 | Exactitud LOO: 90.91%\n",
            "k=3 | Exactitud LOO: 90.91%\n",
            "k=5 | Exactitud LOO: 90.91%\n",
            "k=7 | Exactitud LOO: 90.91%\n",
            "k=9 | Exactitud LOO: 90.91%\n"
          ]
        }
      ],
      "source": [
        "X_rad = np.radians(df[['latitud', 'longitud']].to_numpy())\n",
        "y = np.array(df['categoria_densidad'].tolist())\n",
        "loo = LeaveOneOut()\n",
        "\n",
        "for k in range(1, len(df), 2):\n",
        "    aciertos = 0\n",
        "    for train_idx, test_idx in loo.split(X_rad):\n",
        "        knn = KNeighborsClassifier(n_neighbors=k, metric='haversine')\n",
        "        knn.fit(X_rad[train_idx], y[train_idx])\n",
        "        if knn.predict(X_rad[test_idx])[0] == y[test_idx][0]:\n",
        "            aciertos += 1\n",
        "    print(f'k={k} | Exactitud LOO: {aciertos/len(df):.2%}')"
      ]
    },
    {
      "cell_type": "markdown",
      "metadata": {},
      "source": [
        "## 3. Evaluacion de Nueva Ubicacion Propuesta"
      ]
    },
    {
      "cell_type": "code",
      "execution_count": 4,
      "metadata": {},
      "outputs": [
        {
          "name": "stdout",
          "output_type": "stream",
          "text": [
            "Prediccion: Alta Concentracion\n",
            "Wendy's -> 0.044 km\n",
            "Wendy's -> 1.038 km\n",
            "Wendy's -> 1.713 km\n"
          ]
        }
      ],
      "source": [
        "knn_final = KNeighborsClassifier(n_neighbors=3, metric='haversine')\n",
        "knn_final.fit(X_rad, y)\n",
        "\n",
        "punto_nuevo = np.radians([[13.7015, -89.231]])\n",
        "pred = knn_final.predict(punto_nuevo)[0]\n",
        "dist_rad, indices = knn_final.kneighbors(punto_nuevo)\n",
        "dist_km = dist_rad[0] * 6371.0\n",
        "\n",
        "print('Prediccion:', pred)\n",
        "for idx, d in zip(indices[0], dist_km):\n",
        "    print(f\"{df.loc[idx, 'nombre']} -> {d:.3f} km\")"
      ]
    }
  ],
  "metadata": {
    "kernelspec": {
      "display_name": "Python 3",
      "language": "python",
      "name": "python3"
    },
    "language_info": {
      "name": "python",
      "version": "3.14"
    }
  },
  "nbformat": 4,
  "nbformat_minor": 5
}