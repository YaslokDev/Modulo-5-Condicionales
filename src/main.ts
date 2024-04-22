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

  console.log(cartaGenerada);
};

document.addEventListener("DOMContentLoaded", muestraPuntuacion);
btnDameCarta?.addEventListener("click", dameCarta);
