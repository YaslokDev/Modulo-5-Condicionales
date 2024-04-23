let puntuacion: number = 0;
const imagenCarta = document.getElementById("imagenCarta") as HTMLImageElement;
const btnDameCarta = document.getElementById("dameCarta") as HTMLButtonElement;
const btnPlantarse = document.getElementById("plantarse") as HTMLButtonElement;
const btnNuevaPartida = document.getElementById("restart") as HTMLButtonElement;
const btnVerResultado = document.getElementById("verResultado") as HTMLButtonElement;
const divPuntuacion = document.getElementById("puntuacion");
const divNuevaPartida = document.getElementById("nuevaPartida");

const muestraPuntuacion = () => {
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
    imagenCarta.classList.add("card-animation");
    imagenCarta.addEventListener(
      "animationend",
      () => {
        imagenCarta.classList.remove("card-animation");
      },
      { once: true }
    );
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
  if (puntuacion > 7.5 && divPuntuacion !== null) {
    divPuntuacion.innerHTML = `Tu puntuación es ${puntuacion.toString()}, <strong>GAME OVER</strong>`;
    btnDameCarta.disabled = true;
    btnPlantarse.disabled = true;
    nuevaPartida();
  }
};

const plantarse = () => {
  btnDameCarta.disabled = true;
  btnPlantarse.disabled = true;
  if ((puntuacion <= 4 || puntuacion < 5) && divPuntuacion !== null) {
    divPuntuacion.innerHTML = `Tu puntuación fue ${puntuacion}. Has sido muy conservador`;
  } else if ((puntuacion === 5 || puntuacion < 6) && divPuntuacion !== null) {
    divPuntuacion.innerHTML = `Tu puntuación fue ${puntuacion}. Te ha entrado el canguelo eh?`;
  } else if ((puntuacion === 6 || puntuacion <= 7) && divPuntuacion !== null) {
    divPuntuacion.innerHTML = `Tu puntuación fue ${puntuacion}. Casi casi...`;
  } else if (puntuacion === 7.5 && divPuntuacion !== null) {
    divPuntuacion.innerHTML = `Tu puntuación fue ${puntuacion}. <strong>¡ Lo has clavado! ¡Enhorabuena! 🎉🎉</strong>`;
  }
  nuevaPartida();
  btnVerResultado.hidden = false;
  btnVerResultado.addEventListener("click", verResultado);
};

const verResultado = () => {
  dameCarta();
  if (puntuacion > 7.5 && divPuntuacion !== null) {
    divPuntuacion.innerHTML = `Tu puntuación es ${puntuacion.toString()}, <strong>GAME OVER</strong>`;
  }
};

const nuevaPartida = () => {
  if (divNuevaPartida !== null) {
    btnNuevaPartida.hidden = false;
    btnNuevaPartida.addEventListener("click", reiniciar);
  }
};

const reiniciar = () => {
  puntuacion = 0;
  imagenCarta.src = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  btnDameCarta.disabled = false;
  btnPlantarse.disabled = false;
  btnNuevaPartida.hidden = true;
  btnVerResultado.hidden = true;
  muestraPuntuacion();
};

document.addEventListener("DOMContentLoaded", muestraPuntuacion);
btnDameCarta?.addEventListener("click", dameCarta);
btnPlantarse.addEventListener("click", plantarse);
