import http from 'k6/http';
import {sleep} from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export let options = {

    stages: [  
        {duration: '30s', target: 20},  // en los primeros 30 segundos habran 10usuarios 
        {duration: '1m', target: 250},  // en los primeros 30 segundos habran 10usuarios 
        {duration: '1m', target: 500},  // en los primeros 30 segundos habran 10usuarios 
        {duration: '2m', target: 0},  // en los primeros 30 segundos habran 10usuarios 
    ]
};

export default function (){
    http.get('${BASE_URL}/feedback');
    sleep(1);
}

// k6 run loadtest.js
