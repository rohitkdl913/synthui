import React from 'react';
import logo from '../../../assets/logo/logo.png'
import HeroSection, { HeroSectionProps } from '../components/hero_section';
import HowItWorks, { FeatureSectionProps } from '../components/feature_section';
import AboutSection, { AboutSectionProps } from '../components/about_section';
import CtaSection, { CtaSectionProps } from '../components/cta_section';
import EditorPreview from '../components/editor_preview';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

const Home: React.FC = () => {
    const navData = {
        navItems: [
            { name: 'Home', href: '#home' },
            { name: 'About', href: '#about' },
            { name: 'How It Works', href: '#how-it-works' },
            { name: 'Features', href: '#features' }
        ],
    };

    const heroData: HeroSectionProps = {
        title: 'Generate Nepali Subtitles',
        subtitle: 'For Any Video',
        description: 'Upload your videos and automatically generate accurate Nepali subtitles using our AI-powered platform. Edit and export SRT files with our intuitive subtitle editor.',
        buttonText: 'Get Started',
        onButtonClick: () => console.log('Button clicked'),
        heroImage: '/src/assets/images/hero-video.png',
    };

    const aboutData: AboutSectionProps = {
        title: 'About This Project',
        description: [
            "This Nepali Subtitle Generator is a student project designed to make video content more accessible to Nepali speakers by automating the subtitle generation process.",
            "The project uses advanced speech recognition technology to transcribe audio from videos and automatically generate time-synced Nepali subtitles. Our goal is to create a tool that helps content creators, educators, and filmmakers make their work accessible to Nepali-speaking audiences."
        ],
        technologies: [
            {
                name: "OpenAI Whisper Model",
                description: "We use OpenAI's Whisper model, a state-of-the-art automatic speech recognition system that's been trained on a diverse range of audio. Its multilingual capabilities allow us to accurately transcribe and translate speech to Nepali text.",
            },
            {
                name: "FastAPI Backend",
                description: "Our backend is built with FastAPI, a modern, high-performance web framework for building APIs with Python. It provides the speed and efficiency needed for processing video files and generating subtitles quickly.",
            },
            {
                name: "React & TypeScript Frontend",
                description: "The user interface is developed with React and TypeScript, providing a responsive and type-safe experience for users to upload videos, edit subtitles, and export SRT files.",
            }
        ],
        image: '/src/assets/images/architecture-diagram.png',
    };

    const howItWorksData: FeatureSectionProps = {
        title: 'How It Works',
        description: 'Generate Nepali subtitles in 3 simple steps',
        image: '/src/assets/images/process.png',
        features: [
            {
                number: '1',
                title: 'Upload Your Video',
                description: 'Upload any video file to our platform. We support most popular formats including MP4, AVI, MOV, and more.',
            },
            {
                number: '2',
                title: 'AI Generates Subtitles',
                description: 'Our Whisper-powered AI system processes your video, transcribes the audio, and automatically generates accurate Nepali subtitles with proper timing.',
            },
            {
                number: '3',
                title: 'Edit & Export',
                description: 'Use our intuitive editor to make any necessary adjustments to the subtitles, then export as an SRT file for your project.',
            },
        ],
    };

    const editorPreviewData = {
        title: 'Powerful Subtitle Editor',
        description: 'Our easy-to-use editor lets you fine-tune your Nepali subtitles with precise timing controls and text editing capabilities.',
        image: '/src/assets/images/editor-preview.png',
    };

    const ctaData: CtaSectionProps = {
        title: 'Start generating Nepali subtitles for your project today',
        buttonPrimaryText: 'Create Free Account',
        image: '/src/assets/images/cta-image.png',
    };

    const footerData = {
        logo: logo,
        description: 'A student project aimed at making video content more accessible through automatic Nepali subtitle generation powered by OpenAI Whisper and FastAPI.',
        githubLink: 'https://github.com/yourusername/nepali-subtitle-generator',
    };

    return (
        <div className="min-h-screen bg-white">
            <Navigation {...navData} />
            <HeroSection {...heroData} />
            <AboutSection {...aboutData} />
            <HowItWorks {...howItWorksData} />
            <EditorPreview {...editorPreviewData} />
            <CtaSection {...ctaData} />
            <Footer {...footerData} />
        </div>
    );
};

export default Home;
