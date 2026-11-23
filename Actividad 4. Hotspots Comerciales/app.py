import streamlit as st
import streamlit.components.v1 as components
import pandas as pd
import numpy as np
import folium
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import LeaveOneOut

st.set_page_config(
    page_title="Hotspots Comerciales Wendys - San Salvador",
    layout="wide"
)

@st.cache_data
def cargar_datos():
    return pd.read_csv("wendys_san_salvador_limpio.csv")

df_base = cargar_datos()
n_muestras = len(df_base)

st.title("Analisis Geoespacial de Hotspots Comerciales: Wendys San Salvador")
st.markdown(
    "Prototipo academico de Machine Learning para evaluar concentracion comercial "
    "y ubicaciones potenciales de apertura mediante K-Means y KNN con distancia Haversine."
)

st.sidebar.header("Parametros de Simulacion")

max_k_clusters = min(7, n_muestras - 1)
default_k_idx = 1 if max_k_clusters >= 3 else 0
opciones_k_clusters = list(range(2, max_k_clusters + 1))
k_clusters = st.sidebar.selectbox(
    "Numero de polos comerciales (K - K-Means)",
    options=opciones_k_clusters,
    index=default_k_idx
)

opciones_k_knn = [k for k in range(1, n_muestras, 2)]
default_knn_idx = 1 if len(opciones_k_knn) > 1 else 0
k_vecinos = st.sidebar.selectbox(
    "Numero de vecinos cercanos (k impar - KNN)",
    options=opciones_k_knn,
    index=default_knn_idx
)

st.sidebar.subheader("Nueva Ubicacion Propuesta")
lat_nueva = st.sidebar.number_input(
    "Latitud (San Salvador)",
    min_value=13.45000,
    max_value=14.08000,
    value=13.70150,
    step=0.00100,
    format="%.5f"
)
lon_nueva = st.sidebar.number_input(
    "Longitud (San Salvador)",
    min_value=-89.30000,
    max_value=-89.00000,
    value=-89.23100,
    step=0.00100,
    format="%.5f"
)

df = df_base.copy()
X = df[["latitud", "longitud"]].to_numpy()

kmeans = KMeans(n_clusters=k_clusters, random_state=42, n_init=10)
df["cluster"] = kmeans.fit_predict(X)
silueta = float(silhouette_score(X, df["cluster"]))
centroides = kmeans.cluster_centers_

conteo_clusters = df["cluster"].value_counts()
promedio_locales = conteo_clusters.mean()
df["locales_en_cluster"] = df["cluster"].map(conteo_clusters)
df["categoria_densidad"] = np.where(
    df["locales_en_cluster"] > promedio_locales,
    "Alta Concentracion",
    "Baja Concentracion"
)

X_rad = np.radians(X)
y = np.array(df["categoria_densidad"].tolist())

loo = LeaveOneOut()
aciertos = 0
for train_idx, test_idx in loo.split(X_rad):
    knn_cv = KNeighborsClassifier(n_neighbors=k_vecinos, metric="haversine")
    knn_cv.fit(X_rad[train_idx], y[train_idx])
    if knn_cv.predict(X_rad[test_idx])[0] == y[test_idx][0]:
        aciertos += 1
exactitud_loo = aciertos / n_muestras

knn_modelo = KNeighborsClassifier(n_neighbors=k_vecinos, metric="haversine")
knn_modelo.fit(X_rad, y)

punto_nuevo_rad = np.radians([[lat_nueva, lon_nueva]])
prediccion_nueva = knn_modelo.predict(punto_nuevo_rad)[0]
distancias_rad, indices_vecinos = knn_modelo.kneighbors(punto_nuevo_rad)
distancias_km = distancias_rad[0] * 6371.0

col1, col2, col3, col4 = st.columns(4)
col1.metric("Sucursales Analizadas", f"{n_muestras}")
col2.metric("Coeficiente Silueta (K-Means)", f"{silueta:.4f}")
col3.metric("Exactitud LOO (KNN)", f"{exactitud_loo:.1%}")
col4.metric("Clasificacion Punto Nuevo", prediccion_nueva)

st.divider()

colores_cluster = ["blue", "green", "purple", "orange", "darkred", "cadetblue", "darkgreen"]

mapa = folium.Map(
    location=[lat_nueva, lon_nueva],
    zoom_start=12,
    tiles="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    attr="Esri World Street Map"
)

for cid in range(k_clusters):
    c_lat, c_lon = centroides[cid]
    color_zona = colores_cluster[cid % len(colores_cluster)]
    n_loc = int(conteo_clusters.get(cid, 0))
    cat_zona = "Alta Concentracion" if n_loc > promedio_locales else "Baja Concentracion"
    folium.Circle(
        location=[c_lat, c_lon],
        radius=1100,
        color=color_zona,
        fill=True,
        fill_opacity=0.10
    ).add_to(mapa)
    folium.Marker(
        location=[c_lat, c_lon],
        popup=f"<b>Centroide Cluster {cid}</b><br>Locales: {n_loc}<br>Zona: {cat_zona}",
        tooltip=f"Centroide Cluster {cid} ({cat_zona})",
        icon=folium.Icon(color="black", icon="star", prefix="fa")
    ).add_to(mapa)

