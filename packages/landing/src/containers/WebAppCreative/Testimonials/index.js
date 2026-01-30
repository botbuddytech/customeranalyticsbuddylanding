import React from 'react';
import Container from 'common/components/UI/Container';
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import Section, {
  SectionHeading,
  ReactSlick,
  Item,
  AuthorInfo,
} from './testimonials.style';

import { testimonials } from 'common/data/WebAppCreative';

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Testimonials = () => {
  return (
    <Section id="testimonial">
      <Container width="1400px">
        <SectionHeading>
          <Heading content="What people say about us" />
        </SectionHeading>
        <ReactSlick {...settings}>
          {testimonials.map((testimonial) => (
            <Item key={testimonial.id}>
              <div>
                <figure>
                  {(() => {
                    const url = testimonial.videoUrl;
                    const isYouTube = /youtu\.?be/.test(url || '');
                    if (isYouTube) {
                      // Extract YouTube ID and embed
                      const idMatch = url.match(/(?:youtu\.be\/|v=)([A-Za-z0-9_-]{6,})/);
                      const id = idMatch ? idMatch[1] : '';
                      const embedSrc = id ? `https://www.youtube.com/embed/${id}` : url;
                      return (
                        <iframe
                          src={embedSrc}
                          title={testimonial.author}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      );
                    }
                    return (
                      <video controls width="100%">
                        <source src={url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    );
                  })()}
                </figure>
                <Text as="blockquote" content={testimonial.quote} />
              </div>
              <AuthorInfo>
                <Heading as="h4" content={testimonial.author} />
                <Text content={testimonial.designation} />
              </AuthorInfo>
            </Item>
          ))}
        </ReactSlick>
      </Container>
    </Section>
  );
};

export default Testimonials;
