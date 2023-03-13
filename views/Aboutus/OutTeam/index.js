import classNames from "classnames/bind";
import styles from './outTeam.module.scss';
import avt from '@/public/avt2.jpg';
import avt1 from '@/public/avt3.jpg';
import avt2 from '@/public/avt4.jpg';
import avt3 from '@/public/avt5.jpg';
import avt4 from '@/public/avt6.jpg';
import avt5 from '@/public/avt7.jpg';
import { Title, Section } from "@/components";
import { avatars } from "@/public/images";
import Item from "./Item";
const cx = classNames.bind(styles)

const ListTeam = [
    {
        Name: 'Tony Nguyen (Mr.)',
        Avatar: avt,
        Position: 'Founder',
        Intro: `Tony Nguyen is one of the founders of LuxuryVietravel. He is a talented entrepreneur with a passion for exploring the culture, tourist destinations, cuisine, and traditions of his homeland. With over 25 years of experience in the tourism industry, Tony Nguyen has built a travel company with unique and quality tour programs that have attracted the attention of many tourists both locally and internationally.

        In addition to business, Tony Nguyen is also a positive contributor to the tourism community by organizing social activities and protecting the environment. With a sense of responsibility and professionalism in his work, Mr. Tuan has become one of the important and admired figures in the tourism industry in Vietnam.'`
    },
    {
        Name: 'Michael Phu (Mr.)',
        Avatar: avt1,
        Position: 'CO-Founder & Director',
        Intro: `Meet Michael Phu, the co-founder and director of a leading travel company in Vietnam. With over 20 years of experience in the industry, Michael has a wealth of knowledge in managing and operating successful travel businesses.

        Throughout his career, Michael has been dedicated to providing exceptional travel experiences for his clients. His passion for travel and his deep understanding of the local market have been instrumental in growing the company's reputation as one of the most trusted and reliable travel providers in Vietnam.
        
        Michael's leadership and strategic vision have also played a key role in the company's success. He is known for his ability to identify new opportunities and to develop innovative solutions that meet the evolving needs of the travel industry.
        
        Under Michael's guidance, the company has continued to expand its services and offerings, while maintaining its commitment to quality and customer satisfaction. With his extensive experience and expertise, Michael is a driving force behind the company's continued growth and success.`
    },
    {
        Name: 'Hanna Nguyen (Ms.)',
        Avatar: avt5,
        Position: 'Marketing Manager',
        Intro: `Hana Nguyen is the Marketing Manager of LuxuryVietravel, a leading travel company in Southeast Asia. With years of experience in the industry, she has established herself as an expert in Vietnam tourism and is responsible for developing and executing innovative marketing strategies. Her dedication to excellence has helped to establish the company as a leading provider of luxury travel in the region.`
    },
    {
        Name: 'Catherine Malandrino (Ms.)',
        Avatar: avt4,
        Position: 'Operation Manager',
        Intro: `Catherine Malandrino is a truly remarkable member of the LuxuryVietravel team. Her keen attention to detail and methodical approach to work have enabled her to consistently deliver products and services of exceptional quality. Catherine's commitment to excellence has been instrumental in ensuring that LuxuryVietravel's offerings are always perfect and tailored to meet the needs of their customers. Her contributions to the company have been invaluable, and she is highly regarded by both colleagues and customers alike. With Catherine's involvement, LuxuryVietravel is well-positioned to continue to thrive in the competitive travel industry.`
    },
    {
        Name: 'David Gibertor (Mr.)',
        Avatar: avt3,
        Position: 'Mice director',
        Intro: `With his extensive experience in the Meetings, Incentives, Conferences, and Events (MICE) industry at various professional travel companies abroad, David Gibertor has successfully applied his expertise to the product offerings of LuxuryVietravel. He has played a pivotal role in creating and managing events that have been widely acclaimed and successful. David's ability to seamlessly integrate his knowledge of MICE with LuxuryVietravel's product offerings has resulted in unique, innovative and memorable events that have set the company apart from competitors. His achievements have contributed significantly to the company's success in the MICE market.`
    },
    {
        Name: 'Antonio Robert (Mr.)',
        Avatar: avt2,
        Position: 'Product Manager',
        Intro: `Antonio Robert has a deep love for Vietnam and has devoted a significant amount of time to researching and developing unique and captivating travel products for LuxuryVietravel. As a result of his efforts, these products have received high praise from customers over the past few years. His attention to detail and expertise have been invaluable in creating exceptional travel experiences that showcase the beauty and culture of Vietnam.`
    }
]

function OutTeam() {
    return (<div className={cx('wrapper')}>
        <Title text={"Out Team"} align={'center'} />
        <p className={cx('title')}>United by love & help to build great brands</p>
        <Section isWrap gapBox={7} maxWidth={970} className={cx('bodyItem')}>
            {ListTeam.map((d, i) =>
                <Item avatar={d.Avatar} name={d.Name} position={d.Position} intro={d.Intro} />
            )}
            {/* <Item avatar={avatars.avatar1} name='mr. tuan' position='founder' />
            <Item avatar={avatars.avatar2} name='jennifer rod' position={'co-founder'} />
            <Item avatar={avatars.avatar2} name='natasha singh' position='marketing head' />
            <Item name='robert long' position='sale manager' />
            <Item name='aaron smith' position='digital manager' />
            <Item name='cyril roy' position='operator' /> */}
        </Section>
    </div>);
}

export default OutTeam;