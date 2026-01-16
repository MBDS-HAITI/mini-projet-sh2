import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

/* 🎨 Couleurs par type */
const EVENT_COLORS = {
  Evaluation: "#d32f2f",
  Cours: "#1976d2",
  Rentrée: "#2e7d32",
  Fermeture: "#616161",
  Evénement: "#7b1fa2",
  Réunion: "#f57c00"
};

/* 🛠 utilitaire date YYYY-MM-DD */
const toDateOnly = (date) =>
  new Date(date).toISOString().split("T")[0];

function AgendaCalendar({ events = [] }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  /* 🔁 Mapping events → FullCalendar */
  const calendarEvents = events.map((ev) => {
    const dateOnly = toDateOnly(ev.date);

    return {
      title: ev.name,
      start: ev.hDebut
        ? `${dateOnly}T${ev.hDebut}`
        : dateOnly,
      end: ev.hEnd
        ? `${dateOnly}T${ev.hEnd}`
        : undefined,
      backgroundColor:
        EVENT_COLORS[ev.type] || theme.palette.primary.main,
      borderColor:
        EVENT_COLORS[ev.type] || theme.palette.primary.main,
      extendedProps: ev
    };
  });

  /* 🖱️ clic événement */
  const handleEventClick = (info) => {
    const ev = info.event.extendedProps;

    alert(
      `
📌 ${ev.name}
🗓️ ${new Date(ev.date).toLocaleDateString("fr-FR")}
⏰ ${ev.hDebut || ""} ${ev.hEnd ? " - " + ev.hEnd : ""}
📘 Type : ${ev.type}      `
    );
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        📅 Agenda académique
      </Typography>

      {/* 🏷️ Légende */}
      <Card elevation={2} sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Légende
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {Object.entries(EVENT_COLORS).map(([type, color]) => (
              <Chip
                key={type}
                label={type}
                sx={{
                  backgroundColor: color,
                  color: "#fff",
                  mb: 1
                }}
              />
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* 📆 Calendrier */}
      <Card elevation={4}>
        <CardContent>
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin
            ]}
            initialView={
              isMobile ? "dayGridMonth" : "timeGridWeek"
            }
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: isMobile
                ? ""
                : "dayGridMonth,timeGridWeek"
            }}
            height={isMobile ? "auto" : 650}
            events={calendarEvents}
            locale={frLocale}
            nowIndicator
            eventDisplay="block"
            dayMaxEvents
            eventClick={handleEventClick}
          />
        </CardContent>
      </Card>
    </Box>
  );
}

export {AgendaCalendar};
