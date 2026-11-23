import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score


data = {
    "HORAS_ESTUDIO": [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5,
                      5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10,
                      10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15],
    "SCORE": [1.5, 2.0, 2.4, 2.9, 3.1, 3.6, 3.8, 4.3, 4.5, 5.0,
              5.2, 5.8, 5.9, 6.4, 6.6, 7.1, 7.2, 7.7, 7.9, 8.3,
              8.4, 8.8, 8.9, 9.2, 9.3, 9.6, 9.6, 9.8, 9.9, 10.0]
}

df = pd.DataFrame(data)
print(df)
print("Total de registros:", len(df))

X = df[["HORAS_ESTUDIO"]]
y = df["SCORE"]

# Entrenamiento del modelo
modelo = LinearRegression()
modelo.fit(X, y)

y_pred = modelo.predict(X)

print("Pendiente:", modelo.coef_[0])
print("Intercepto:", modelo.intercept_)
print("R²:", r2_score(y, y_pred))
print("MSE:", mean_squared_error(y, y_pred))

# 2. Restricciones sobre el dato ingresado
horas_max = df["HORAS_ESTUDIO"].max()
horas_min = df["HORAS_ESTUDIO"].min()

try:
    horas = float(input("Ingrese las horas de estudio: "))
except ValueError:
    print("Error: debe ingresar un número válido.")
else:
    if horas > horas_max:
        print(f"El dato ingresado ({horas}) es superior al rango disponible "
              f"en la base de datos (máximo: {horas_max} horas).")
    elif horas < horas_min:
        print(f"El dato ingresado ({horas}) es inferior al rango disponible "
              f"en la base de datos (mínimo: {horas_min} horas).")
    else:
        prediccion = modelo.predict(pd.DataFrame({"HORAS_ESTUDIO": [horas]}))[0]
        print(f"Score predicho para {horas} horas de estudio: {prediccion:.2f}")

        # Gráfico (solo si el dato está dentro del rango)
        plt.scatter(X, y, label="Datos")
        plt.plot(X, y_pred, color="red", label="Recta de regresión")
        plt.scatter(horas, prediccion, color="green", s=100,
                    label="Predicción", zorder=5)
        plt.xlabel("Horas de estudio")
        plt.ylabel("Score")
        plt.title("Regresión Lineal")
        plt.legend()
        plt.show()