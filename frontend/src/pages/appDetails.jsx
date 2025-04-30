import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../style/ItemDetails.css";
import SimilarAppsSection from '../components/Similar apps Section';
import { ScreenShotsSection } from '../components/ScreenShotsSection';
import { DescriptionSection } from '../components/DescriptionSection';
import { RatingSection } from '../components/RatingSection';
import { Feature } from '../components/Feature';
import { Container } from 'react-bootstrap';
import "../style/HeroGameDetails.css";
import { useStore } from '@tanstack/react-store';
import { programStore } from '../store';
import { fetchProgramDetails } from '../store/programStore';


const dummyData = {
  apps: [
    {
      id: 1,
      title: 'Learn Languages',
      description: 'Improve your language skills with fun interactive lessons.',
      image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      rating: 4.5,
      downloads: '1M+',
      isOwned: true
    },
    {
      id: 2,
      title: 'Math Master',
      description: 'Challenge yourself with math quizzes and games.',
      image: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      rating: 4.7,
      downloads: '500K+',
      isOwned: false
    },
    {
      id: 3,
      title: 'Science Explorer',
      description: 'Discover the world of science through experiments and videos.',
      image: 'https://images.pexels.com/photos/256302/pexels-photo-256302.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      rating: 4.6,
      downloads: '750K+',
      isOwned: true
    },
    {
      id: 4,
      title: 'History Adventures',
      description: 'Travel through time and learn about historical events.',
      image: 'https://images.pexels.com/photos/3889860/pexels-photo-3889860.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      rating: 4.4,
      downloads: '300K+',
      isOwned: false
    },
    {
      id: 5,
      title: 'Yoga for Beginners',
      description: 'Start your fitness journey with basic yoga practices.',
      image: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg',
      rating: 4.8,
      downloads: '2M+',
      isOwned: true
    },
    {
      id: 6,
      title: 'Healthy Eating Plan',
      description: 'Discover healthy meals and diet tips to stay fit.',
      image: 'https://www.morelandobgyn.com/hs-fs/hubfs/Imported_Blog_Media/GettyImages-854725402-1.jpg?width=600&name=GettyImages-854725402-1.jpg',
      rating: 4.3,
      downloads: '1M+',
      isOwned: false
    },
    {
      id: 7,
      title: 'Home Workout Routines',
      description: 'Simple and effective exercises you can do at home.',
      image: 'https://oldschooltrainer.com/media/posts/40/responsive/micro-workout-home-2xl.webp',
      rating: 4.7,
      downloads: '500K+',
      isOwned: true
    },
    {
      id: 8,
      image: "https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg",
      name: "Instagram",
      description: "Share photos and videos, and connect with people.",
      rating: 4.5,
      downloads: "500M+"
    },
    {
      id: 9,
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
      name: "WhatsApp",
      description: "Stay connected with friends and family via messages and calls.",
      rating: 4.7,
      downloads: "2B+"
    },
    {
      id: 10,
      image: "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png",
      name: "YouTube",
      description: "Watch and share videos, subscribe to your favorite channels.",
      rating: 4.8,
      downloads: "10B+"
    },
    {
      id: 11,
      image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
      name: "Facebook",
      description: "Connect with friends, family, and communities on Facebook.",
      rating: 4.3,
      downloads: "5B+"
    },
    {
      id: 12,
      title: "WhatsApp Messenger",
      description: "Simple. Secure. Reliable messaging.",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
      rating: 4.5,
      downloads: "5B+",
      isOwned: true
    },
    {
      id: 13,
      title: "Instagram",
      description: "Capture and share the world's moments.",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
      rating: 4.4,
      downloads: "5B+",
      isOwned: true
    },
    {
      id: 14,
      title: "Spotify",
      description: "Listen to music and podcasts for free.",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
      rating: 4.6,
      downloads: "1B+",
      isOwned: false
    },
    {
      id: 15,
      title: "TikTok",
      description: "Short videos for you.",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/TikTok_logo.svg",
      rating: 4.3,
      downloads: "1B+",
      isOwned: false
    },
    {
      id: 16,
      title: "Google Maps",
      description: "Navigate your world faster and easier.",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Google_Maps_icon.svg",
      rating: 4.7,
      downloads: "10B+",
      isOwned: true
    },
    {
      id: 17,
      title: "Zoom",
      description: "Video communications made easy.",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg",
      rating: 4.2,
      downloads: "500M+",
      isOwned: false
    },
    {
      id: 18,
      title: "Snapchat",
      description: "Share the moment!",
      image: "https://upload.wikimedia.org/wikipedia/en/a/ad/Snapchat_logo.svg",
      rating: 4.2,
      downloads: "1B+",
      isOwned: true
    },
    {
      id: 19,
      title: "Microsoft Teams",
      description: "Work together with your team from anywhere.",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      rating: 4.1,
      downloads: "100M+",
      isOwned: true
    },
    {
      id: 20,
      title: "Facebook",
      description: "Connect with friends and the world around you.",
      image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
      rating: 4.2,
      downloads: "5B+",
      isOwned: true
    },
    {
      id: 21,
      title: "Netflix",
      description: "Watch TV shows and movies anytime, anywhere.",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
      rating: 4.5,
      downloads: "1B+",
      isOwned: true
    }
  ],
  games: [
    {
      id: 1,
      title: "Super Mario Odyssey",
      description: "Explore massive 3D kingdoms with Mario in an epic adventure!",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1677740/header.jpg",
      rating: 4.9,
      downloads: "10M+",
      isOwned: true
    },
    {
      id: 2,
      title: "Need for Speed Heat",
      description: "Race by day, risk it all by night in the ultimate street racer fantasy.",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1222680/header.jpg",
      rating: 4.7,
      downloads: "5M+",
      isOwned: true
    },
    {
      id: 3,
      title: "Fortnite",
      description: "Jump into Battle Royale and be the last one standing!",
      image: "https://cdn2.unrealengine.com/fortnite-battle-royale-chapter-4-og-key-art-1920x1080-321f4f741cda.jpg",
      rating: 4.6,
      downloads: "50M+",
      isOwned: false
    },
    {
      id: 4,
      title: "Minecraft",
      description: "Create anything you can imagine in an endless world of blocks.",
      image: "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png",
      rating: 4.8,
      downloads: "200M+",
      isOwned: true
    },
    {
      id: 5,
      title: "Call of Duty: Warzone",
      description: "Fight to survive in a massive battle royale experience.",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/header.jpg",
      rating: 4.7,
      downloads: "100M+",
      isOwned: true
    },
    {
      id: 6,
      title: "Among Us",
      description: "Find the impostor... or be the impostor!",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg",
      rating: 4.3,
      downloads: "100M+",
      isOwned: true
    },
    {
      id: 7,
      title: "Genshin Impact",
      description: "Explore a vast open world full of magic and adventure.",
      image: "https://cdn2.unrealengine.com/genshin-impact-keyart-1920x1080-1920x1080-073dd6037e3a.jpg",
      rating: 4.7,
      downloads: "50M+",
      isOwned: false
    },
    {
      id: 8,
      title: "Subway Surfers",
      description: "Dash as fast as you can and dodge the oncoming trains!",
      image: "https://upload.wikimedia.org/wikipedia/en/2/2e/Subway_Surfers_app_logo.png",
      rating: 4.5,
      downloads: "2B+",
      isOwned: true
    },
    {
      id: 9,
      title: "Valorant",
      description: "Tactical shooter game full of intense team-based action.",
      image: "https://cdn1.dotesports.com/wp-content/uploads/2020/06/18104742/VALORANT.jpg",
      rating: 4.6,
      downloads: "10M+",
      isOwned: false
    },
    {
      id: 10,
      title: "FIFA 23",
      description: "Experience the thrill of world-class football with FIFA 23.",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/header.jpg",
      rating: 4.2,
      downloads: "20M+",
      isOwned: true
    }


  ],
};

