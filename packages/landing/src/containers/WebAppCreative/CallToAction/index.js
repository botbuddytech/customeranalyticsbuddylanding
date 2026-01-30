import React from 'react';
import Container from 'common/components/UI/Container';
import Link from 'common/components/Link';
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import Section, { Content } from './cta.style';
import bubble1 from 'common/assets/image/webAppCreative/cta-bubble-1.png';
import bubble2 from 'common/assets/image/webAppCreative/cta-bubble-2.png';
import SelectButton from './select-button';

const CallToAction = () => {
  return (
    <Section>
      <img src={bubble1?.src} className="bubble-1" alt="bubble1" />
      <Container width="1400px">
        <Content>
          <Heading content="👉Your customers are talking. Are you listening?" />
          <Text content="Turn your Shopify Customer data into actionable insights today." />
          <SelectButton />
          {/* <span>
            <Link href="#">2,500+ Upvote on ProductHunt</Link>
          </span> */}
        </Content>
      </Container>
      <img src={bubble2?.src} className="bubble-2" alt="bubble2" />
    </Section>
  );
};

export default CallToAction;
