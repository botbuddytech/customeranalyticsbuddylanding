import React, { useState, Fragment } from 'react';
import Heading from 'common/components/Heading';
import Container from 'common/components/UI/Container';
import Section, { SectionHeading, RcCollapse } from './faq.style';
import { Panel } from 'rc-collapse';
import motion from './motion-util';

import { faqs } from 'common/data/WebAppCreative';

const Faq = () => {
  const [activeKey, setActiveKey] = useState(1);

  const onChange = (activeKey) => {
    setActiveKey(activeKey);
  };

  return (
    <Section id="faq">
      <Container className="container">
        <SectionHeading>
          <Heading content="Frequently Ask Questions" />
        </SectionHeading>
        <RcCollapse
          collapsible={undefined}
          accordion={true}
          activeKey={activeKey}
          onChange={onChange}
          openMotion={motion}
        >
          {faqs?.map((faq) => (
            <Panel
              key={faq.id}
              showArrow={false}
              header={<Heading as="h4" content={faq.title} />}
            >
              {faq.description}
            </Panel>
          ))}
        </RcCollapse>
      </Container>
    </Section>
  );
};

export default Faq;
