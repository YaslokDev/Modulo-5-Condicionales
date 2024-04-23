let puntuacion: number = 0;
const imagenCarta = document.getElementById("imagenCarta") as HTMLImageElement;
const btnDameCarta = document.getElementById("dameCarta") as HTMLButtonElement;
const btnPlantarse = document.getElementById("plantarse") as HTMLButtonElement;
const btnNuevaPartida = document.getElementById("restart") as HTMLButtonElement;
const btnVerResultado = document.getElementById("verResultado") as HTMLButtonElement;
const divPuntuacion = document.getElementById("puntuacion");
const divNuevaPartida = document.getElementById("nuevaPartida");

const obtenerNumeroAleatorio = (): number => {
  return Math.floor(Math.random() * 10 + 1);
};

const generarNumeroCarta = (numeroAleatorio: number): number => {
  let cartaGenerada: number = numeroAleatorio;
  if (cartaGenerada > 7) {
    cartaGenerada += 2;
  }
  return cartaGenerada;
};

const obtenerUrlCarta = (carta: number): string => {
  switch (carta) {
    case 1:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
    case 2:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
    case 3:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
    case 4:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
    case 5:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
    case 6:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
    case 7:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
    case 10:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
    case 11:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
    case 12:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
    default:
      return "";
  }
};

const mostrarCartaEnHTML = (url: string): void => {
  if (imagenCarta) {
    imagenCarta.src = url;
    imagenCarta.classList.add("card-animation");
    imagenCarta.addEventListener(
      "animationend",
      () => {
        imagenCarta.classList.remove("card-animation");
      },
      { once: true }
    );
  }
};

const obtenerPuntosCarta = (carta: number): number => {
  return carta >= 10 ? 0.5 : carta;
};

const sumarPuntuacion = (carta: number): void => {
  const puntosCarta = obtenerPuntosCarta(carta);
  puntuacion += puntosCarta;
  muestraPuntuacion();
  if (puntuacion > 7.5 && divPuntuacion !== null) {
    finalizarJuego();
  }
};

const muestraPuntuacion = (): void => {
  if (divPuntuacion !== null) {
    divPuntuacion.innerHTML = `Tu puntuación actual es : ${puntuacion.toString()}`;
  }
};

const finalizarJuego = (): void => {
  if (divPuntuacion !== null) {
    divPuntuacion.innerHTML = `Tu puntuación es ${puntuacion.toString()}, <strong>GAME OVER</strong>`;
  }
  btnDameCarta.disabled = true;
  btnPlantarse.disabled = true;
  nuevaPartida();
};

const dameCarta = (): void => {
  const numeroAleatorio = obtenerNumeroAleatorio();
  const cartaGenerada = generarNumeroCarta(numeroAleatorio);
  const urlCarta = obtenerUrlCarta(cartaGenerada);
  mostrarCartaEnHTML(urlCarta);
  sumarPuntuacion(cartaGenerada);
};

const obtenerMensajePuntuacion = (puntuacion: number): string => {
  if (puntuacion <= 4 || puntuacion < 5) {
    return "Has sido muy conservador";
  } else if (puntuacion === 5 || puntuacion < 6) {
    return "Te ha entrado el canguelo eh?";
  } else if (puntuacion === 6 || puntuacion <= 7) {
    return "Casi casi...";
  } else if (puntuacion === 7.5) {
    return "<strong>¡Lo has clavado! ¡Enhorabuena! 🎉🎉</strong>";
  }
  return "";
};

const plantarse = (): void => {
  btnDameCarta.disabled = true;
  btnPlantarse.disabled = true;

  const mensaje = obtenerMensajePuntuacion(puntuacion);
  const mensajeCompleto = `Tu puntuación fue ${puntuacion}. ${mensaje}`;

  if (divPuntuacion !== null) {
    divPuntuacion.innerHTML = mensajeCompleto;
  }

  nuevaPartida();
  btnVerResultado.hidden = false;
  btnVerResultado.addEventListener("click", verResultado);
};

const verResultado = (): void => {
  dameCarta();
  if (puntuacion > 7.5 && divPuntuacion !== null) {
    divPuntuacion.innerHTML = `Tu puntuación es ${puntuacion.toString()}, <strong>GAME OVER</strong>`;
  }
  btnVerResultado.hidden = true;
};

const nuevaPartida = (): void => {
  if (divNuevaPartida !== null) {
    btnNuevaPartida.hidden = false;
    btnNuevaPartida.addEventListener("click", reiniciar);
  }
};

const reiniciar = (): void => {
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
