import React from 'react';
import Container from 'common/components/UI/Container';
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import Section, { Card, VideoWrap } from './introVideo.style';

const IntroVideo = () => {
  const url = 'https://youtu.be/xNUx-rMGvvw';
  const idMatch = url.match(/(?:youtu\.be\/|v=)([A-Za-z0-9_-]{6,})/);
  const id = idMatch ? idMatch[1] : 'xNUx-rMGvvw';
  const embedSrc = `https://www.youtube.com/embed/${id}`;

  return (
    <Section id="intro-video">
      <Container width="1400px">
        <Card className="animate__animated animate__fadeInUp">
          {/* <Heading content="Product Intro" />
          <Text content="A quick overview of how Customer Analytics Buddy helps Shopify merchants turn data into growth." /> */}
          <VideoWrap>
            <iframe
              src={embedSrc}
              title="Intro Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </VideoWrap>
        </Card>
      </Container>
    </Section>
  );
};

export default IntroVideo;


