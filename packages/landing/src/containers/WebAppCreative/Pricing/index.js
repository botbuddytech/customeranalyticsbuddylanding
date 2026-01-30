import React, { useState, useEffect } from 'react';
import { Icon } from 'react-icons-kit';
import { check } from 'react-icons-kit/feather/check';

import Container from 'common/components/UI/Container';
import Heading from 'common/components/Heading';
import Button from 'common/components/Button';
import Text from 'common/components/Text';

import { pricing as fallbackPricing } from 'common/data/WebAppCreative';
import {
  Section,
  SectionHeading,
  SwitcherWrapper,
  Grid,
  PriceTable,
} from './pricing.style';
import { Fade } from 'react-awesome-reveal';

/**
 * Maps a plan from the subscription_plans API to the shape expected by the UI.
 * DB: id, name, price, priceNote, primaryCtaLabel, isCurrentDefault, benefits[{ label }]
 */
function mapPlanFromDb(plan, index) {
  const priceNum = Number(plan.price) || 0;
  const features = (plan.benefits || []).map((b) => b.label).filter(Boolean);
  return {
    id: plan.id || `plan-${index}`,
    title: plan.name || 'Plan',
    price: { monthly: priceNum, annual: priceNum * 12 },
    currencySymbol: '$',
    isActive: Boolean(plan.isCurrentDefault),
    features,
    rates: null,
    button: { label: plan.primaryCtaLabel || 'Get Started', link: '#' },
    priceNote: plan.priceNote || null,
  };
}

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch('/api/subscription-plans')
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.success && Array.isArray(data.plans) && data.plans.length > 0) {
          setPricing(data.plans.map(mapPlanFromDb));
        } else {
          setPricing(fallbackPricing);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setPricing(fallbackPricing);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const handleToggle = () => {
    setIsMonthly(!isMonthly);
  };

  const list = pricing.length > 0 ? pricing : fallbackPricing;

  return (
    <Section id="pricing">
      <Container width="1400px">
        <SectionHeading>
          <Heading content="Explore our exciting pricing" />
        </SectionHeading>
        <SwitcherWrapper>
          <button className={isMonthly ? 'active' : undefined}>Monthly</button>
          <span className="switcher" onClick={handleToggle} role="button">
            <span
              className={`switcher-button ${isMonthly ? 'left' : 'right'}`}
            />
          </span>
          <button className={!isMonthly ? 'active' : undefined}>Yearly</button>
        </SwitcherWrapper>
        {loading ? (
          <Text content="Loading plans…" style={{ textAlign: 'center', color: '#fff' }} />
        ) : (
          <Grid itemCount={list.length}>
            {list.map((priceTable, idx) => (
              <Fade key={priceTable.id} direction="up" triggerOnce delay={idx * 100}>
                <PriceTable
                  className={
                    priceTable.isActive
                      ? 'active animate__animated animate__fadeInUp'
                      : 'animate__animated animate__fadeInUp'
                  }
                >
                  <Heading
                    content={`${priceTable.currencySymbol}${isMonthly
                      ? priceTable.price.monthly
                      : priceTable.price.annual
                    }`}
                  />
                  <Heading as="h5" content={priceTable.title} />
                  <ul className="features">
                    {(priceTable.features || []).slice(0, 5).map((feat, i) => (
                      <li key={i}>
                        <span className="icon"><Icon icon={check} size={16} /></span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  {priceTable.priceNote && (
                    <Text className="rates" content={priceTable.priceNote} />
                  )}
                  {priceTable.rates && (
                    <Text
                      className="rates"
                      content={`Rates: ${priceTable.rates.sms || ''} | ${priceTable.rates.email || ''} | ${priceTable.rates.whatsapp || ''}`}
                    />
                  )}
                  <Button title={priceTable.button?.label || 'Get Started'} />
                </PriceTable>
              </Fade>
            ))}
          </Grid>
        )}
      </Container>
    </Section>
  );
};

export default Pricing;
