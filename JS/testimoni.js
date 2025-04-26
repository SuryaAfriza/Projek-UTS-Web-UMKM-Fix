document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const tableBody = document.querySelector('tbody');
  const featuredContainer = document.querySelector('.row.g-4');
  let testimonialCount = tableBody.rows.length;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const ratingValue = form.querySelector('select').value;
    const message = form.querySelector('textarea').value.trim();

    if (!name || !ratingValue || !message) return;

    const starsHTML = getStarsHTML(parseInt(ratingValue));
    const date = new Date().toLocaleDateString('id-ID');

    // Tambah ke tabel
    testimonialCount++;
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${testimonialCount}</td>
        <td>${name}</td>
        <td><span class="text-warning">${starsHTML}</span></td>
        <td>${message}</td>
        <td>${date}</td>
        <td>
          <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-dark"><i class="fas fa-eye"></i></button>
            <button class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      `;
    tableBody.appendChild(newRow);

    // Tambah ke Featured Testimonial
    const newCard = document.createElement('div');
    newCard.className = 'col-md-4';
    newCard.innerHTML = `
        <div class="testimonial-card p-4 h-100 bg-white">
          <div class="rating mb-3">${starsHTML}</div>
          <p class="mb-4">"${message}"</p>
          <div class="d-flex align-items-center">
            <div>
              <h6 class="mb-0">${name}</h6>
            </div>
          </div>
        </div>
      `;
    featuredContainer.insertBefore(newCard, featuredContainer.firstChild);

    form.reset();
  });

  function getStarsHTML(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        html += '<i class="fas fa-star"></i>';
      } else {
        html += '<i class="far fa-star"></i>';
      }
    }
    return html;
  }
});
