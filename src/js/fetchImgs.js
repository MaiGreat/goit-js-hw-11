export { fetchGalleryImgs };
import axios from "axios";


const KEY_API = '35757579-810682b68e67eb47e9525b84f';
const URL = 'https://pixabay.com/api/';



const fetchGalleryImgs = async (userRequest) => {
console.log(userRequest);
    const response = await axios.get(URL, {
        params: {
            key: KEY_API,
            q: userRequest,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: '1',
            per_page: '40'
        }
    });
    return response.data;
};

fetchGalleryImgs().then(galleryImgs => {
    console.log(galleryImgs)
    
});