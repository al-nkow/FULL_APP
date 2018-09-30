// Get media_id: https://api.instagram.com/oembed/?url=__paste_url_here__

const Reviews = () => {
  const accessToken = process.env.INSTAGRAM_TOKEN;
  // const seasons = [
  //   { mediaId: '1765397805398784524_1248861449', container: 'comments9'},
  //   { mediaId: '1681838738404005685_1248861449', container: 'comments8'},
  //   { mediaId: '1652124899873882954_1248861449', container: 'comments7'},
  //   { mediaId: '1611705572763091302_1248861449', container: 'comments6'},
  //   { mediaId: '1566641381136326319_1248861449', container: 'comments5'},
  //   { mediaId: '1534805046364982731_1248861449', container: 'comments4'},
  //   { mediaId: '1496345246148879211_1248861449', container: 'comments3'}
  // ];

  // function renderData (comments, target) {
  //   const container = document.getElementById(target);
  //   let reviews = '';
  //   comments.forEach(comment => {
  //     reviews += `<div class="comment-item"><b>${comment.from.username}</b> ${comment.text}</div>`;
  //   });
  //   container.innerHTML = reviews;
  // }

  // function getComments(token, media_id, element) {
  //   const url = `https://api.instagram.com/v1/media/${media_id}/comments?access_token=${token}`;
  //
  //   const storage = sessionStorage.getItem(element);
  //
  //   if (storage) {
  //     renderData(JSON.parse(storage), element);
  //     return;
  //   }
  //
  //   fetch(url)
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       if (data && data.data && data.data.length) {
  //         sessionStorage.setItem(element, JSON.stringify(data.data));
  //         renderData(data.data, element);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('GET COMMENTS ERROR:', error);
  //     });
  // }

  // seasons.forEach(season => getComments(accessToken, season.mediaId, season.container));

  // video info:
  // fetch('https://api.instagram.com/oembed?url=https://www.instagram.com/p/BglmQOjFf24/?utm_source=ig_share_sheet&igshid=1e3b0llcw69in&r=wa1')
  //   .then((resp) => resp.json())
  //   .then((data) => {
  //     console.log('data >>>', data);
  //   })
  //   .catch((error) => {
  //     console.log('GET VIDEO POST ERROR:', error);
  //   });


};

export default Reviews;