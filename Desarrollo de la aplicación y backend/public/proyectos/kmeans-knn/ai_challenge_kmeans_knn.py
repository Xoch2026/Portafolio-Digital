# =========================
# AI Challenge: K-Means y KNN
# =========================
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score

# =========================
# 1. PREPARACIÓN DEL DATASET
# =========================
np.random.seed(42)
n = 500
horas = np.random.randint(1, 11, n)
asistencia = np.random.randint(40, 101, n)
tareas = np.random.randint(30, 101, n)
nota = (horas * 5) + (asistencia * 0.35) + (tareas * 0.25) + np.random.normal(0, 5, n)
nota = np.clip(nota, 0, 100)
aprobado = np.where(nota >= 60, 1, 0)

df = pd.DataFrame({
    "Horas": horas,
    "Asistencia": asistencia,
    "Tareas": tareas,
    "Nota": nota,
    "Aprobado": aprobado
})

print("Primeras filas del dataset:")
print(df.head())
print("\nResumen estadístico:")
print(df.describe())
print("\nAprobados y reprobados:")
print(df["Aprobado"].value_counts())

# Normalización global inicial
X = df[["Horas", "Asistencia", "Tareas"]]
y = df["Aprobado"]
scaler = StandardScaler()
X_norm = scaler.fit_transform(X)

# =========================
# 2. K-MEANS (3 Y 4 GRUPOS)
# =========================
# K-Means con 3 grupos
kmeans3 = KMeans(n_clusters=3, random_state=42, n_init=10)
df["Grupo3"] = kmeans3.fit_predict(X_norm)
print("\nPromedios por grupo (K=3):")
print(df.groupby("Grupo3")[["Horas", "Asistencia", "Tareas", "Nota"]].mean())

plt.figure(figsize=(8, 5))
plt.scatter(df["Horas"], df["Nota"], c=df["Grupo3"], cmap="viridis")
plt.title("K-Means con 3 grupos")
plt.xlabel("Horas de estudio")
plt.ylabel("Nota")
plt.show()

# K-Means con 4 grupos
kmeans4 = KMeans(n_clusters=4, random_state=42, n_init=10)
df["Grupo4"] = kmeans4.fit_predict(X_norm)
print("\nPromedios por grupo (K=4):")
print(df.groupby("Grupo4")[["Horas", "Asistencia", "Tareas", "Nota"]].mean())

plt.figure(figsize=(8, 5))
plt.scatter(df["Horas"], df["Nota"], c=df["Grupo4"], cmap="rainbow")
plt.title("K-Means con 4 grupos")
plt.xlabel("Horas de estudio")
plt.ylabel("Nota")
plt.show()

# =========================
# 3 Y 4. KNN Y EXPERIMENTACIÓN
# =========================
X_train_norm, X_test_norm, y_train, y_test = train_test_split(X_norm, y, test_size=0.25, random_state=42)
X_train_sin, X_test_sin, _, _ = train_test_split(X, y, test_size=0.25, random_state=42)

valores_k = [1, 3, 5, 7, 11, 15, 21]
resultados_norm = []
resultados_sin = []

print("\nRESULTADOS CON NORMALIZACIÓN:")
for k in valores_k:
    knn_norm = KNeighborsClassifier(n_neighbors=k)
    knn_norm.fit(X_train_norm, y_train)
    acc_norm = accuracy_score(y_test, knn_norm.predict(X_test_norm))
    resultados_norm.append(acc_norm)
    print(f"k={k} -> {acc_norm:.4f}")

    # Evaluación sin normalizar en el mismo ciclo
    knn_sin = KNeighborsClassifier(n_neighbors=k)
    knn_sin.fit(X_train_sin, y_train)
    acc_sin = accuracy_score(y_test, knn_sin.predict(X_test_sin))
    resultados_sin.append(acc_sin)

print("\nRESULTADOS SIN NORMALIZACIÓN:")
for k, acc in zip(valores_k, resultados_sin):
    print(f"k={k} -> {acc:.4f}")

tabla = pd.DataFrame({
    "k": valores_k,
    "Con_Normalizacion": resultados_norm,
    "Sin_Normalizacion": resultados_sin
})
print("\nTabla comparativa:")
print(tabla)

plt.figure(figsize=(8, 5))
plt.plot(valores_k, resultados_norm, marker="o", label="Con normalización")
plt.plot(valores_k, resultados_sin, marker="s", label="Sin normalización")
plt.title("Comparación de exactitud KNN")
plt.xlabel("Valor de k")
plt.ylabel("Exactitud")
plt.legend()
plt.grid(True)
plt.show()

# =========================
# 5. DESAFÍO FINAL
# =========================
mejor_k = valores_k[np.argmax(resultados_norm)]
print("\nMejor valor de k:", mejor_k)

mejor_knn = KNeighborsClassifier(n_neighbors=mejor_k)
mejor_knn.fit(X_train_norm, y_train)

nuevo_estudiante = pd.DataFrame({"Horas": [4], "Asistencia": [55], "Tareas": [50]})
nuevo_est_norm = scaler.transform(nuevo_estudiante)

prediccion = mejor_knn.predict(nuevo_est_norm)
probabilidad = mejor_knn.predict_proba(nuevo_est_norm)

print("\nRESULTADO DEL DESAFÍO")
if prediccion[0] == 1:
    print("Predicción: APROBADO")
else:
    print("Predicción: REPROBADO")

print("\nProbabilidades:")
print(probabilidad)
