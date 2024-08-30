import React, { useEffect, useState } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { baseUrl } from '../../CONSTANTS.js';
import './style.css'; // Make sure to import your CSS file
import { FaPlay } from "react-icons/fa";
import Player from "../../components/Player/Player.js";
import { HashLoader, ScaleLoader } from "react-spinners";
import AppNavBar from "../../components/NavBar/App-NavBar.js";

const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [newsLoading, setNewsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [playerTitle, setPlayerTitle] = useState('');
    const [playerFolder, setPlayerFolder] = useState('');
    const [parts, setParts] = useState(0);
    const [currentPart, setCurrentPart] = useState(1);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState(null); // State to manage overlay visibility
    const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null); // State to manage which card is playing

    const fetchMainPageData = async () => {
        try {
            console.log('Fetching main page data!');
            const response = await fetch(`${baseUrl}/api/scrapeMainPage`);
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    const fetchNews = async (url) => {
        try {
            console.log('Fetching News');
            const response = await fetch(`${baseUrl}/api/get-one-news?url=${url}`);
            const result = await response.json();
            console.log('result: ', result);
            return result;
        } catch (error) {
            console.error('Error fetching news:', error);
            return null;
        }
    }

    const playNews = async (url, index) => {
        console.log(url);
        setNewsLoading(true);
        setCurrentPlayingIndex(index); // Set the current playing index
        const news = await fetchNews(url);
        if (news && news.success) {
            setPlayerTitle(news.response.title);
            setPlayerFolder(news.response.title);
            setParts(news.response.parts);
            setCurrentPart(1); // Reset to the first part when playing new news
            setOverlayVisible(index); // Show overlay for the clicked card
        }
        setNewsLoading(false);
        // setCurrentPlayingIndex(null); // Reset the current playing index after fetching news
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await fetchMainPageData();
            if (result && result.success) {
                setData(result.response.data);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    }

    return (
        <div className={isDarkMode ? 'dark-mode' : ''} style={{ height: '100vh' }}>
            <div>
                <AppNavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                <Container className="mt-5">
                    <div className="news">
                        {loading ? (
                            <>
                                <HashLoader style={{ marginTop: '50px' }} cssOverride={{fontSize:'10px'}} speedMultiplier={2} />
                                <h5>Fetching Data</h5>
                            </>
                        ) : (
                            <Row>
                                {data && data.map((item, index) => (
                                    <Col sm={3} xs={12} key={index}>
                                        <Card className="mb-3 shadow-sm border rounded-5 data-card custom-card">
                                            <div className="card-header">
                                                <div className="author-info">
                                                    <img src={item.img} alt="Author" className="author-img" />
                                                    <div className="author-text">
                                                        <span className="author-label">By</span>
                                                        <span className="author-name">{item.platform}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Card.Body>
                                                <Card.Title className={isDarkMode ? 'ssd' : ''}>
                                                    {item.title}
                                                </Card.Title>
                                            </Card.Body>
                                            <div
                                                className={`overlay ${overlayVisible === index ? 'show' : ''}`}
                                                onMouseEnter={() => setOverlayVisible(index)}
                                                onClick={() => playNews(item.url, index)}
                                            >
                                                {currentPlayingIndex === index ? (
                                                    <ScaleLoader color="white" />
                                                ) : (
                                                    <FaPlay color="white" style={{ zIndex: 2, fontSize: "30px" }} />
                                                )}
                                            </div>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                        <div style={{ width:'100px', height:'100px'}}>

                        <Player
                            darkMode={isDarkMode}
                            title={playerTitle}
                            folder={playerFolder}
                            parts={parts}
                            currentPart={currentPart}
                            onCurrentPartChange={setCurrentPart}
                            />
                            </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default HomePage;