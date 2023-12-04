document.addEventListener('DOMContentLoaded', function () {
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const images = document.querySelectorAll('.image');

  let currentImage = 0;

  function showImage(index) {
      images.forEach(image => {
          image.classList.remove('active');
      });

      images[index].classList.add('active');
  }

  prevButton.addEventListener('click', () => {
      currentImage = (currentImage - 1 + images.length) % images.length;
      showImage(currentImage);
  });

  nextButton.addEventListener('click', () => {
      currentImage = (currentImage + 1) % images.length;
      showImage(currentImage);
  });
});