import React from 'react';
import { Icon } from 'react-icons-kit';
import { check } from 'react-icons-kit/feather/check';
import { ic_keyboard_arrow_right } from 'react-icons-kit/md/ic_keyboard_arrow_right';
import Container from 'common/components/UI/Container';
import NextImage from 'common/components/NextImage';
import Button from 'common/components/Button';
import Text from 'common/components/Text';
import Link from 'common/components/Link';
import Heading from 'common/components/Heading';
import analytics from 'common/assets/image/webAppCreative/analytics.png';
import Section, { Grid, Figure, Content, Features } from './style';
import parallaxBg from 'common/assets/image/webAppCreative/parallax-1.png';

import { analyticsTool2 } from 'common/data/WebAppCreative';
import { Fade } from 'react-awesome-reveal';

const AnalyticsTools2 = () => {
  return (
    <Section bgImage={parallaxBg?.src} bgImageAlt="analytics bg" strength={0}>
      <Container width="1400px">
        <Grid>
          <Content>
            <Text className="subtitle" content={analyticsTool2.slogan} />
            <Heading content={analyticsTool2.title} />
            <Text className="description" content={analyticsTool2.desc} />
            <Features>
              {analyticsTool2.features.map((feat, i) => (
                <li key={i}>
                  <Icon icon={check} size={22} />
                  {feat}
                </li>
              ))}
            </Features>
            <Link href={analyticsTool2.button.link} className="explore">
              <Button
                title={analyticsTool2.button.label}
                icon={<Icon icon={ic_keyboard_arrow_right} size={24} />}
              />
            </Link>
          </Content>
          <Fade direction='up' triggerOnce>
            <Figure>
              <div className="generating-badge">Generating ✨</div>
              <div className="preview-card">
                <NextImage src={analytics} alt="analytics" />
              </div>
            </Figure>
          </Fade>
        </Grid>
      </Container>
    </Section>
  );
};

export default AnalyticsTools2;


