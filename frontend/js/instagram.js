const Instagram = () => {
  function getLatestPosts() {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    fetch('/instagram', { method: 'GET', headers })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.body) {
          const parsed = JSON.parse(resp.body);
          addPosts(parsed.data);
        }
      })
      .catch((error) => { console.log('GET INSTAGRAM POSTS ERROR:', error); });
  }

  function addPosts(data) {
    const wrap = document.getElementById('instaposts');
    const fragment = document.createDocumentFragment();

    data.forEach((item) => {
      const link = document.createElement('a');
      const img  = document.createElement('img');

      link.className = 'insta-link';
      link.href = item.link;
      link.target = '_blank';
      img.src = item.images.thumbnail.url;

      link.appendChild(img);
      fragment.appendChild(link);
    });
    wrap.appendChild(fragment);
  }

  function init() {
    getLatestPosts();
  }

  init();
}

export default Instagram;