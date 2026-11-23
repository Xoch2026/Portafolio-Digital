import random
import sys
from collections import deque
import pygame

# --- CONFIGURACIÓN GENERAL ---
ANCHO, ALTO = 900, 700
ALTO_HUD = 50
FPS = 60

COLOR_FONDO = (10, 10, 15)
COLOR_PARED = (0, 255, 150)       # Verde Neón
COLOR_CAMINO = (20, 25, 35)       # Oscuro
COLOR_JUGADOR = (0, 220, 255)     # Cían
COLOR_META = (255, 0, 100)        # Magenta
COLOR_PISTA = (255, 215, 0)       # Dorado
COLOR_TEXTO = (240, 240, 240)

FILAS, COLS = 27, 39
FACTOR_ATAJOS = 0.10  # 10% de paredes eliminadas para crear ciclos

# Mapeo de teclas de movimiento (Dirección en Fila, Columna)
TECLAS_MOV = {
    pygame.K_UP: (-1, 0),    pygame.K_w: (-1, 0),
    pygame.K_DOWN: (1, 0),   pygame.K_s: (1, 0),
    pygame.K_LEFT: (0, -1),  pygame.K_a: (0, -1),
    pygame.K_RIGHT: (0, 1),  pygame.K_d: (0, 1)
}


