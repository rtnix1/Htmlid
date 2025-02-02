let blogPosts = [];
let wikiPages = [];

function search() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  const blogResults = blogPosts.filter(post => post.title.toLowerCase().includes(searchInput) || post.content.toLowerCase().includes(searchInput));
  const wikiResults = wikiPages.filter(page => page.title.toLowerCase().includes(searchInput) || page.content.toLowerCase().includes(searchInput));

  if (blogResults.length > 0) {
    const blogSection = document.createElement('div');
    blogSection.innerHTML = '<h3>نتایج وبلاگ</h3>';
    blogResults.forEach(post => {
      const resultItem = createMediaElement(post.title, post.content, post.media);
      blogSection.appendChild(resultItem);
    });
    resultsContainer.appendChild(blogSection);
  }

  if (wikiResults.length > 0) {
    const wikiSection = document.createElement('div');
    wikiSection.innerHTML = '<h3>نتایج دانش‌نامه</h3>';
    wikiResults.forEach(page => {
      const resultItem = createMediaElement(page.title, page.content, page.media);
      wikiSection.appendChild(resultItem);
    });
    resultsContainer.appendChild(wikiSection);
  }

  if (blogResults.length === 0 && wikiResults.length === 0) {
    resultsContainer.innerHTML = '<p>نتیجه‌ای یافت نشد.</p>';
  }
}

function register() {
  const username = document.getElementById('registerUsername').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  alert('ثبت‌نام موفقیت‌آمیز بود! \nنام کاربری: ' + username + '\nایمیل: ' + email);
}

function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  alert('ورود موفقیت‌آمیز بود! \nنام کاربری: ' + username);
}

function submitBlog() {
  const title = document.getElementById('blogTitle').value;
  const content = document.getElementById('blogContent').value;
  const mediaFile = document.getElementById('blogMedia').files[0];

  handleMediaUpload(mediaFile, (media) => {
    const post = { title, content, media };
    blogPosts.push(post);

    const blogPostsContainer = document.getElementById('blogPosts');
    const article = createMediaElement(title, content, media);
    blogPostsContainer.appendChild(article);

    document.getElementById('blogForm').reset();
  });
}

function submitWiki() {
  const title = document.getElementById('wikiTitle').value;
  const content = document.getElementById('wikiContent').value;
  const mediaFile = document.getElementById('wikiMedia').files[0];

  handleMediaUpload(mediaFile, (media) => {
    const page = { title, content, media };
    wikiPages.push(page);

    const wikiPagesContainer = document.getElementById('wikiPages');
    const article = createMediaElement(title, content, media);
    wikiPagesContainer.appendChild(article);

    document.getElementById('wikiForm').reset();
  });
}

function handleMediaUpload(file, callback) {
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const media = { src: e.target.result, type: file.type };
      callback(media);
    };
    reader.readAsDataURL(file);
  } else {
    callback(null);
  }
}

function createMediaElement(title, content, media) {
  const resultItem = document.createElement('div');
  resultItem.className = 'result-item';
  resultItem.innerHTML = `<h4>${title}</h4><p>${content}</p>`;
  
  if (media) {
    if (media.type.startsWith('image')) {
      const img = document.createElement('img');
      img.src = media.src;
      img.alt = title;
      resultItem.appendChild(img);
    } else if (media.type.startsWith('video')) {
      const video = document.createElement('video');
      video.controls = true;
      video.src = media.src;
      resultItem.appendChild(video);
    }
  }
  
  return resultItem;
}