import React, { useEffect, useState } from "react";
import Container from "common/components/UI/Container";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Input from "common/components/Input";
import Button from "common/components/Button";
import NextImage from "common/components/NextImage";
import Section, {
  BannerContentWrapper,
  BannerContent,
  Subscribe,
  Figure,
} from "./banner.style";
import dashboard from "common/assets/image/webAppCreative/dashboard.png";
import envelope from "common/assets/image/webAppCreative/icons/envelope.png";

const Banner = () => {
  const fullHeadingText = "Know Your Customers.\nGrow Your Sales.";
  const [typedHeading, setTypedHeading] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

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

  const handleSubmitLead = async () => {
    if (!email || submitting) return;

    setSubmitting(true);
    setStatusMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to save your email. Please try again."
        );
      }

      setStatusMessage(data.message || "Thanks! Your email has been saved.");
      setEmail("");
    } catch (error) {
      setStatusMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section id="home">
      <Container width="1400px">
        <BannerContentWrapper>
          <BannerContent>
            <Heading
              className="animate__animated animate__fadeInUp"
              style={{ whiteSpace: "pre-line" }}
              content={`${typedHeading}${showCursor ? "|" : " "}`}
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
                value={email}
                onChange={(value) => setEmail(value)}
              />
              <Button
                title={submitting ? "Saving..." : "Free Article"}
                type="button"
                onClick={handleSubmitLead}
                disabled={!email || submitting}
              />
            </Subscribe>
            {statusMessage && (
              <Text
                className="animate__animated animate__fadeInUp"
                content={statusMessage}
                mb={0}
              />
            )}
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