for _, fila in df.iterrows():
    cid = int(fila["cluster"])
    color_pin = colores_cluster[cid % len(colores_cluster)]
    nombre_txt = fila["nombre"] if pd.notna(fila["nombre"]) else "Sin nombre"
    popup_html = (
        f"<b>{nombre_txt}</b><br>"
        f"Cluster: {cid}<br>"
        f"Categoria: {fila['categoria_densidad']}<br>"
        f"Coords: {fila['latitud']:.5f}, {fila['longitud']:.5f}"
    )
    folium.Marker(
        location=[fila["latitud"], fila["longitud"]],
        popup=folium.Popup(popup_html, max_width=250),
        tooltip=f"{nombre_txt} (Cluster {cid})",
        icon=folium.Icon(color=color_pin, icon="cutlery", prefix="fa")
    ).add_to(mapa)

vecinos_rows = []
for orden, (idx, dist_km) in enumerate(zip(indices_vecinos[0], distancias_km), start=1):
    v_lat = float(df.loc[idx, "latitud"])
    v_lon = float(df.loc[idx, "longitud"])
    v_nombre = df.loc[idx, "nombre"] if pd.notna(df.loc[idx, "nombre"]) else "Sin nombre"
    v_cluster = int(df.loc[idx, "cluster"])
    v_cat = df.loc[idx, "categoria_densidad"]

    folium.PolyLine(
        locations=[[lat_nueva, lon_nueva], [v_lat, v_lon]],
        color="crimson",
        weight=3,
        opacity=0.85,
        dash_array="6, 6",
        tooltip=f"Vecino {orden}: {v_nombre} ({dist_km:.2f} km)"
    ).add_to(mapa)

    vecinos_rows.append({
        "Orden": orden,
        "Sucursal Cercana": v_nombre,
        "Cluster": v_cluster,
        "Categoria": v_cat,
        "Latitud": round(v_lat, 5),
        "Longitud": round(v_lon, 5),
        "Distancia Haversine (km)": round(float(dist_km), 3)
    })

folium.Marker(
    location=[lat_nueva, lon_nueva],
    popup=(
        f"<b>Nueva Ubicacion Propuesta</b><br>"
        f"Clasificacion KNN: {prediccion_nueva}<br>"
        f"Coords: {lat_nueva:.5f}, {lon_nueva:.5f}"
    ),
    tooltip=f"Ubicacion Propuesta ({prediccion_nueva})",
    icon=folium.Icon(color="red", icon="flag", prefix="fa")
).add_to(mapa)

col_mapa, col_leyenda = st.columns([3, 1])

with col_mapa:
    st.subheader("Mapa Interactivo de Clusters y Vecinos Cercanos")
    components.html(mapa._repr_html_(), height=520, scrolling=False)

with col_leyenda:
    st.subheader("Leyenda del Mapa")
    st.markdown(
        "- **Bandera Roja:** Nueva ubicacion propuesta a evaluar.\n"
        "- **Estrella Negra:** Centroide geografico de cada cluster K-Means.\n"
        "- **Marcadores de Colores:** Sucursales actuales agrupadas por cluster.\n"
        "- **Lineas Punteadas Rojas:** Distancia Haversine hacia los k vecinos mas cercanos.\n"
        "- **Alta Concentracion:** Clusters con mas locales que el promedio "
        f"({promedio_locales:.2f} locales/cluster).\n"
        "- **Baja Concentracion:** Clusters con cantidad de locales igual o menor al promedio."
    )

st.subheader(f"Detalle de los {k_vecinos} Vecinos Mas Cercanos (Distancia Haversine)")
df_vecinos = pd.DataFrame(vecinos_rows)
st.dataframe(df_vecinos, use_container_width=True, hide_index=True)

with st.expander("Ver Dataset Completo Clasificado"):
    st.dataframe(df, use_container_width=True, hide_index=True)

st.divider()
st.subheader("Interpretacion Estrategica y Limitaciones Tecnicas")

dist_min = df_vecinos["Distancia Haversine (km)"].min()
if prediccion_nueva == "Alta Concentracion":
    st.info(
        f"Interpretacion del punto evaluado ({lat_nueva:.5f}, {lon_nueva:.5f}): "
        "La ubicacion se situa en un entorno de Alta Concentracion comercial. "
        "Esto indica demanda comercial validada y alto dinamismo urbano, pero implica "
        f"mayor riesgo de canibalizacion entre sucursales (sucursal mas cercana a {dist_min:.2f} km)."
    )
else:
    st.success(
        f"Interpretacion del punto evaluado ({lat_nueva:.5f}, {lon_nueva:.5f}): "
        "La ubicacion se situa en un entorno de Baja Concentracion comercial. "
        "Representa una oportunidad potencial de expansion geografica con menor competencia "
        f"interna directa (sucursal mas cercana a {dist_min:.2f} km)."
    )

st.warning(
    "Limitaciones Tecnicas y Metodologicas: Los datos provienen de OpenStreetMap (OSM), "
    "una plataforma de mapeo colaborativo voluntario. Por lo tanto, la presencia o ausencia de puntos "
    "refleja el nivel de cobertura cartografica comunitaria y no constituye un censo comercial oficial. "
    "Asimismo, este modelo evalua exclusivamente proximidad y densidad espacial, por lo que no mide "
    "flujo real peatonal o vehicular, poder adquisitivo, costos de alquiler ni rentabilidad financiera garantizada."
)
