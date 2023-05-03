import axios from "axios";


const KEY_API = '35757579-810682b68e67eb47e9525b84f';
const URL = 'https://pixabay.com/api/';

export class FetchGalleryClass {
  // Синтаксис оголошення методу класу
    constructor() {
    // Ініціалізація властивостей екземпляра
    this.propertyUserRequest = '';
    this.propertyPage = 1;
    }
    
    //метод екземпляру 
    fetchGalleryImgs = async () => {
    const response = await axios.get(URL, {
        params: {
            key: KEY_API,
            q: this.propertyUserRequest,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: this.propertyPage,
            per_page: '40'
        }
    });
    return response.data;
};

}



// const fetchGalleryImgs = async (userRequest, page) => {
// // console.log(userRequest);
//     const response = await axios.get(URL, {
//         params: {
//             key: KEY_API,
//             q: userRequest,
//             image_type: 'photo',
//             orientation: 'horizontal',
//             safesearch: true,
//             page: page,
//             per_page: '40'
//         }
//     });
//     return response.data;
// };

