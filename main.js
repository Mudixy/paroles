// Attendre que le DOM soit complètement chargé
document.addEventListener("DOMContentLoaded", () => {
    // Éléments DOM communs
    const themeToggle = document.getElementById("themeToggle")
    const themeIcon = themeToggle ? themeToggle.querySelector("i") : null
    const searchInput = document.getElementById("searchInput")
    const searchResults = document.getElementById("searchResults")
    const featuredArticles = document.getElementById("featuredArticles")
    const recentArticles = document.getElementById("recentArticles")
    const allArticlesList = document.getElementById("allArticlesList")
    const articleFilter = document.getElementById("articleFilter")
    const randomArticleLink = document.getElementById("randomArticle")
    const allArticlesLink = document.getElementById("allArticles")
  
    // Fonction pour scanner le répertoire wiki et obtenir la liste des articles
    // Dans un environnement réel, cela serait fait côté serveur
    // Ici, nous allons simuler avec une liste statique
    const articles = [
      {
        title: "La belle et la bête (Indochine) - 2024",
        slug: "labelleetlabete-indochine",
        lastUpdated: "2025-03-23",
        featured: true,
        image: "https://m.media-amazon.com/images/I/71e1fmEil0L._UF1000,1000_QL80_.jpg",
        category: "Indochine",
      },
      {
        title: "Ciel (GIMS) - 2024",
        slug: "ciel-gims",
        lastUpdated: "2025-03-23",
        featured: true,
        image: "https://i.ytimg.com/vi/QS0A-CjRdAE/maxresdefault.jpg",
        category: "GIMS",
      },
    ]
  
    // Vérifier la préférence de thème
    if (localStorage.getItem("darkTheme") === "true" && themeToggle) {
      document.body.classList.add("dark-theme")
      themeIcon.classList.remove("fa-moon")
      themeIcon.classList.add("fa-sun")
    }
  
    // Fonctionnalité de basculement de thème
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme")
        const isDarkTheme = document.body.classList.contains("dark-theme")
        localStorage.setItem("darkTheme", isDarkTheme)
  
        if (isDarkTheme) {
          themeIcon.classList.remove("fa-moon")
          themeIcon.classList.add("fa-sun")
        } else {
          themeIcon.classList.remove("fa-sun")
          themeIcon.classList.add("fa-moon")
        }
      })
    }
  
    // Fonctionnalité de recherche
    if (searchInput && searchResults) {
      searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase()
  
        if (searchTerm.length < 2) {
          searchResults.style.display = "none"
          return
        }
  
        const filteredArticles = articles.filter(
          (article) =>
            article.title.toLowerCase().includes(searchTerm) || article.category.toLowerCase().includes(searchTerm),
        )
  
        if (filteredArticles.length > 0) {
          searchResults.innerHTML = ""
          filteredArticles.forEach((article) => {
            const resultItem = document.createElement("a")
            resultItem.href = `paroles/${article.slug}.html`
            resultItem.textContent = article.title
            searchResults.appendChild(resultItem)
          })
          searchResults.style.display = "block"
        } else {
          searchResults.innerHTML = '<p style="padding: 0.5rem 1rem;">Aucun résultat trouvé</p>'
          searchResults.style.display = "block"
        }
      })
  
      // Masquer les résultats de recherche lors d'un clic à l'extérieur
      document.addEventListener("click", (e) => {
        if (e.target !== searchInput && e.target !== searchResults) {
          searchResults.style.display = "none"
        }
      })
    }
  
    // Charger les articles en vedette sur la page d'accueil
    if (featuredArticles) {
      const featured = articles.filter((article) => article.featured)
      featured.forEach((article) => {
        const articleCard = document.createElement("div")
        articleCard.className = "article-card"
        articleCard.innerHTML = `
                  <img src="${article.image}" alt="${article.title}">
                  <div class="article-card-content">
                      <h4><a href="paroles/${article.slug}.html">${article.title}</a></h4>
                      <small>Dernière mise à jour: ${formatDate(article.lastUpdated)}</small>
                      ${article.category ? `<span class="article-category">${article.category}</span>` : ""}
                  </div>
              `
        featuredArticles.appendChild(articleCard)
      })
    }
  
    // Charger les articles récents sur la page d'accueil
    if (recentArticles) {
      // Trier les articles par date de dernière mise à jour
      const recent = [...articles].sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)).slice(0, 5) // Obtenir les 5 plus récents
  
      recent.forEach((article) => {
        const listItem = document.createElement("li")
        listItem.innerHTML = `
                  <a href="paroles/${article.slug}.html">${article.title}</a>
                  <span class="article-date">Dernière mise à jour: ${formatDate(article.lastUpdated)}</span>
                  ${article.category ? `<span class="article-category">${article.category}</span>` : ""}
              `
        recentArticles.appendChild(listItem)
      })
    }
  
    // Afficher tous les articles
    if (allArticlesList) {
      displayArticles(articles)
  
      // Filtrer les articles
      if (articleFilter) {
        articleFilter.addEventListener("input", () => {
          const filterTerm = articleFilter.value.toLowerCase()
          const filteredArticles = articles.filter(
            (article) =>
              article.title.toLowerCase().includes(filterTerm) || article.category.toLowerCase().includes(filterTerm),
          )
          displayArticles(filteredArticles)
        })
      }
    }
  
    // Fonction pour afficher les articles
    function displayArticles(articlesToShow) {
      if (!allArticlesList) return
  
      allArticlesList.innerHTML = ""
  
      if (articlesToShow.length === 0) {
        allArticlesList.innerHTML = "<p>Aucun article trouvé</p>"
        return
      }
  
      articlesToShow.forEach((article) => {
        const articleCard = document.createElement("div")
        articleCard.className = "article-card"
        articleCard.innerHTML = `
                  <img src="${article.image}" alt="${article.title}">
                  <div class="article-card-content">
                      <h4><a href="paroles/${article.slug}.html">${article.title}</a></h4>
                      <small>Dernière mise à jour: ${formatDate(article.lastUpdated)}</small>
                      ${article.category ? `<span class="article-category">${article.category}</span>` : ""}
                  </div>
              `
        allArticlesList.appendChild(articleCard)
      })
    }
  
    // Fonctionnalité d'article aléatoire
    if (randomArticleLink) {
      randomArticleLink.addEventListener("click", (e) => {
        e.preventDefault()
        if (articles.length === 0) return
  
        const randomIndex = Math.floor(Math.random() * articles.length)
        window.location.href = `paroles/${articles[randomIndex].slug}.html`
      })
    }
  
    // Fonctionnalité de tous les articles
    if (allArticlesLink) {
      allArticlesLink.addEventListener("click", (e) => {
        e.preventDefault()
        window.location.href = "index.html#allArticlesList"
  
        // Faire défiler jusqu'à la section
        const allArticlesSection = document.querySelector(".all-articles-section")
        if (allArticlesSection) {
          allArticlesSection.scrollIntoView({ behavior: "smooth" })
        }
      })
    }
  
    // Helper function to format dates
    function formatDate(dateString) {
      const date = new Date(dateString)
      const day = date.getDate().toString().padStart(2, "0")
      const month = (date.getMonth() + 1).toString().padStart(2, "0")
      const year = date.getFullYear()
      return `${day}/${month}/${year}`
    }
  })  