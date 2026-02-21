
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {Box, Card, CardContent, Typography, Grid, MenuItem, TextField, Button, Divider, CircularProgress} from "@mui/material";
import { getSessions } from "../../DataAccess/Services/sessionService";
import { getPrograms } from "../../DataAccess/Services/programService";
import { getCourses } from "../../DataAccess/Services/courseService";
import { createInscription } from "../../DataAccess/Services/inscriptionService";
import {InscriptionCard} from "../../Components/InscriptionComponent.jsx"

function Inscription() {
    const { studentId, code } = useParams();
    const navigate = useNavigate();

    //const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    const [sessions, setSessions] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [courses, setCourses] = useState([]);

    const [enrollment, setEnrollment] = useState({
        studentId : studentId,
        sessionId: "",
        programId: "",
        courseIds: []
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resSessions, resPrograms, resCourses] = await Promise.all([
                getSessions(), getPrograms(), getCourses()
                 ]);
                setSessions(resSessions);
                setPrograms(resPrograms);
                setCourses(resCourses);

            } catch (err) {
                console.error("Erreur de récupération", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [studentId,code]);

    const handleChange = (e) => {
        setEnrollment({ ...enrollment, [e.target.name]: e.target.value });
    };

    const handleEnroll = async () => {
        try {
            await createInscription(enrollment);
            alert("Inscription réussie !");
            navigate("/etudiants");
        } catch (err) {
            alert("Erreur lors de l'inscription :", err.message);
        }
    };

    if (loading) return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;

    return (
            <InscriptionCard navigate={navigate} code={code} handleEnroll={handleEnroll} handleChange ={handleChange} enrollment={enrollment} sessions ={sessions} programs = {programs} courses={courses}/>
    );
}
export {Inscription}