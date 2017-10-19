import axios from 'axios';

export class CarService {
    
    getCarsSmall() {
        return axios.get('resources/data/cars-small.json')
                .then(res => res.data.data);
    }
}