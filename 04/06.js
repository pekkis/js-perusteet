/*
      Luo web-sivu, jossa käyttäjä voi siirtää palloa hiirellä oheisen videon
      mukaisesti.

      Kuva/video: ex0406.png / ex0406.mp4
     */

document.querySelectorAll(".ball").forEach((ball) => {
  let isDragging = false;
  let startX, startY;
  let initialLeft, initialTop;

  ball.addEventListener("pointerdown", (e) => {
    isDragging = true;

    ball.setPointerCapture(e.pointerId);

    startX = e.clientX;
    startY = e.clientY;

    initialLeft = ball.offsetLeft;
    initialTop = ball.offsetTop;

    ball.style.cursor = "grabbing";
  });

  ball.addEventListener("pointermove", (e) => {
    if (!isDragging) {
      return;
    }

    const container = ball.offsetParent;
    if (!container) {
      return;
    }

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    let newLeft = initialLeft + deltaX;
    let newTop = initialTop + deltaY;

    const maxLeft = container.clientWidth - ball.offsetWidth;
    const maxTop = container.clientHeight - ball.offsetHeight;

    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));

    ball.style.left = `${newLeft}px`;
    ball.style.top = `${newTop}px`;
  });

  const stopDragging = (e) => {
    if (!isDragging) {
      return;
    }
    isDragging = false;
    ball.releasePointerCapture(e.pointerId);
    ball.style.cursor = "grab";
  };

  ball.addEventListener("pointerup", stopDragging);
  ball.addEventListener("pointercancel", stopDragging);
});
