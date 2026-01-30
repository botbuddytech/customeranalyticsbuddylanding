import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "common/components/Box";
import Text from "common/components/Text";
import Heading from "common/components/Heading";
import Button from "common/components/Button";
import Input from "common/components/Input";
import Container from "common/components/UI/Container";
// import ContactWrapper, { ContactForm, ContactInfo } from './contact.style';

const Contact = ({
  sectionWrapper,
  row,
  col,
  sectionSubTitle,
  sectionTitle,
  contactTitle,
  contactDescription,
  contactInfo,
  contactForm,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    service: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");

    if (!formData.email) {
      setStatusMessage("Please enter your email.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to send your message. Please try again."
        );
      }

      setStatusMessage(
        data.message ||
          "Thank you for your message! We will get back to you soon."
      );
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        service: "",
      });
    } catch (error) {
      setStatusMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      id="contact"
      style={{
        padding: "100px 0",
        backgroundColor: "#ffffff",
        position: "relative",
      }}
    >
      <Container>
        {/* Header Section */}
        <div
          className="contact-header"
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <Text
            content="Get in Touch"
            style={{
              color: "#95bf47",
              fontSize: "16px",
              fontWeight: "600",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "15px",
            }}
          />
          <Heading
            content="Let's Start a Conversation"
            style={{
              color: "#0f2137",
              fontSize: "48px",
              fontWeight: "700",
              marginBottom: "20px",
              lineHeight: "1.2",
            }}
          />
          <Text
            content="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
            style={{
              color: "#5a6c7d",
              fontSize: "18px",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          />
        </div>

        <Box {...row}>
          {/* Contact Information */}
          <Box {...col}>
            <div
              className="contact-info-card"
              style={{
                background: "#f8f9fa",
                padding: "50px 40px",
                borderRadius: "10px",
                border: "1px solid #e8ecf0",
                marginBottom: "30px",
              }}
            >
              <Heading
                content="Contact Information"
                style={{
                  color: "#0f2137",
                  fontSize: "28px",
                  fontWeight: "600",
                  marginBottom: "30px",
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "25px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      background: "#95bf47",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      color: "#ffffff",
                    }}
                  >
                    📧
                  </div>
                  <div>
                    <Text
                      content="Email"
                      style={{ color: "#5a6c7d", fontSize: "14px", margin: 0 }}
                    />
                    <Text
                      content="botbuddyteam@gmail.com"
                      style={{
                        color: "#0f2137",
                        fontSize: "16px",
                        fontWeight: "500",
                        margin: 0,
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      background: "#95bf47",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      color: "#ffffff",
                    }}
                  >
                    📞
                  </div>
                  <div>
                    <Text
                      content="Phone"
                      style={{ color: "#5a6c7d", fontSize: "14px", margin: 0 }}
                    />
                    <Text
                      content="+91 9669664421"
                      style={{
                        color: "#0f2137",
                        fontSize: "16px",
                        fontWeight: "500",
                        margin: 0,
                      }}
                    />
                    <Text
                      content="7 Days - 11am - 6pm"
                      style={{ color: "#5a6c7d", fontSize: "14px", margin: 0 }}
                    />
                  </div>
                </div>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      background: "#95bf47",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      color: "#ffffff",
                    }}
                  >
                    📍
                  </div>
                  <div>
                    <Text
                      content="Address"
                      style={{ color: "#5a6c7d", fontSize: "14px", margin: 0 }}
                    />
                    <Text
                      content="West Bengal, India"
                      style={{
                        color: "#0f2137",
                        fontSize: "16px",
                        fontWeight: "500",
                        margin: 0,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Box>

          {/* Contact Form */}
          <Box {...col}>
            <div
              className="contact-form-card"
              style={{
                background: "#ffffff",
                padding: "50px 40px",
                borderRadius: "20px",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Form Header */}
              <div style={{ marginBottom: "30px" }}>
                <Heading
                  content="Send us a Message"
                  style={{
                    color: "#0f2137",
                    fontSize: "24px",
                    fontWeight: "600",
                    marginBottom: "10px",
                  }}
                />
                <Text
                  content="Fill out the form below and we'll get back to you within 24 hours."
                  style={{
                    color: "#5a6c7d",
                    fontSize: "16px",
                    margin: 0,
                  }}
                />
              </div>

              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div
                  className="contact-form-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                  }}
                >
                  <div>
                    <Input
                      inputType="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(value) => handleInputChange("name", value)}
                      style={{
                        width: "100%",
                        padding: "15px 20px",
                        border:
                          focusedField === "name"
                            ? "2px solid #95bf47"
                            : "2px solid #e8ecf0",
                        borderRadius: "10px",
                        fontSize: "16px",
                        transition: "all 0.3s ease",
                        background: "#ffffff",
                      }}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <div>
                    <Input
                      inputType="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(value) => handleInputChange("email", value)}
                      style={{
                        width: "100%",
                        padding: "15px 20px",
                        border:
                          focusedField === "email"
                            ? "2px solid #95bf47"
                            : "2px solid #e8ecf0",
                        borderRadius: "10px",
                        fontSize: "16px",
                        transition: "all 0.3s ease",
                        background: "#ffffff",
                      }}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>

                <div>
                  <Input
                    inputType="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(value) => handleInputChange("subject", value)}
                    style={{
                      width: "100%",
                      padding: "15px 20px",
                      border:
                        focusedField === "subject"
                          ? "2px solid #95bf47"
                          : "2px solid #e8ecf0",
                      borderRadius: "10px",
                      fontSize: "16px",
                      transition: "all 0.3s ease",
                      background: "#ffffff",
                    }}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                <div>
                  <Input
                    inputType="textarea"
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(value) => handleInputChange("message", value)}
                    style={{
                      width: "100%",
                      padding: "15px 20px",
                      border:
                        focusedField === "message"
                          ? "2px solid #95bf47"
                          : "2px solid #e8ecf0",
                      borderRadius: "10px",
                      fontSize: "16px",
                      transition: "all 0.3s ease",
                      background: "#ffffff",
                      minHeight: "120px",
                      resize: "vertical",
                    }}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                <Button
                  type="submit"
                  title={submitting ? "Sending..." : "Send Message"}
                  colors="primaryWithBg"
                  disabled={submitting}
                  style={{
                    width: "100%",
                    marginTop: "10px",
                  }}
                />

                {statusMessage && (
                  <Text
                    as="p"
                    content={statusMessage}
                    style={{
                      marginTop: "12px",
                      fontSize: 14,
                      color:
                        statusMessage.toLowerCase().includes("unable") ||
                        statusMessage.toLowerCase().includes("wrong") ||
                        statusMessage.toLowerCase().includes("error")
                          ? "#dc2626"
                          : "#0f9d58",
                    }}
                  />
                )}
              </form>
            </div>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

Contact.propTypes = {
  sectionWrapper: PropTypes.object,
  row: PropTypes.object,
  col: PropTypes.object,
  sectionSubTitle: PropTypes.object,
  sectionTitle: PropTypes.object,
  contactTitle: PropTypes.string,
  contactDescription: PropTypes.string,
  contactInfo: PropTypes.object,
  contactForm: PropTypes.object,
};

Contact.defaultProps = {
  sectionWrapper: {
    as: "section",
    pt: ["40px", "40px", "40px", "80px"],
    pb: ["40px", "40px", "40px", "80px"],
  },
  row: {
    flexBox: true,
    flexWrap: "wrap",
    ml: "-15px",
    mr: "-15px",
  },
  col: {
    width: ["100%", "100%", "50%", "50%"],
    pl: ["15px", "15px", "15px", "15px"],
    pr: ["15px", "15px", "15px", "15px"],
    mb: ["40px", "40px", "40px", "0px"],
  },
  sectionSubTitle: {
    content: "Get in touch with us",
    as: "span",
    display: "block",
    fontSize: "14px",
    letterSpacing: "0.15em",
    fontWeight: "700",
    color: "#ec5555",
    textAlign: ["center", "left"],
    mb: "10px",
  },
  sectionTitle: {
    content: "Contact Us",
    fontSize: ["24px", "24px", "30px", "36px"],
    fontWeight: "700",
    color: "#0f2137",
    letterSpacing: "-0.025em",
    mb: "20px",
    textAlign: ["center", "left"],
  },
  contactTitle: "Get in Touch",
  contactDescription:
    "We would love to hear from you. Send us a message and we will respond as soon as possible.",
  contactInfo: {
    style: {
      paddingTop: "20px",
    },
  },
  contactForm: {
    type: "submit",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "4px",
    pl: "22px",
    pr: "22px",
    colors: "primaryWithBg",
    minHeight: "48px",
    pt: "0",
    pb: "0",
  },
};

export default Contact;
