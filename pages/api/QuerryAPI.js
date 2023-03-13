import { toastError, toastSuccess } from '@/components/Toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import qs from 'qs';


//super filter
export const Superfilter = (Country, Destination, Tourtype, Fromcost, Endcost, Tagtour, Season, Group) => {
    return useQuery(
        ['searchTour', Country, Destination, Tourtype, Fromcost, Endcost, Tagtour, Season, Group],
        async () => {
            const response = await axios.post('https://vnxpedia.3i.com.vn/TravelAPI/SearchTourAdvance', qs.stringify({
                country: (Country ? Country.split('dest')[0] : ''),
                destination: (Destination ? Destination : ''),
                tourtype: (Tourtype ? Tourtype : ''),
                TagTour1: (Season ? Season : ''),
                TagTour2: (Group ? Group : ''),
                fromcost: (Fromcost ? Fromcost : 0),
                endcost: (Endcost ? Endcost : 15000),
                TagTour: (Tagtour ? Tagtour : ''),
            }), {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
            });

            return response.data.Object.filter(d => d.TourType != 'TYPE_MICE').filter(d => d.TourType != 'TYPE_GOLF');
        }
    );
};

//Lấy 1 blog
export const Getblog = (id) => {
    return useQuery(['getblog', id], async () => {
        const response = await axios.post(`https://vnxpedia.3i.com.vn/TravelAPI/ListPostWithId?Id=${id}`);
        return response.data;
    });
};

//lấy tất cả tour
export const Alltour = () => {
    return useQuery(['getblog'], async () => {
        const response = await axios.post(`https://vnxpedia.3i.com.vn/TravelAPI/AllTourTable`);
        return response.data;
    });
};

//lấy 1 tour
export const Gettour = (tourcode) => {
    return useQuery(['gettour', tourcode], async () => {
        const response = await axios.post(`https://vnxpedia.3i.com.vn/TravelAPI/TourTable?tourcode=${tourcode}`);
        return response.data.Object[0];
    });
};

//Tourhot
export const GetTourhot = () => {
    return useQuery(['tourhot'], async () => {
        const response = await axios.post(`https://vnxpedia.3i.com.vn/TravelAPI/Hottour`);
        return response.data;
    });
};

//tourtype
export const Tourtype = (tourtype) => {
    return useQuery(['tourtype', tourtype], async () => {
        const response = await axios.post(`https://vnxpedia.3i.com.vn/TravelAPI/TourTable?tourtype=${tourtype}`);
        return response.data;
    });
};

//list country
export const GetAllCountry = () => {
    return useQuery(['allcountry'], async () => {
        const response = await axios.post(`https://vnxpedia.3i.com.vn/TravelAPI/GetAllCountry?language=en_US`);
        return response.data;
    });
};

//list blog
export const GetAllblog = (tag, keyword, page) => {
    return useQuery(['bloglist', tag, keyword, page], async () => {
        const response = await axios.post(`https://vnxpedia.3i.com.vn/TravelAPI/ListPost?hastag=${tag}&searchkey=${keyword}&CurrentPage=${page}`);
        return response.data;
    });
};

//Lấy 1 bài content
export const GetSocial = (id, tag) => {
    return useQuery(['getsocial', id, tag], async () => {
        const response = await axios.post(`https://vnxpedia.3i.com.vn/TravelAPI/ListPostSocial?id=${id}&tag=${tag.replace('TYPE_', '').toLowerCase()}`);
        return response.data;
    });
};

//Lấy tour theo location
export const GetTourLocation = (location) => {
    return useQuery(['gettourlocation', location], async () => {
        const response = await axios.post(`https://vnxpedia.3i.com.vn/TravelAPI/AllTourDestination?destination=${location}`);
        return response.data;
    });
};

//thêm comment
export const InsertComment = (id, reply, username, comment) => {


    return useQuery(['insertcomment', id, reply, username, comment], async () => {
        const response = await axios.post(`https://vnxpedia.3i.com.vn/TravelAPI/InsertCommentOnPost?PostId=${id}&ParentId=${reply}&UserName=${username}&Comment=${comment}`);
        return response.data;
    },
        {
            enabled: false,
        }
    );


};

