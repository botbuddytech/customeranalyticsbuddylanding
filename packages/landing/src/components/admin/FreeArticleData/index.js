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

const FreeArticleRow = styled(LeadsRow)`
  grid-template-columns: 0.5fr 1fr 1.5fr 1.5fr 2fr 1.5fr;
`;

const FreeArticleData = () => {
  const [freeArticles, setFreeArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    let isMounted = true;

    async function fetchFreeArticles() {
      try {
        const response = await fetch("/api/admin/free-article");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load free article requests");
        }

        if (isMounted) {
          const fetchedFreeArticles = data.freeArticles || [];
          setFreeArticles(fetchedFreeArticles);
          setCurrentPage(1);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load free article requests");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchFreeArticles();

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
    if (!freeArticles || freeArticles.length === 0) return;

    const header = ["id", "name", "email", "subject", "message", "createdAt_IST"];
    const rows = freeArticles.map((article) => [
      article.id,
      article.name || "",
      article.email,
      article.subject || "",
      article.message || "",
      formatDateTimeIndia(article.createdAt),
    ]);

    const csvContent = [header, ...rows]
      .map((row) =>
        row
          .map((cell) => {
            const value = cell != null ? String(cell) : "";
            // Escape quotes and wrap in double quotes to be CSV-safe
            return `"${value.replace(/"/g, '""')}"`;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "botbuddy-free-article-requests.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const totalPages = Math.max(1, Math.ceil(freeArticles.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginatedFreeArticles = freeArticles.slice(startIndex, startIndex + pageSize);

  return (
    <LeadsSection>
      <LeadsHeader>
        <div>
          <Heading as="h3" content="Free Article Requests Overview" />
          <Text
            as="span"
            content="Live list of free article requests from your landing page."
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span>Total requests: {freeArticles.length}</span>
          <Button
            type="button"
            title="⬇ Download CSV"
            onClick={handleExportCsv}
            disabled={loading || freeArticles.length === 0}
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
        <FreeArticleRow className="header">
          <span>ID</span>
          <span>Name</span>
          <span>Email</span>
          <span>Subject</span>
          <span>Message</span>
          <span>Created (IST)</span>
        </FreeArticleRow>
        {loading ? (
          <FreeArticleRow>
            <span>Loading...</span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </FreeArticleRow>
        ) : freeArticles.length === 0 ? (
          <FreeArticleRow>
            <span>No requests yet.</span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </FreeArticleRow>
        ) : (
          paginatedFreeArticles.map((article) => (
            <FreeArticleRow key={article.id}>
              <span>{article.id}</span>
              <span>{article.name || "-"}</span>
              <span>{article.email}</span>
              <span>{article.subject || "-"}</span>
              <span style={{ 
                overflow: "hidden", 
                textOverflow: "ellipsis", 
                whiteSpace: "nowrap",
                maxWidth: "100%"
              }}>
                {article.message || "-"}
              </span>
              <span>{formatDateTimeIndia(article.createdAt)}</span>
            </FreeArticleRow>
          ))
        )}
      </LeadsTable>

      {freeArticles.length > pageSize && (
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

export default FreeArticleData;

