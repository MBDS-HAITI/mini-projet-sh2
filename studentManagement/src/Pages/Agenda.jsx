import { AgendaCalendar } from "../Components/Agenda";
import { useState, useEffect } from "react";
import { getAgenda } from "../DataAccess/Services/agendaService";

function Agenda({}){
  const [events, setEvents] = useState([]);

  useEffect(() => {
   
      getAgenda()
        .then(res => {setEvents(res.data); console.log(events);})
        .catch(console.error);
    
  }, []);
  return <AgendaCalendar events={events} />;
}

export {Agenda}