# --- 1. GENERACIÓN DEL MAPA (DFS / Backtracking) ---
def generar_laberinto(filas, cols):
    laberinto = [[1 for _ in range(cols)] for _ in range(filas)]
    pila = [(1, 1)]
    laberinto[1][1] = 0

    # Excavación de la ruta principal sin bucles
    while pila:
        f, c = pila[-1]
        vecinos = []
        for df, dc in [(-2, 0), (2, 0), (0, -2), (0, 2)]:
            nf, nc = f + df, c + dc
            if 1 <= nf < filas - 1 and 1 <= nc < cols - 1 and laberinto[nf][nc] == 1:
                vecinos.append((nf, nc, df, dc))

        if vecinos:
            nf, nc, df, dc = random.choice(vecinos)
            laberinto[f + df // 2][c + dc // 2] = 0
            laberinto[nf][nc] = 0
            pila.append((nf, nc))
        else:
            pila.pop()

    # Inyección de atajos / ciclos para quitar la linealidad
    paredes = [(f, c) for f in range(1, filas - 1) for c in range(1, cols - 1) if laberinto[f][c] == 1]
    for f, c in random.sample(paredes, int(len(paredes) * FACTOR_ATAJOS)):
        if (laberinto[f][c - 1] == 0 and laberinto[f][c + 1] == 0) or \
           (laberinto[f - 1][c] == 0 and laberinto[f + 1][c] == 0):
            laberinto[f][c] = 0

    return laberinto


# --- 2. BÚSQUEDA DEL CAMINO MÁS CORTO (BFS) ---
def buscar_camino_bfs(laberinto, inicio, meta):
    cola = deque([inicio])
    padres = {inicio: None}

    while cola:
        actual = cola.popleft()
        if actual == meta:
            break
        f, c = actual
        for df, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            vecino = (f + df, c + dc)
            if laberinto[vecino[0]][vecino[1]] == 0 and vecino not in padres:
                padres[vecino] = actual
                cola.append(vecino)

    # Reconstruir camino desde la meta hasta el inicio
    camino, paso = [], meta
    while paso:
        camino.append(paso)
        paso = padres.get(paso)
    return camino[::-1]


# --- 3. CLASE PRINCIPAL DEL JUEGO ---
class Juego:
    def __init__(self):
        self.laberinto = generar_laberinto(FILAS, COLS)
        self.jugador = (1, 1)
        self.meta = (FILAS - 2, COLS - 2)
        
        # Tamaño responsivo de celdas y márgenes de centrado
        self.tam = min(ANCHO // COLS, (ALTO - ALTO_HUD) // FILAS)
        self.ox = (ANCHO - self.tam * COLS) // 2
        self.oy = ALTO_HUD + ((ALTO - ALTO_HUD) - self.tam * FILAS) // 2
        
        self.pasos = 0
        self.estado = "jugando"
        self.mostrar_pista = False
        self.tiempo_pista = 0
        self.ruta_bfs = []
        
        # Calcular distancia inicial mínima
        self.distancia_optima = len(buscar_camino_bfs(self.laberinto, self.jugador, self.meta)) - 1

    def mover(self, df, dc):
        if self.estado != "jugando":
            return

        nf, nc = self.jugador[0] + df, self.jugador[1] + dc
        if self.laberinto[nf][nc] == 0:
            self.jugador = (nf, nc)
            self.pasos += 1
            if self.jugador == self.meta:
                self.estado = "victoria"

    def activar_pista(self):
        if self.estado == "jugando":
            self.ruta_bfs = buscar_camino_bfs(self.laberinto, self.jugador, self.meta)
            self.distancia_optima = len(self.ruta_bfs) - 1
            self.mostrar_pista = True
            self.tiempo_pista = pygame.time.get_ticks()

    def actualizar(self):
        # Ocultar la pista tras 3 segundos (3000 ms)
        if self.mostrar_pista and pygame.time.get_ticks() - self.tiempo_pista > 3000:
            self.mostrar_pista = False

    def rect(self, f, c):
        return pygame.Rect(self.ox + c * self.tam, self.oy + f * self.tam, self.tam, self.tam)

    def dibujar(self, pantalla, fuente, fuente_grande):
        pantalla.fill(COLOR_FONDO)

        # Renderizar cuadrícula del mapa
        for f in range(FILAS):
            for c in range(COLS):
                color = COLOR_PARED if self.laberinto[f][c] == 1 else COLOR_CAMINO
                pygame.draw.rect(pantalla, color, self.rect(f, c), 1 if self.laberinto[f][c] == 1 else 0)

        # Renderizar Pista BFS
        if self.mostrar_pista:
            for (f, c) in self.ruta_bfs:
                if (f, c) not in (self.jugador, self.meta):
                    pygame.draw.circle(pantalla, COLOR_PISTA, self.rect(f, c).center, max(2, self.tam // 6))

        # Renderizar Meta y Jugador
        pygame.draw.rect(pantalla, COLOR_META, self.rect(*self.meta).inflate(-2, -2))
        pygame.draw.circle(pantalla, COLOR_JUGADOR, self.rect(*self.jugador).center, max(2, self.tam // 2 - 1))

        # Renderizar HUD
        pygame.draw.rect(pantalla, (20, 25, 35), (0, 0, ANCHO, ALTO_HUD))
        info = f"Pasos: {self.pasos} | Distancia mínima (BFS): {self.distancia_optima} | [H]: Pista (3s) | [R]: Reiniciar"
        pantalla.blit(fuente.render(info, True, COLOR_TEXTO), (20, 15))

        # Pantalla de Felicitaciones
        if self.estado == "victoria":
            overlay = pygame.Surface((ANCHO, ALTO), pygame.SRCALPHA)
            overlay.fill((10, 10, 15, 210))
            pantalla.blit(overlay, (0, 0))

            t1 = fuente_grande.render("¡LABERINTO COMPLETADO!", True, COLOR_PARED)
            t2 = fuente.render(f"Completado en {self.pasos} pasos", True, COLOR_TEXTO)
            t3 = fuente.render("Presiona [ENTER] o [R] para jugar de nuevo", True, COLOR_JUGADOR)

            pantalla.blit(t1, t1.get_rect(center=(ANCHO // 2, ALTO // 2 - 40)))
            pantalla.blit(t2, t2.get_rect(center=(ANCHO // 2, ALTO // 2 + 15)))
            pantalla.blit(t3, t3.get_rect(center=(ANCHO // 2, ALTO // 2 + 60)))


# --- 4. BUCLE PRINCIPAL ---
def main():
    pygame.init()
    pantalla = pygame.display.set_mode((ANCHO, ALTO))
    pygame.display.set_caption("Laberinto Procedural: DFS vs BFS")
    fuente = pygame.font.SysFont("consolas", 16, bold=True)
    fuente_grande = pygame.font.SysFont("consolas", 36, bold=True)
    reloj = pygame.time.Clock()
    pygame.key.set_repeat(150, 50)

    juego = Juego()

    while True:
        for evento in pygame.event.get():
            if evento.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

            if evento.type == pygame.KEYDOWN:
                if evento.key in TECLAS_MOV:
                    df, dc = TECLAS_MOV[evento.key]
                    juego.mover(df, dc)
                elif evento.key == pygame.K_h:
                    juego.activar_pista()
                elif evento.key == pygame.K_r:
                    juego = Juego()
                elif evento.key == pygame.K_RETURN and juego.estado == "victoria":
                    juego = Juego()

        juego.actualizar()
        juego.dibujar(pantalla, fuente, fuente_grande)
        pygame.display.flip()
        reloj.tick(FPS)


if __name__ == "__main__":
    main()