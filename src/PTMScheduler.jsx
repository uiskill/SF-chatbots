//A Parent-Teacher Meeting Scheduler requires a complex calendar UI where parents can book slots.

import React, { useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// Helper: format JS Date to MySQL DATETIME (YYYY-MM-DD HH:mm:ss)
const toMysql = (d) =>
  new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

export default function PTMScheduler() {
  const [teacherId, setTeacherId] = useState("1");
  const [events, setEvents] = useState([]); // booked slots (read-only)
  const [loading, setLoading] = useState(false);
  const slotDuration = "00:15:00"; // 15-min blocks

  // Load existing bookings/blocked slots for selected teacher & visible range
  const fetchEvents = async (startStr, endStr) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost/erp/get_slots.php?teacher_id=${teacherId}&start=${encodeURIComponent(
          startStr
        )}&end=${encodeURIComponent(endStr)}`
      );
      const data = await res.json();
      // API returns array of { title, start, end, status } for booked slots
      setEvents(
        data.map((s) => ({
          title: s.status === "booked" ? "Booked" : "Unavailable",
          start: s.start,
          end: s.end,
          color: s.status === "booked" ? "#dc3545" : "#6c757d",
          editable: false,
          overlap: false,
        }))
      );
    } catch (e) {
      console.error(e);
      alert("Failed to load slots");
    } finally {
      setLoading(false);
    }
  };

  const calendarOptions = useMemo(
    () => ({
      plugins: [timeGridPlugin, interactionPlugin],
      initialView: "timeGridWeek",
      slotDuration,
      slotMinTime: "09:00:00",
      slotMaxTime: "17:00:00",
      allDaySlot: false,
      nowIndicator: true,
      firstDay: 1, // Monday
      selectable: true,
      selectMirror: true,
      selectOverlap: false,
      eventOverlap: false,
      // IST display hint (your API works in server time; make sure it is IST or convert on server)
      timeZone: "local",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "timeGridWeek,timeGridDay",
      },
      businessHours: {
        daysOfWeek: [1, 2, 3, 4, 5], // Mon-Fri
        startTime: "09:00",
        endTime: "17:00",
      },
      selectableConstraint: "businessHours",
      events,
      // Whenever view dates change (navigate week/day), refresh events
      datesSet: (arg) => {
        const startStr = toMysql(arg.start);
        const endStr = toMysql(arg.end);
        fetchEvents(startStr, endStr);
      },
      // Click & Book
      select: async (info) => {
        const start = info.start;
        const end = new Date(start.getTime() + 15 * 60 * 1000); // enforce 15 mins
        const pretty = `${start.toLocaleDateString()} ${start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

        if (!window.confirm(`Book ${pretty} with Teacher #${teacherId}?`)) {
          return;
        }

        try {
          const res = await fetch("http://localhost/erp/book_slot.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              teacher_id: teacherId,
              parent_id: 123, // TODO: from logged-in parent session
              student_id: 456, // optional: which child
              start: toMysql(start),
              end: toMysql(end),
            }),
          });
          const result = await res.json();
          if (res.ok && result.status === "success") {
            alert("✅ Slot booked!");
            // re-fetch to reflect new booking
            const view = info.view.calendar.view;
            fetchEvents(toMysql(view.activeStart), toMysql(view.activeEnd));
          } else {
            // Handle conflict or validation error
            alert(`❌ ${result.message || "Unable to book"}`);
          }
        } catch (err) {
          console.error(err);
          alert("Server error while booking");
        }
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [teacherId, events]
  );

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="mb-0">PTM Scheduler</h3>
        <div className="d-flex gap-2">
          <label className="form-label mb-0 me-2">Teacher:</label>
          <select
            className="form-select"
            style={{ width: 220 }}
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
          >
            <option value="1">Mrs. Sharma (CSE)</option>
            <option value="2">Mr. Deshmukh (IT)</option>
            <option value="3">Ms. Patil (ECE)</option>
          </select>
        </div>
      </div>

      {loading && <div className="alert alert-info py-2">Loading calendar…</div>}

      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 10px rgba(0,0,0,.06)" }}>
        <div style={{ padding: 12 }}>
          <small className="text-muted">
            Click on an empty 15-minute slot to book. Red = Booked, Grey = Unavailable.
          </small>
        </div>
        <div style={{ padding: 12 }}>
          <FullCalendar {...calendarOptions} height={680} />
        </div>
      </div>
    </div>
  );
}
