let puntuacion: number = 0;
const btnDameCarta = document.getElementById("dameCarta");

const muestraPuntuacion = () => {
  const divPuntuacion = document.getElementById("puntuacion");
  if (divPuntuacion !== null) {
    divPuntuacion.innerHTML = `Tu puntuación actual es : ${puntuacion.toString()}`;
  }
};

const dameCarta = () => {
  let cartaGenerada: number = Math.floor(Math.random() * 10 + 1);

  if (cartaGenerada > 7) {
    cartaGenerada += 2;
  }

  mostrarCarta(cartaGenerada);
  console.log(cartaGenerada);
};

const mostrarCarta = (carta: number): void => {
  const imagenCarta = document.getElementById("imagenCarta") as HTMLImageElement;
  if (imagenCarta) {
    switch (carta) {
      case 1:
        imagenCarta.src = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
        break;
      case 2:
        imagenCarta.src =
          "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
        break;
      case 3:
        imagenCarta.src =
          "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
        break;
      case 4:
        imagenCarta.src =
          "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
        break;
      case 5:
        imagenCarta.src =
          "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
        break;
      case 6:
        imagenCarta.src =
          "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
        break;
      case 7:
        imagenCarta.src =
          "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
        break;
      case 10:
        imagenCarta.src =
          "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
        break;
      case 11:
        imagenCarta.src =
          "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
        break;
      case 12:
        imagenCarta.src =
          "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
        break;
    }
    sumarPuntuacion(carta);
  }
};

const sumarPuntuacion = (carta: number) => {
  if (carta >= 10) {
    puntuacion += 0.5;
  } else {
    puntuacion += carta;
  }
  muestraPuntuacion();
};

document.addEventListener("DOMContentLoaded", muestraPuntuacion);
btnDameCarta?.addEventListener("click", dameCarta);
