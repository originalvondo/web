const API_KEY = "63fe3bddc3f94c3ab94406675dedfcef"; // your API key
const BASE_URL = "https://newsapi.org/v2";

const newsContainer = document.getElementById("news-container");

async function loadNews(category = "general") {
  const url = `${BASE_URL}/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
  fetchNews(url);
}

async function searchNews(event) {
  event.preventDefault();
  const query = document.getElementById("searchInput").value;
  if (!query) return;
  const url = `${BASE_URL}/everything?q=${query}&apiKey=${API_KEY}`;
  fetchNews(url);
}

async function fetchNews(url) {
  newsContainer.innerHTML = "<p>Loading news...</p>";
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    newsContainer.innerHTML = "<p>Error fetching news.</p>";
    console.error(error);
  }
}

function displayNews(articles) {
  if (!articles || articles.length === 0) {
    newsContainer.innerHTML = "<p>No articles found.</p>";
    return;
  }

  newsContainer.innerHTML = "";
  articles.forEach(article => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    const card = `
      <div class="card h-100">
        <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" class="card-img-top" alt="News Image">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${article.title}</h5>
          <p class="card-text">${article.description || ""}</p>
          <a href="${article.url}" class="btn btn-primary mt-auto" target="_blank">Read more</a>
        </div>
      </div>
    `;
    col.innerHTML = card;
    newsContainer.appendChild(col);
  });
}

// Load default news on page load
loadNews();
