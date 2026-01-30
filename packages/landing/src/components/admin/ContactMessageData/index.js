import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Button from "common/components/Button";
import {
  LeadsSection,
  LeadsHeader,
  LeadsTable,
  LeadsRow,
} from "../LeadsData/leadsData.style";

const ContactRow = styled(LeadsRow)`
  grid-template-columns: 0.5fr 1.2fr 1.8fr 1.8fr 2.4fr 1.5fr;
`;

const ContactMessageData = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    let isMounted = true;

    async function fetchMessages() {
      try {
        const response = await fetch("/api/admin/contact-message");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load contact messages");
        }

        if (isMounted) {
          const fetched = data.contactMessages || [];
          setMessages(fetched);
          setCurrentPage(1);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load contact messages");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchMessages();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatDateTimeIndia = (isoString) => {
    if (!isoString) return "-";
    try {
      const date = new Date(isoString);
      return date.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoString;
    }
  };

  const handleExportCsv = () => {
    if (!messages || messages.length === 0) return;

    const header = [
      "id",
      "name",
      "email",
      "subject",
      "message",
      "createdAt_IST",
    ];
    const rows = messages.map((item) => [
      item.id,
      item.name || "",
      item.email,
      item.subject || "",
      item.message || "",
      formatDateTimeIndia(item.createdAt),
    ]);

    const csvContent = [header, ...rows]
      .map((row) =>
        row
          .map((cell) => {
            const value = cell != null ? String(cell) : "";
            return `"${value.replace(/"/g, '""')}"`;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "botbuddy-contact-messages.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const totalPages = Math.max(1, Math.ceil(messages.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginatedMessages = messages.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <LeadsSection>
      <LeadsHeader>
        <div>
          <Heading as="h3" content="Contact Messages" />
          <Text
            as="span"
            content="Messages submitted from your contact form."
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span>Total messages: {messages.length}</span>
          <Button
            type="button"
            title="⬇ Download CSV"
            onClick={handleExportCsv}
            disabled={loading || messages.length === 0}
            variant="extendedFab"
            colors="primaryWithBg"
            style={{
              height: 32,
              padding: "0 14px",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          />
        </div>
      </LeadsHeader>

      {error && (
        <Text
          as="p"
          content={error}
          style={{ color: "red", marginBottom: "12px", fontSize: 13 }}
        />
      )}

      <LeadsTable>
        <ContactRow className="header">
          <span>ID</span>
          <span>Name</span>
          <span>Email</span>
          <span>Subject</span>
          <span>Message</span>
          <span>Created (IST)</span>
        </ContactRow>
        {loading ? (
          <ContactRow>
            <span>Loading...</span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </ContactRow>
        ) : messages.length === 0 ? (
          <ContactRow>
            <span>No messages yet.</span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </ContactRow>
        ) : (
          paginatedMessages.map((item) => (
            <ContactRow key={item.id}>
              <span>{item.id}</span>
              <span>{item.name || "-"}</span>
              <span>{item.email}</span>
              <span>{item.subject || "-"}</span>
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "100%",
                }}
              >
                {item.message || "-"}
              </span>
              <span>{formatDateTimeIndia(item.createdAt)}</span>
            </ContactRow>
          ))
        )}
      </LeadsTable>

      {messages.length > pageSize && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 12,
          }}
        >
          <Text
            as="span"
            content={`Page ${safePage} of ${totalPages}`}
            style={{ fontSize: 13 }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <Button
              type="button"
              title="Prev"
              variant="textButton"
              colors="primary"
              disabled={safePage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              style={{ padding: "4px 10px", minWidth: 0, height: 30 }}
            />
            <Button
              type="button"
              title="Next"
              variant="textButton"
              colors="primary"
              disabled={safePage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              style={{ padding: "4px 10px", minWidth: 0, height: 30 }}
            />
          </div>
        </div>
      )}
    </LeadsSection>
  );
};

export default ContactMessageData;


