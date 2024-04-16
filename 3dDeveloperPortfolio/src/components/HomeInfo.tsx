import React from 'react';
import { Link } from 'react-router-dom';
import { arrow } from '../assets/icons';

interface InfoBoxProps {
    text: string,
    link: string,
    btnText: string
}

const InfoBox: React.FC<InfoBoxProps> = (props) => (
    <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>{props.text}</p>
        <Link to={props.link} className='neo-brutalism-white neo-btn'>
            {props.btnText}
            <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
    </div>
)

interface renderContent {
    [key: number]: JSX.Element;
}

const renderContent: renderContent = {
    1: (
        <h1 className='sm:text-xl sm:leading-snug text-center
         neo-brutalism-blue py-4 px-8 text-white mx-5'>
            Hi, I am<span className='font-semibold'>Adrian</span> 👋
        <br />
        A Software Engineer from Croatia
        </h1>
    ), 
    2: (
        <InfoBox 
            text='Worked with many companies and 
            picked up many skills along the way'
            link = "/About"
            btnText="Learn More"
        />
    ),
    3: (
        <InfoBox 
        text='Led multiple projects to success over the years. 
        Curious about the impact?'
        link = "/projects"
        btnText="Visit my portfolio"
        />
    ),
    4: (
        <InfoBox 
        text="Need a project done or looking for a dev? I'm just a few keystrokes away"
        link = "/contact"
        btnText="Let's talk"
        />
    )
}


interface HomeInfoProps {
  currentStage: number;
}

const HomeInfo: React.FC<HomeInfoProps> = ({ currentStage }) => {
  return ( <div>{renderContent[currentStage] || null}</div> )
};

export default HomeInfo;