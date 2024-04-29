let puntuacion: number = 0;
const imagenCarta = document.getElementById("imagenCarta");
const btnDameCarta = document.getElementById("dameCarta");
const btnPlantarse = document.getElementById("plantarse");
const btnNuevaPartida = document.getElementById("restart");
const btnVerResultado = document.getElementById("verResultado");
const divPuntuacion = document.getElementById("puntuacion");
const divNuevaPartida = document.getElementById("nuevaPartida");

const obtenerNumeroAleatorio = (): number => Math.floor(Math.random() * 10 + 1);

const generarNumeroCarta = (numeroAleatorio: number): number =>
  numeroAleatorio > 7 ? numeroAleatorio + 2 : numeroAleatorio;

const obtenerUrlCarta = (carta: number): string => {
  const baseCartaUrl = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/";
  switch (carta) {
    case 1:
      return baseCartaUrl + "1_as-copas.jpg";
    case 2:
      return baseCartaUrl + "2_dos-copas.jpg";
    case 3:
      return baseCartaUrl + "3_tres-copas.jpg";
    case 4:
      return baseCartaUrl + "4_cuatro-copas.jpg";
    case 5:
      return baseCartaUrl + "5_cinco-copas.jpg";
    case 6:
      return baseCartaUrl + "6_seis-copas.jpg";
    case 7:
      return baseCartaUrl + "7_siete-copas.jpg";
    case 10:
      return baseCartaUrl + "10_sota-copas.jpg";
    case 11:
      return baseCartaUrl + "11_caballo-copas.jpg";
    case 12:
      return baseCartaUrl + "12_rey-copas.jpg";
    default:
      return "";
  }
};

const mostrarCartaEnHTML = (url: string): void => {
  if (imagenCarta != null && imagenCarta !== undefined && imagenCarta instanceof HTMLImageElement) {
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

const obtenerPuntosCarta = (carta: number): number => (carta >= 10 ? 0.5 : carta);

const comprobarPuntuacion = (): void => {
  if (puntuacion > 7.5) {
    finalizarJuego();
  }
};

const actualizarPuntuacion = (carta: number): void => {
  puntuacion += obtenerPuntosCarta(carta);
  mostrarPuntuacion();
};

const mostrarPuntuacion = (): void => {
  if (divPuntuacion !== null && divPuntuacion !== undefined && divPuntuacion instanceof HTMLDivElement) {
    divPuntuacion.innerHTML = `Tu puntuación actual es: ${puntuacion.toString()}`;
  }
};

const finalizarJuego = (): void => {
  if (divPuntuacion !== null && divPuntuacion !== undefined && divPuntuacion instanceof HTMLDivElement) {
    divPuntuacion.innerHTML = `Tu puntuación es ${puntuacion.toString()}, <strong>GAME OVER</strong>`;
  }
  deshabilitarBotones();
  mostrarNuevaPartida();
};

const deshabilitarBotones = (): void => {
  if (
    btnDameCarta !== null &&
    btnDameCarta !== undefined &&
    btnDameCarta instanceof HTMLButtonElement &&
    btnPlantarse !== null &&
    btnPlantarse !== undefined &&
    btnPlantarse instanceof HTMLButtonElement
  ) {
    btnDameCarta.disabled = true;
    btnPlantarse.disabled = true;
  }
};

const dameCarta = (): void => {
  const numeroAleatorio = obtenerNumeroAleatorio();
  const cartaGenerada = generarNumeroCarta(numeroAleatorio);
  const urlCarta = obtenerUrlCarta(cartaGenerada);
  mostrarCartaEnHTML(urlCarta);
  actualizarPuntuacion(cartaGenerada);
  comprobarPuntuacion();
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
  deshabilitarBotones();
  const mensaje = obtenerMensajePuntuacion(puntuacion);
  if (divPuntuacion !== null && divPuntuacion !== undefined && divPuntuacion instanceof HTMLDivElement) {
    divPuntuacion.innerHTML = `Tu puntuación fue ${puntuacion}. ${mensaje}`;
  }
  comprobarPuntuacion();
  mostrarNuevaPartida();
  if (btnVerResultado !== null && btnVerResultado !== undefined && btnVerResultado instanceof HTMLButtonElement) {
    btnVerResultado.hidden = false;
    btnVerResultado.addEventListener("click", verResultado);
  }
};

const verResultado = (): void => {
  dameCarta();
  if (puntuacion > 7.5 && divPuntuacion !== null) {
    divPuntuacion.innerHTML = `Tu puntuación es ${puntuacion.toString()}, <strong>GAME OVER</strong>`;
  }
  if (btnVerResultado !== null && btnVerResultado !== undefined && btnVerResultado instanceof HTMLButtonElement) {
    btnVerResultado.hidden = true;
  }
};

const mostrarNuevaPartida = (): void => {
  if (
    divNuevaPartida !== null &&
    btnNuevaPartida !== null &&
    btnNuevaPartida !== undefined &&
    btnNuevaPartida instanceof HTMLButtonElement
  ) {
    btnNuevaPartida.hidden = false;
    btnNuevaPartida.addEventListener("click", reiniciar);
  }
};

const reiniciar = (): void => {
  puntuacion = 0;
  if (imagenCarta !== null && imagenCarta !== undefined && imagenCarta instanceof HTMLImageElement) {
    imagenCarta.src = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  }
  if (btnDameCarta !== null && btnDameCarta !== undefined && btnDameCarta instanceof HTMLButtonElement) {
    btnDameCarta.disabled = false;
  }
  if (btnPlantarse !== null && btnPlantarse !== undefined && btnPlantarse instanceof HTMLButtonElement) {
    btnPlantarse.disabled = false;
  }
  if (btnNuevaPartida !== null && btnNuevaPartida !== undefined && btnNuevaPartida instanceof HTMLButtonElement) {
    btnNuevaPartida.hidden = true;
  }
  if (btnVerResultado !== null && btnVerResultado !== undefined && btnVerResultado instanceof HTMLButtonElement) {
    btnVerResultado.hidden = true;
  }
  mostrarPuntuacion();
};

document.addEventListener("DOMContentLoaded", mostrarPuntuacion);
if (btnDameCarta !== null && btnDameCarta !== undefined && btnDameCarta instanceof HTMLButtonElement) {
  btnDameCarta.addEventListener("click", dameCarta);
}
if (btnPlantarse !== null && btnPlantarse !== undefined && btnPlantarse instanceof HTMLButtonElement) {
  btnPlantarse.addEventListener("click", plantarse);
}