//lấy blog hot
export const Getbloghot = () => {
    return useQuery(['bloghot'], async () => {
        const response = await axios.post(`https://vnxpedia.3i.com.vn/TravelAPI/ListPostPriority?hastag=Blog`);
        return response.data;
    });
};

//search tour keyword
export const Searchtour = (key) => {
    return useQuery(['searchtour', key], async () => {
        const response = await axios.post(`https://vnxpedia.3i.com.vn/TravelAPI/SearchTour?TourKey=${key}`);
        return response.data.Object;
    },
        { enabled: false }
    );
};

//search blog keyword
export const Searchblog = (key) => {
    return useQuery(['searchblog', key], async () => {
        const response = await axios.post(`https://vnxpedia.3i.com.vn/TravelAPI/SearchListPost?searchkey=${key}`);
        return response.data.Object;
    },
        { enabled: false }
    );
};

//đăng kí nhận email 
export const Subcrise = (email) => {
    return useQuery(['subcrisemail', email], async () => {
        const response = await axios.post(`http://vnxpedia.3i.com.vn/TravelAPI/InsertSubcrible?Email=${email}`);
        return response.data;
    });
};

//lấy list hotel
export const ListHotel = (tag) => {
    return useQuery(['listhotel', tag], async () => {
        const response = await axios.post(`https://vnxpedia.3i.com.vn/TravelAPI/LuxuryHotel?tag=${tag}`);
        return response.data;
    });
};

//lấy list transfer
export const ListTransfer = (type, value) => {

    return useQuery(['listtransfer', type, value], async () => {
        const response = await axios.post(`https://vnxpedia.3i.com.vn/TravelAPI/LuxuryTransfer?type=${type}`);

        return response.data;
    });
};

//Lấy 1 hotel/transfer
export const GetLuxservice = (id) => {
    return useQuery(['gethotel/transfer', id], async () => {
        const response = await axios.post(`https://vnxpedia.3i.com.vn/TravelAPI/PostLuxury?Id=${id}`);
        return response.data;
    });
};

//Lấy list des
export const GetAllDes = () => {
    return useQuery(['getalldes'], async () => {
        const response = await axios.post(`https://vnxpedia.3i.com.vn/TravelAPI/GetAllDestination`);
        return response.data;
    });
};

//list comment
export const GetComment = (id, load) => {
    return useQuery(['listcomment', id, load], async () => {
        const response = await axios.post(`https://vnxpedia.3i.com.vn/TravelAPI/ListComment?postid=${id}`);
        return response.data;
    });
};

//Login
export const Login = (username, password) => {
    return useQuery(['login', username, password], async () => {
        const response = await axios.post(`https://vnxpedia.3i.com.vn/TravelAPI/LoginXpedia`,
            qs.stringify({
                UserName: username,
                Password: password,
            })
        );
        return response.data.Object;
    },
        { enabled: false })
}

//list booking
export const Getbookinglist = (user, load) => {
    return useQuery(['listbook', user, load], async () => {
        const response = await axios.post(`https://vnxpedia.3i.com.vn/TravelAPI/BookingTable?Username=${user}`);
        return response.data.Object;
    });
};

//edit user infor

export const EditUserInfor = (Newinfor) => {
    return useQuery(['edituserinfor'],
        async () => {
            const response = await axios.post(`https://vnxpedia.3i.com.vn/TravelAPI/UpdateInfo`, qs.stringify
                (Newinfor),
            );
            if (response.data.Error === true) {
                toastError('Error!');
            } else {
                toastSuccess('Successfully changed information.');
                localStorage.setItem('VNXUser', JSON.stringify({ ...data, FullName: Newinfor.GivenName, Gender: Newinfor.Gender, BirthDay: Newinfor.Reason, About: Newinfor.Description, Address: Newinfor.Note, PhoneNumber: Newinfor.PhoneNumber, Email: Newinfor.Email }));
                setuser({ ...data, FullName: Newinfor.GivenName, Gender: Newinfor.Gender, BirthDay: Newinfor.Reason, About: Newinfor.Description, Address: Newinfor.Note, PhoneNumber: Newinfor.PhoneNumber, Email: Newinfor.Email });
            }
            return response.data;
        },
        {
            enabled: false,
        }
    );
};
