import React from 'react';
import { Link } from 'react-router-dom';

const InstragramProducts = () => {
    const imageSources = [
        "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/393383902_825487712638422_7780263971774170408_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=nrDHLTGnLgIAX-RBNt5&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=AEQ6tj4EAAAA&oh=00_AfCh1C7-2oP1Iy7m9GmRgM1mSRddPSgB1euBRFQJhX2Sdg&oe=653A08AF",
        "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/393383902_825487712638422_7780263971774170408_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=nrDHLTGnLgIAX-RBNt5&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=AEQ6tj4EAAAA&oh=00_AfCh1C7-2oP1Iy7m9GmRgM1mSRddPSgB1euBRFQJhX2Sdg&oe=653A08AF",
        "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/393383902_825487712638422_7780263971774170408_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=nrDHLTGnLgIAX-RBNt5&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=AEQ6tj4EAAAA&oh=00_AfCh1C7-2oP1Iy7m9GmRgM1mSRddPSgB1euBRFQJhX2Sdg&oe=653A08AF",
        "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/393383902_825487712638422_7780263971774170408_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=nrDHLTGnLgIAX-RBNt5&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=AEQ6tj4EAAAA&oh=00_AfCh1C7-2oP1Iy7m9GmRgM1mSRddPSgB1euBRFQJhX2Sdg&oe=653A08AF",
        "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/376918959_316908160826223_781903059014463895_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=5ANFMIRfXUAAX8nUqe9&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=AEQ6tj4EAAAA&oh=00_AfCSSvgi-qtFQoL_maKlC7MB_KIwCPuSeYSCepAPDapBAw&oe=653A9DBA",
        "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/386778021_980907259842579_5089679745731306505_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=0dmDxnOYYNUAX8bvC-r&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=AEQ6tj4EAAAA&oh=00_AfAYR036A8mLJzqxMi-42o8AnbfWs0kWf3S8TmBbTBtC4w&oe=653BBE3D",
        "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/385883494_2466250326867266_6074523277419442881_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=_J0MXd-Oop8AX_DfgQU&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=AEQ6tj4EAAAA&oh=00_AfB5qy_uLjdXmkCsuR-hAS7AvI-v1EAsvV0zV-ZgfTyjWg&oe=653AA843",
        "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/385665515_1422784948502798_3751792916948574886_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=ejQPLzG0ohAAX8W8iGe&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=AEQ6tj4EAAAA&oh=00_AfBPsjDOSzcG3FkP7Jag-CGsL8046lEocYWGbnDv7vfDGg&oe=653AB5B6",
        "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/378989239_322261783683836_7733542594484503348_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=gmhAQyh6XrIAX-_tPSm&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=AEQ6tj4EAAAA&oh=00_AfAggZrpE1y15qUjr8vV3ZciZtm7GbNS9gt35s94jxYuvg&oe=653AB457",
        "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/377914465_318624604156691_7243982316488209323_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=n4pop1gNtfcAX9FfmyX&_nc_oc=AQnJo5O2lHQkm7up_dzLDQhP7uy0kGyGP7yhSEjZQi1eeZrotIgvpiULKbq-zaxdlZw&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=AEQ6tj4EAAAA&oh=00_AfBbNL1FUfkGw6w177_1EEziAVT6XWqcq-vZOx_YiASVfQ&oe=653A174F",
        "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/375884098_820754182886687_4404809264365961924_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=skhoU_Sv_jYAX_fDpCV&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=AEQ6tj4EAAAA&oh=00_AfB6t--SL8RUotW_Bruuq6Wm3FKdjyH2kz6yk2LYi-H8yA&oe=653B11E7",
        "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/375884098_820754182886687_4404809264365961924_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=c4dd86&_nc_ohc=skhoU_Sv_jYAX_fDpCV&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=AEQ6tj4EAAAA&oh=00_AfB6t--SL8RUotW_Bruuq6Wm3FKdjyH2kz6yk2LYi-H8yA&oe=653B11E7"
    ];

    const texts = [
        "The entire white fox series available now 😍 Shop now...",
        "The entire white fox series available now 😍 Shop now...",
        "The entire white fox series available now 😍 Shop now...",
        "The entire white fox series available now 😍 Shop now...",
        "Killa Dry Watermelon🍉 A brand new introduction...",
        "Bull Dog Canvas Original and Cold now available‼️",
        "Siberia All White series🔥 This popular series has just",
        "White Fox Peppermint 16mg 🔥 Loaded with nicotine and essential oils🥰 Shop now for £4.99 at www.thesnuslife.com ",
        "Maggie’s but in a pouch🤤 At 60mg which is better the pouch or...",
        "Killa Mini Blueberry 16🫐 Another brand new addition to...",
        "Paplo Apple 16mg🍏 is this the best killa flavour ?🔥 Shop now...",
        "Pablo Apple 16mg🍏 is this the best killa flavour ?🔥 Shop now...",
    ];

    const containerStyle = {
        position: 'relative',
        display: 'inline-block',
    };

    const overlayStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        padding: '10px',
        textAlign: 'center',
        transition: 'opacity 0.3s',
    };

    const handleMouseOver = (e, index) => {
        e.target.nextSibling.style.opacity = 1;
        e.target.nextSibling.textContent = texts[index];
    };

    const handleMouseOut = (e) => {
        e.target.nextSibling.style.opacity = 0;
        e.target.nextSibling.textContent = '';
    };

    return (
        <div className="d-flex justify-content-center mt-5 mb-4">
            <div className="container">
                <h1 className="text-center anton mb-4" style={{ fontSize: '40px' }}>
                    <strong># I N S T A G R A M</strong>
                </h1>
                <div className="d-flex align-item-center justify-content-between mt-2 flex-wrap">
                    {imageSources.map((src, index) => (
                        <div key={index} className="col-6 col-md-4 col-lg-3 mt-0" style={containerStyle}>
                            <img
                                src={src}
                                alt={`Image ${index + 1}`}
                                className="img-fluid"
                                onMouseOver={(e) => handleMouseOver(e, index)}
                                onMouseOut={handleMouseOut}
                            />
                            <div style={overlayStyle}>Text to display on hover</div>
                        </div>
                    ))}
                </div>

                {/* <div className='d-flex align-item-center justify-content-center mt-5 mb-4 gap-4'>
                    <Link to="#">
                        <img
                        src="https://static.wixstatic.com/media/8d6893330740455c96d218258a458aa4.png/v1/fill/w_59,h_59,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8d6893330740455c96d218258a458aa4.png"
                    />
                    </Link>
                    <Link to="#">
                    <img
                        src="https://static.wixstatic.com/media/e316f544f9094143b9eac01f1f19e697.png/v1/fill/w_59,h_59,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/e316f544f9094143b9eac01f1f19e697.png"
                    />
                    </Link>
                    <Link to="#">
                    <img
                        src="https://static.wixstatic.com/media/11062b_7a80704b0d4547c4a6a39347d587411d~mv2.png/v1/fill/w_59,h_59,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_7a80704b0d4547c4a6a39347d587411d~mv2.png"
                    />
                    </Link>
                </div> */}
            </div>

        </div>
    );
};

export default InstragramProducts;