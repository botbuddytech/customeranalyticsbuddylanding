import React, { useEffect, useState } from 'react';
import Container from 'common/components/UI/Container';
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import Input from 'common/components/Input';
import Button from 'common/components/Button';
import NextImage from 'common/components/NextImage';
import Section, {
  BannerContentWrapper,
  BannerContent,
  Subscribe,
  Figure,
} from './banner.style';
import dashboard from 'common/assets/image/webAppCreative/dashboard.png';
import envelope from 'common/assets/image/webAppCreative/icons/envelope.png';

const Banner = () => {
  const fullHeadingText = 'Know Your Customers.\nGrow Your Sales.';
  const [typedHeading, setTypedHeading] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeedMs = 35;
    const intervalId = setInterval(() => {
      currentIndex += 1;
      setTypedHeading(fullHeadingText.slice(0, currentIndex));
      if (currentIndex >= fullHeadingText.length) {
        clearInterval(intervalId);
      }
    }, typingSpeedMs);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const cursorIntervalMs = 500;
    const id = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, cursorIntervalMs);
    return () => clearInterval(id);
  }, []);

  return (
    <Section id="home">
      <Container width="1400px">
        <BannerContentWrapper>
          <BannerContent>
            <Heading
              className="animate__animated animate__fadeInUp"
              style={{ whiteSpace: 'pre-line' }}
              content={`${typedHeading}${showCursor ? '|' : ' '}`}
            />
            <Text
              className="animate__animated animate__fadeInUp"
              content="We helps you understand buyer behavior, segment audiences,
               and boost sales with AI-powered analytics – all inside your Shopify admin."
            />
            <Subscribe className="animate__animated animate__fadeInUp">
              <Input
                inputType="email"
                placeholder="Your email"
                iconPosition="left"
                aria-label="email"
                icon={<img src={envelope?.src} alt="envelope" />}
              />
              <Button title="Free Article" type="submit" />
            </Subscribe>
            <Text
              className="animate__animated animate__fadeInUp trusted-bar"
              content="Trusted by 2,000+ Merchants & Stores"
              mb={0}
            />
          </BannerContent>
          {/* <Figure className="animate__animated animate__fadeInUp animate__fast">
            <NextImage src={dashboard} alt="dashboard" />
          </Figure> */}
        </BannerContentWrapper>
      </Container>
    </Section>
  );
};

export default Banner;