const ItemDetails = () => {
  const { type, slug } = useParams();
  const appDetails = useStore(programStore, (state) => state.currentProgram)
  useEffect(() => {
    fetchProgramDetails(slug)
  }, [type, slug]);

  if (!appDetails || appDetails.slug != slug) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className='bg-light'>
      <div className="imgContainer">
        <img
          className="d-block w-100"
          src={appDetails?.media.find((media) => media.media_type === 'screenshot')?.file}
          alt={appDetails.title}
          style={{ height: '600px', objectFit: 'cover' }}
        />
        <div className="overlay"></div>
      </div>
      <div className='hero-text'>
        <div className=' d-flex  align-items-center'>
          <img src={appDetails?.icon} alt="imgLogo" className='rounded' width={'100px'} />
          <h2 className='hero-caption mx-3'>{appDetails.title}</h2>
        </div>
        <p className='mt-5'>{appDetails.description}</p>
        <div className='d-flex  align-items-center mt-4 text-info'>
          <p className='me-4'>{appDetails.rating}  <i className="fa-solid fa-star "></i> </p>
          <p>280 ratings</p>
          <p className='ms-4'>100M+ <i className="fa-solid fa-download"></i></p>
        </div>
        <button className='hero-btn btn btn-info w-50 mt-4'>Download Now</button>
        <p className='mt-3 '>Offers in-app purchases</p>
      </div>


      <Container className="mt-5 mb-5">
        <div className="row">
          <div className="col-lg-8 ">
            < ScreenShotsSection media={appDetails.media}/>
            <DescriptionSection description={appDetails.description} />
            <RatingSection programId={appDetails.id} />
            <Feature />
          </div>
          <div className="col-lg-4">
            <div className="bg-white rounded-4 border shadow-sm p-4 mt-5">
              <h3>you might also like : </h3>
              <hr />
              <SimilarAppsSection />
            </div>
          </div>
        </div>
      </Container>
    </div>
      );
};

      export default ItemDetails;
