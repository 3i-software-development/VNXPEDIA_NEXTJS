import axios from 'axios';

export const callApi = () => {
    const response = axios({
        method: 'post',
        url: `https://vnxpedia.3i.com.vn/TravelAPI/TourTable?tourcode=${param.id}`,
        type: 'json',
    });

    if (response.status === 200) {
        return response.data.Object[0]
    }
}

