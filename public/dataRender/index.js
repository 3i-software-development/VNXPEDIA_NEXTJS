import { iconInfos, avatars } from '@/public/images';
import { banners } from '@/public/images';

const infoHomeFake = [
    {
        icon: iconInfos.icon1,
        title: `excellent <br/>services`,
        content:
            `We know Flipper lives in a world full of wonder flying there-under under the sea. Come and play. Everything's A-OK.`,
    },
    {
        icon: iconInfos.icon4,
        title: 'local experts',
        content:
            `Friendly neighbors there that's where we meet. Can you tell me how to get how to get to Sesame Street.`,
    },
    {
        icon: iconInfos.icon7,
        title: 'local price',
        content:
            `Give us any chance well take it. Give us any rule we'll break it. We're gonna make our dreams come true.`,
    },
    {
        icon: iconInfos.icon3,
        title: 'authentic <br/>& tailor-made tours',
        content:
            `There's nothing can hold me when I hold you. Feels so right it 
            cant be wrong. Rockin'`,
    },
];

const categoryFillerAddress = {
    title: 'Destination',
    elements: [
        {
            name: 'Ha noi',
            amount: '24',
        },
        {
            name: 'Ha long',
            amount: '122',
        },
        {
            name: 'Da nang',
            amount: '09',
        },
        {
            name: 'Ninh Binh',
            amount: '12',
        },
        {
            name: 'Hue',
            amount: '98',
        },
        {
            name: 'Ho Chi Minh City',
            amount: '34',
        },
        {
            name: 'Sapa',
            amount: '23',
        },
        {
            name: 'Vung Tau',
            amount: '43',
        },
        {
            name: 'Phan Thiet',
            amount: '12',
        },
        {
            name: 'Nha Trang',
            amount: '11',
        },
        {
            name: 'Mai Chau',
            amount: '08',
        },
    ],
};

const tourTagsFilter = {
    title: 'tags',
    elements: ['Daily Tour', 'Halong', 'Vietnam', 'Mai chau', 'Da Nang', 'Phan Thiet', 'BestSeller', 'Top Selling'],
};

const priceFilter = {
    title: 'Price',
    elements: ['0 - 600', '601 - 900', '901 - 1500', '> 1500 '],
    value: [[0, 600], [601, 900], [901, 1500], [1501, 15000]]
};

const seasonFillter = {
    title: 'Season',
    elements: ['Newyear', 'Summer', 'holiday', 'Winter']
}

const groupSizeFillter = {
    title: 'Group Size',
    elements: ['solo', 'couple', 'family', 'company']
}

const recentPostFake = {
    title: 'recent post',
    elements: [
        {
            image: banners.banner4,
            titlePost: 'The Unique Charm in Phong Nha The Unique Charm in Phong Nha',
            time: 'Post on Set 27'
        },
        {
            image: banners.banner4,
            titlePost: 'The Unique Charm in Phong Nha',
            time: 'Post on Set 27'
        },
        {
            image: banners.banner4,
            titlePost: 'The Unique Charm in Phong Nha',
            time: 'Post on Set 27'
        }
    ]
}

export { categoryFillerAddress, tourTagsFilter, infoHomeFake, recentPostFake, seasonFillter, groupSizeFillter, priceFilter };
