import React, { useEffect, useState } from "react";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Button from "common/components/Button";
import {
  LeadsSection,
  LeadsHeader,
  LeadsTable,
  LeadsRow,
} from "./leadsData.style";

const LeadsData = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    let isMounted = true;

    async function fetchLeads() {
      try {
        const response = await fetch("/api/admin/leads");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load leads");
        }

        if (isMounted) {
          const fetchedLeads = data.leads || [];
          setLeads(fetchedLeads);
          setCurrentPage(1);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load leads");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchLeads();

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
    if (!leads || leads.length === 0) return;

    const header = ["id", "email", "createdAt_IST"];
    const rows = leads.map((lead) => [
      lead.id,
      lead.email,
      formatDateTimeIndia(lead.createdAt),
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
    link.setAttribute("download", "botbuddy-leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const totalPages = Math.max(1, Math.ceil(leads.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginatedLeads = leads.slice(startIndex, startIndex + pageSize);

  return (
    <LeadsSection>
      <LeadsHeader>
        <div>
          <Heading as="h3" content="Leads Overview" />
          <Text
            as="span"
            content="Live list of captured emails from your landing page."
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span>Total leads: {leads.length}</span>
          <Button
            type="button"
            title="⬇ Download CSV"
            onClick={handleExportCsv}
            disabled={loading || leads.length === 0}
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
        <LeadsRow className="header">
          <span>ID</span>
          <span>Email</span>
          <span>Created (IST)</span>
        </LeadsRow>
        {loading ? (
          <LeadsRow>
            <span>Loading...</span>
            <span></span>
            <span></span>
          </LeadsRow>
        ) : leads.length === 0 ? (
          <LeadsRow>
            <span>No leads yet.</span>
            <span></span>
            <span></span>
          </LeadsRow>
        ) : (
          paginatedLeads.map((lead) => (
            <LeadsRow key={lead.id}>
              <span>{lead.id}</span>
              <span>{lead.email}</span>
              <span>{formatDateTimeIndia(lead.createdAt)}</span>
            </LeadsRow>
          ))
        )}
      </LeadsTable>

      {leads.length > pageSize && (
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

export default LeadsData;

